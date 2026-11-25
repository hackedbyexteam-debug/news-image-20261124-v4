// news-image-20261124-v4 entry (Node 22, standard library only): the image
// beside this file, entry.png, is the entry. This program copies it to
// /output/entry.png, where the gate reads it. That is all the program has
// to do. The image sums up Tuesday 24 November 2026 in one 1024x1024
// broadsheet: 70 stories across 8 regions and 19 fields, all first
// reported that day, with every drawing original.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const SOURCE = new URL("./entry.png", import.meta.url);

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(SOURCE, join(OUTPUT_DIR, "entry.png"));
const expected = statSync(SOURCE).size;
const written = statSync(join(OUTPUT_DIR, "entry.png")).size;
if (expected !== written) {
  throw new Error(
    `entry.png copy incomplete: ${written} of ${expected} bytes reached ${OUTPUT_DIR}/entry.png — the gate would read a truncated image`,
  );
}
console.log(`entry.png copied to ${OUTPUT_DIR} (${written} bytes, verified complete)`);
