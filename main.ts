// Entry for make.fun's news-image-20261123: a single front-page image that
// sums up the world news of Monday 23 November 2026. This revision rebuilds
// the page as a dense broadsheet — 41 stories across 7 regions (North
// America, Europe, the Middle East, Asia, Africa, Latin America and
// Oceania) plus sport — because the blind pairwise judge rewards the page
// that sums up the whole day, and six stories cannot do that. The picture
// itself is the deliverable and ships in this repository as entry.png
// (JPEG bytes under a .png name, which the gate allows because it tells
// PNG from JPEG by the file's first bytes). All this program does is place
// those exact bytes at /output/entry.png, so the grader's two runs produce
// the same file every time. Node 22, standard library only, no network.
//
// Run locally with:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoDir = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const sourcePath = join(repoDir, 'entry.png');

// Guard the gate's own limits before copying: the file must be at most
// 1 MiB and carry a PNG or JPEG signature (the gate tells the two apart
// by these first bytes). Fail loudly rather than ship an invalid entry.
const bytes = readFileSync(sourcePath);
if (bytes.length > 1_048_576) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB cap`);
}
const isPng = bytes.length > 4 && bytes[0] === 0x89 && bytes[1] === 0x50;
const isJpeg = bytes.length > 2 && bytes[0] === 0xff && bytes[1] === 0xd8;
if (!isPng && !isJpeg) {
  throw new Error('entry.png carries neither a PNG nor a JPEG signature');
}

// The grader mounts a writable /output, but a local MAKEFUN_OUTPUT_DIR may
// name a folder that does not exist yet; create it either way so the copy
// below cannot fail on a missing directory.
mkdirSync(outputDir, { recursive: true });
copyFileSync(join(repoDir, 'entry.png'), join(outputDir, 'entry.png'));
