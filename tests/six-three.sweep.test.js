const { simulate, getRanking, formatMatches } = require('./utils');
const { sixThree } = require('./utils/players');
const { sweep } = require('./utils/strategies');

describe("6/3 / Sweep", () => {
  it.each(new Array(20).fill(0).map((_, i) => i+1))('should get round %s', n => {
    const round = simulate(n, sixThree, sweep);
    expect(formatMatches(round)).toMatchSnapshot('round');
    expect(getRanking(round)).toMatchSnapshot('ranking');
  });
});
