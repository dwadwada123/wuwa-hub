import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase/client';
import { VERIFIED_META_TEAMS } from '../../../data/fallbackData';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get('publicId');

    if (publicId) {
      // 1. Check in verified meta teams first
      const metaMatch = VERIFIED_META_TEAMS.find(
        (t) => t.publicId === publicId || t.id === publicId
      );
      if (metaMatch) {
        return NextResponse.json({ team: metaMatch });
      }

      // 2. Query Supabase user_teams
      const { data, error } = await supabase
        .from('user_teams')
        .select('*')
        .eq('public_id', publicId)
        .maybeSingle();

      if (data) {
        return NextResponse.json({ team: data });
      }

      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    // Default: return verified meta teams
    return NextResponse.json({ teams: VERIFIED_META_TEAMS });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to fetch teams';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { team, userId } = body;

    if (!team) {
      return NextResponse.json({ error: 'Missing team data' }, { status: 400 });
    }

    // Insert into Supabase if userId is provided, or return the team with its generated publicId
    if (userId) {
      const { data, error } = await supabase.from('user_teams').insert({
        user_id: userId,
        team_name: team.name,
        public_id: team.publicId || crypto.randomUUID(),
        score: team.score,
        objective: team.objective,
        game_version: team.gameVersion || '3.7',
        breakdown: team.breakdown,
        explanation: team.reasons.join('\n'),
        team_data: team,
      });

      if (error) {
        console.warn('Supabase user_teams insert warning:', error.message);
      }
    }

    return NextResponse.json({ success: true, publicId: team.publicId || team.id });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to save team';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
