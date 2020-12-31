exports.getRound = (players, matchSet = new Set()) => {
  players.sort((a, b) => a.seed - b.seed);
  const sortMap = new Map();
  const matchMap = new Map();
  for (const player of players) {
    // Sort the candidates by "difference of points" asc, "difference of seed" desc
    const sorted = players
      .filter(
        (candidate) =>
          !matchSet.has(`${player.seed},${candidate.seed}`) &&
          !matchSet.has(`${candidate.seed},${player.seed}`) &&
          candidate.seed !== player.seed
      )
      .sort((a, b) => {
        const pointsDiffA = Math.abs(a.points - player.points);
        const pointsDiffB = Math.abs(b.points - player.points);
        if (pointsDiffA < pointsDiffB) return -1;
        if (pointsDiffB < pointsDiffA) return 1;
        const seedDiffA = Math.abs(a.seed - player.seed);
        const seedDiffB = Math.abs(b.seed - player.seed);
        return seedDiffB - seedDiffA;
      });
    // Breaking point: if any sorted array length is 0,
    // all possible matches have already been played according to the match set
    if (!sorted.length) return [];
    sortMap.set(player, sorted);
  }
  // For all players, try to pick the first available candidate
  // Exchanges are made if no available candidate, and we loop again
  // as long as there are candidates left
  const candidates = new Set(players);
  const attemptedMatches = new Set();
  while (candidates.size) {
    for (const p1 of candidates) {
      if (!candidates.has(p1)) continue;
      const sorted = sortMap.get(p1);
      let p2 = sorted.find(p => candidates.has(p));
      if (p2) {
        matchMap.set(p1, p2);
        matchMap.set(p2, p1);
        attemptedMatches.add(`${p1.seed},${p2.seed}`);
        attemptedMatches.add(`${p2.seed},${p1.seed}`);
        candidates.delete(p1);
        candidates.delete(p2);
      } else {
        // If no candidate is available, we'll have to compromise and
        // trade matches with someone else
        p2 = sorted.find(p => !attemptedMatches.has(`${p1.seed},${p.seed}`));
        if (!p2) return []; // Failsafe
        p3 = matchMap.get(p2); // Former opponent of p2
        matchMap.set(p1, p2);
        matchMap.set(p2, p1);
        attemptedMatches.add(`${p1.seed},${p2.seed}`);
        attemptedMatches.add(`${p2.seed},${p1.seed}`);
        candidates.delete(p1);
        candidates.add(p3);
      }
    }
  }
  // Build the array of matches
  const included = new Set();
  const matches = [];
  for (const match of matchMap) {
    const [p1, p2] = match;
    if (included.has(p1) || included.has(p2)) continue;
    matches.push(match);
    included.add(p1);
    included.add(p2);
  }
  return matches;
};
