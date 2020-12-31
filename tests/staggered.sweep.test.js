const { simulate, getRanking, formatMatches } = require('./utils');
const { staggered } = require('./utils/players');
const { sweep } = require('./utils/strategies');

describe("6/5/4/3/2/1/0 / Sweep", () => {
  it.each(new Array(20).fill(0).map((_, i) => i+1))('should get round %s', n => {
    const round = simulate(n, staggered, sweep);
    expect(formatMatches(round)).toMatchSnapshot('round');
    expect(getRanking(round)).toMatchSnapshot('ranking');
  });
});
