const { getRound } = require("../..");

const formatMatches = (matches) =>
  matches.map(
    ([p1, p2]) =>
      `${`Seed ${p1.seed} (${p1.points})`.padEnd(
        15
      )} vs. ${`Seed ${p2.seed} (${p2.points})`.padStart(15)}`
  );

const getMatchSet = (matches, matchSet = new Set()) => {
  matches.forEach(([p1, p2]) => matchSet.add(`${p1.seed},${p2.seed}`));
  return matchSet;
};

const getRanking = (matches) => {
  const players = matches.reduce((arr, match) => arr.concat(match), []);
  players.sort((a, b) => {
    if (a.points === b.points) return a.seed - b.seed;
    return b.points - a.points;
  });
  return players.map((player, i) => {
    const rank = (i && players[i - 1].points === player.points
      ? ""
      : `${i + 1}.`
    ).padStart(5);
    return `${rank} ${`Seed ${player.seed}`.padEnd(
      12
    )} ${`(${player.points})`}`;
  });
};

const simulate = (n, players, strategy) => {
  let round = getRound(players);
  let matchSet = getMatchSet(round);
  for (let i = 2; i <= n; ++i) {
    round = getRound(strategy(round), matchSet);
    matchSet = getMatchSet(round, matchSet);
  }
  round.sort(([a], [b]) => a.seed - b.seed);
  return round;
};

module.exports = { formatMatches, getMatchSet, getRanking, simulate };
