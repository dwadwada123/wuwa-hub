import { Resonator } from '../types/domain';
import { RESONATORS_PART1 } from './resonators_part1';
import { RESONATORS_PART2 } from './resonators_part2';

export const INITIAL_RESONATORS: Resonator[] = [
  ...RESONATORS_PART1,
  ...RESONATORS_PART2,
];
