import type { TrendingAgent } from "../types";

import { BATCH_01 } from "./batch-01";
import { BATCH_02 } from "./batch-02";
import { BATCH_03 } from "./batch-03";
import { BATCH_04 } from "./batch-04";
import { BATCH_05 } from "./batch-05";
import { BATCH_06 } from "./batch-06";
import { BATCH_07 } from "./batch-07";
import { BATCH_08 } from "./batch-08";
import { BATCH_09 } from "./batch-09";
import { BATCH_10 } from "./batch-10";
import { BATCH_11 } from "./batch-11";
import { BATCH_12 } from "./batch-12";

/**
 * The full catalog. Batches exist purely to keep each source file reviewable —
 * order here has no meaning, sorting happens in `../index.ts`.
 */
export const TRENDING_AGENTS: TrendingAgent[] = [
  ...BATCH_01,
  ...BATCH_02,
  ...BATCH_03,
  ...BATCH_04,
  ...BATCH_05,
  ...BATCH_06,
  ...BATCH_07,
  ...BATCH_08,
  ...BATCH_09,
  ...BATCH_10,
  ...BATCH_11,
  ...BATCH_12,
];
