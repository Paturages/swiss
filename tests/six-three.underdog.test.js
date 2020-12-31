const { simulate, getRanking, formatMatches } = require('./utils');
const { sixThree } = require('./utils/players');
const { underdog } = require('./utils/strategies');

describe("6/3 / Underdog", () => {
  it.each(new Array(20).fill(0).map((_, i) => i+1))('should get round %s', n => {
    const round = simulate(n, sixThree, underdog);
    expect(formatMatches(round)).toMatchSnapshot('round');
    expect(getRanking(round)).toMatchSnapshot('ranking');
  });
});
