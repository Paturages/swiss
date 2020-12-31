const { simulate, getRanking, formatMatches } = require('./utils');
const { regular } = require('./utils/players');
const { underdog } = require('./utils/strategies');

describe("Regular / Underdog", () => {
  it.each(new Array(20).fill(0).map((_, i) => i + 1))("should get round %s", (n) => {
    const round = simulate(n, regular, underdog);
    expect(formatMatches(round)).toMatchSnapshot("round");
    expect(getRanking(round)).toMatchSnapshot("ranking");
  });
});
