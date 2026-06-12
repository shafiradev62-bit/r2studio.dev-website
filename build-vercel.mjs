/**
 * Post-build script: reshapes TanStack Start output into Vercel Build Output API v3 format.
 * https://vercel.com/docs/build-output-api/v3
 *
 * TanStack Start output:
 *   dist/client/assets/**   ← static assets (JS, CSS, images)
 *   dist/server/server.js   ← SSR handler (H3, exports default { fetch })
 *   dist/server/assets/**   ← server-side chunks
 *
 * Vercel Build Output API target:
 *   .vercel/output/static/assets/**   ← served directly from CDN
 *   .vercel/output/functions/index.func/  ← serverless function
 *   .vercel/output/config.json
 */

import { cpSync, mkdirSync, writeFileSync, rmSync, existsSync } from "fs";
import { resolve, join } from "path";

const root = process.cwd();
const out = join(root, ".vercel", "output");

// Clean previous output
if (existsSync(out)) rmSync(out, { recursive: true });

// 1. Static assets → .vercel/output/static/assets/
const staticDest = join(out, "static");
const clientAssets = join(root, "dist", "client");
if (existsSync(clientAssets)) {
  cpSync(clientAssets, staticDest, { recursive: true });
  console.log("✓ Copied client assets → .vercel/output/static/");
}

// 2. Serverless function → .vercel/output/functions/index.func/
const funcDir = join(out, "functions", "index.func");
mkdirSync(funcDir, { recursive: true });

// Copy the server build into the function directory
const serverSrc = join(root, "dist", "server");
cpSync(serverSrc, join(funcDir, "server"), { recursive: true });

// The server.js exports `default { fetch(req) }` — Vercel needs a
// CommonJS/ESM wrapper that exports the handler as `default` or via `module.exports`.
// We write a tiny adapter that bridges Vercel's Node.js serverless runtime to the H3 handler.
writeFileSync(
  join(funcDir, "index.mjs"),
  `
import handler from "./server/server.js";

export default async function vercelHandler(req, res) {
  // Convert Node.js IncomingMessage → Web Request
  const url = "https://" + req.headers.host + req.url;
  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (v) headers.set(k, Array.isArray(v) ? v.join(", ") : v);
  }
  const method = req.method ?? "GET";
  const hasBody = method !== "GET" && method !== "HEAD";

  let body = undefined;
  if (hasBody) {
    body = await new Promise((resolve) => {
      const chunks = [];
      req.on("data", (c) => chunks.push(c));
      req.on("end", () => resolve(Buffer.concat(chunks)));
    });
  }

  const webRequest = new Request(url, { method, headers, body });

  try {
    const response = await handler.fetch(webRequest, {}, {});
    res.statusCode = response.status;
    for (const [k, v] of response.headers.entries()) {
      res.setHeader(k, v);
    }
    const text = await response.text();
    res.end(text);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
`.trim(),
);

// .vc-config.json tells Vercel how to run this function
writeFileSync(
  join(funcDir, ".vc-config.json"),
  JSON.stringify(
    {
      runtime: "nodejs20.x",
      handler: "index.mjs",
      launcherType: "Nodejs",
      shouldAddHelpers: true,
      supportsResponseStreaming: false,
    },
    null,
    2,
  ),
);
console.log("✓ Wrote serverless function → .vercel/output/functions/index.func/");

// 3. Output config — route everything through the SSR function,
//    except static assets which are served from CDN directly.
writeFileSync(
  join(out, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [
        // Static assets served directly
        {
          src: "^/assets/(.*)$",
          dest: "/assets/$1",
        },
        // Everything else → SSR function
        {
          src: "^/(.*)$",
          dest: "/index",
        },
      ],
    },
    null,
    2,
  ),
);
console.log("✓ Wrote .vercel/output/config.json");
console.log("\n✅ Vercel Build Output ready at .vercel/output/");
