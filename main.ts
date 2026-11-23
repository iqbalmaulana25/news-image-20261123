// Entry for make.fun's news-image-20261123: a single front-page image that
// sums up the world news of Monday 23 November 2026. The picture itself is
// the deliverable and ships in this repository as entry.png (JPEG bytes
// under a .png name, which the gate allows because it tells PNG from JPEG
// by the file's first bytes). All this program does is place those exact
// bytes at /output/entry.png, so the grader's two runs produce the same
// file every time. Node 22, standard library only, no network.
//
// Run locally with:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoDir = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The grader mounts a writable /output, but a local MAKEFUN_OUTPUT_DIR may
// name a folder that does not exist yet; create it either way so the copy
// below cannot fail on a missing directory.
mkdirSync(outputDir, { recursive: true });
copyFileSync(join(repoDir, 'entry.png'), join(outputDir, 'entry.png'));
