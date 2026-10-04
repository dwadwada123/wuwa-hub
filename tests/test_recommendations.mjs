// Automated Test Suite for Smart Team Builder Recommendation Engine
import { recommendTeams } from '../src/features/team-builder/scoring/engine.js';
import { INITIAL_RESONATORS, VERIFIED_META_TEAMS } from '../src/data/fallbackData.js';

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`[PASS] ${testName}`);
  } else {
    console.error(`[FAIL] ${testName}`);
  }
}

console.log('=== RUNNING RECOMMENDATION ENGINE AUTOMATED TESTS ===\n');

// Test 1: Empty Roster
try {
  const resEmpty = recommendTeams({ roster: [], objective: 'best_overall' });
  assert(resEmpty.teams.length === 0, '1. Empty roster returns 0 teams');
  assert(resEmpty.warnings.length > 0, '1b. Empty roster includes warning about insufficient resonators');
} catch (e) {
  assert(false, `1. Empty roster threw error: ${e.message}`);
}

// Test 2: Roster with fewer than 3 Resonators
try {
  const resTwo = recommendTeams({
    roster: INITIAL_RESONATORS.slice(0, 2),
    objective: 'best_overall'
  });
  assert(resTwo.teams.length === 0, '2. Roster with 2 resonators returns 0 teams');
  assert(resTwo.warnings.some(w => w.includes('fewer than 3')), '2b. Insufficient roster warning present');
} catch (e) {
  assert(false, `2. Sub-3 roster threw error: ${e.message}`);
}

// Test 3: Exactly 3 Resonators
try {
  const resThree = recommendTeams({
    roster: [
      INITIAL_RESONATORS.find(r => r.slug === 'jinhsi'),
      INITIAL_RESONATORS.find(r => r.slug === 'yuanwu'),
      INITIAL_RESONATORS.find(r => r.slug === 'verina')
    ].filter(Boolean),
    objective: 'best_overall'
  });
  assert(resThree.teams.length === 1, '3. Exactly 3 compatible resonators produces 1 team');
  assert(resThree.teams[0].score >= 80, '3b. Jinhsi+Yuanwu+Verina receives high score');
  assert(resThree.teams[0].reasons.length > 0, '3c. Reasons explain the recommendation');
} catch (e) {
  assert(false, `3. Exactly 3 resonators threw error: ${e.message}`);
}

// Test 4: Focus Character Selection
try {
  const hsin = INITIAL_RESONATORS.find(r => r.slug === 'hsin');
  const resFocus = recommendTeams({
    roster: INITIAL_RESONATORS,
    focusCharacterId: hsin.id,
    objective: 'specific_main_dps',
    limit: 5
  });
  assert(resFocus.teams.length > 0, '4. Focus character returns teams');
  assert(resFocus.teams.every(t => t.members.some(m => m.character.id === hsin.id)), '4b. Every recommended team includes focus character (Hsin)');
} catch (e) {
  assert(false, `4. Focus character test threw error: ${e.message}`);
}

// Test 5: Deterministic Ranking
try {
  const runA = recommendTeams({ roster: INITIAL_RESONATORS.slice(0, 10), objective: 'best_overall' });
  const runB = recommendTeams({ roster: INITIAL_RESONATORS.slice(0, 10), objective: 'best_overall' });
  assert(runA.teams[0].id === runB.teams[0].id, '5. Engine output is strictly deterministic');
  assert(runA.teams[0].score === runB.teams[0].score, '5b. Scores match exactly across identical runs');
} catch (e) {
  assert(false, `5. Determinism test threw error: ${e.message}`);
}

// Test 6: Sustain and Support Coverage
try {
  const res = recommendTeams({ roster: INITIAL_RESONATORS, objective: 'comfortable_safe' });
  const topTeam = res.teams[0];
  assert(topTeam.breakdown.sustain >= 80, '6. Safe objective prioritizes sustain rating >= 80');
} catch (e) {
  assert(false, `6. Sustain test threw error: ${e.message}`);
}

// Test 7: Explanations and Warnings
try {
  const res = recommendTeams({ roster: INITIAL_RESONATORS, objective: 'best_overall' });
  assert(res.teams.every(t => t.reasons.length >= 2), '7. Every team has multiple qualitative explanations');
  assert(res.teams.every(t => t.rotationSummary && t.rotationSummary.length > 10), '7b. Rotation summaries are provided');
} catch (e) {
  assert(false, `7. Explanations test threw error: ${e.message}`);
}

// Test 8: Version awareness
try {
  const res37 = recommendTeams({ roster: INITIAL_RESONATORS, targetVersion: '3.7' });
  assert(res37.teams.every(t => t.gameVersion === '3.7'), '8. All teams correctly tagged with game version 3.7');
} catch (e) {
  assert(false, `8. Version tag test threw error: ${e.message}`);
}

console.log(`\nTEST RESULTS: ${passedTests}/${totalTests} PASSED (${Math.round((passedTests/totalTests)*100)}%)`);
