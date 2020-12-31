// Sweep: Highest seed always wins 3-0
// (best case scenario)
exports.sweep = (matches) => {
  const players = [];
  for (const [p1, p2] of matches) {
    players.push({
      ...p1,
      points: p1.points + (p1.seed < p2.seed ? 3 : 0),
    });
    players.push({
      ...p2,
      points: p2.points + (p2.seed < p1.seed ? 3 : 0),
    });
  }
  return players;
};

// Revsweep: Lowest seed always wins 3-0
// (worst case scenario)
exports.revsweep = (matches) => {
  const players = [];
  for (const [p1, p2] of matches) {
    players.push({
      ...p1,
      points: p1.points + (p1.seed < p2.seed ? 0 : 3),
    });
    players.push({
      ...p2,
      points: p2.points + (p2.seed < p1.seed ? 0 : 3),
    });
  }
  return players;
};

// Underdog: Seed 128 always wins 3-0,
// otherwise highest seed always wins 3-0
// This tests the ability of underseeded players to make a comeback
exports.underdog = (matches) => {
  const players = [];
  for (const [p1, p2] of matches) {
    players.push({
      ...p1,
      points: p1.points + (p1.seed == 128 || (p2.seed < 128 && p1.seed < p2.seed) ? 3 : 0),
    });
    players.push({
      ...p2,
      points: p2.points + (p2.seed == 128 || (p1.seed < 128 && p2.seed < p1.seed) ? 3 : 0),
    });
  }
  return players;
};

// Specialists: Even seeds always win 3-0 if the seed difference is less than 32 and they're against an odd seed
// Otherwise, highest seed wins
// This tries to simulate a "tournament meta" that only a subset of people have
exports.specialists = matches => {
  const players = [];
  for (const [p1, p2] of matches) {
    let winner;
    if (p1.seed % 2 == 0 && p2.seed % 2 == 1 && Math.abs(p1.seed - p2.seed) < 32) {
      winner = p1;
    } else if (p2.seed % 2 == 0 && p1.seed % 2 == 1 && Math.abs(p1.seed - p2.seed) < 32) {
      winner = p2;
    } else {
      winner = p1.seed < p2.seed ? p1 : p2;
    }
    players.push({
      ...p1,
      points: p1.points + (winner == p1 ? 3 : 0),
    });
    players.push({
      ...p2,
      points: p2.points + (winner == p2 ? 3 : 0),
    });
  }
  return players;
}

// Idealist: A theoretical score depending on the closeness of the seeds
// * < 16: 3-2
// * < 32: 3-1
// * Otherwise: 3-0
// This tests the granularity of points
exports.idealist = matches => {
  const players = [];
  for (const [p1, p2] of matches) {
    const diff = Math.abs(p1.seed - p2.seed);
    let loserPoints;
    if (diff < 16) loserPoints = 2;
    else if (diff < 32) loserPoints = 1;
    else loserPoints = 0;

    const winner = p1.seed < p2.seed ? p1 : p2;
    players.push({
      ...p1,
      points: p1.points + (winner == p1 ? 3 : loserPoints),
    });
    players.push({
      ...p2,
      points: p2.points + (winner == p2 ? 3 : loserPoints),
    });
  }
  return players;
}