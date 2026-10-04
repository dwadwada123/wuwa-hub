import { NextResponse } from 'next/server';
import { recommendTeams } from '../../../features/team-builder/scoring/engine';
import { INITIAL_RESONATORS } from '../../../data/fallbackData';
import { BuildObjective, Resonator } from '../../../types/domain';
import { CURRENT_LIVE_VERSION } from '../../../lib/constants';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      ownedCharacterIds = [],
      focusCharacterId = null,
      objective = 'best_overall',
      targetVersion = CURRENT_LIVE_VERSION,
      limit = 10,
    } = body;

    // Filter available resonators to match owned IDs or slugs
    const ownedSet = new Set(ownedCharacterIds);
    const userRoster = INITIAL_RESONATORS.filter(
      (r) => ownedSet.has(r.id) || ownedSet.has(r.slug)
    );

    const response = recommendTeams({
      roster: userRoster,
      focusCharacterId,
      objective: objective as BuildObjective,
      targetVersion,
      limit,
    });

    return NextResponse.json(response);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Recommendation calculation failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
