const { simulate, getRanking, formatMatches } = require('./utils');
const { accelerated } = require('./utils/players');
const { idealist } = require('./utils/strategies');

describe("Accelerated / idealist", () => {
  it.each(new Array(20).fill(0).map((_, i) => i+1))('should get round %s', n => {
    const round = simulate(n, accelerated, idealist);
    expect(formatMatches(round)).toMatchSnapshot('round');
    expect(getRanking(round)).toMatchSnapshot('ranking');
  });
});
