const { simulate, getRanking, formatMatches } = require('./utils');
const { accelerated } = require('./utils/players');
const { underdog } = require('./utils/strategies');

describe("Accelerated / Underdog", () => {
  it.each(new Array(20).fill(0).map((_, i) => i + 1))("should get round %s", (n) => {
    const round = simulate(n, accelerated, underdog);
    expect(formatMatches(round)).toMatchSnapshot("round");
    expect(getRanking(round)).toMatchSnapshot("ranking");
  });
});
