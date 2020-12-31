const { simulate, getRanking, formatMatches } = require('./utils');
const { regular } = require('./utils/players');
const { sweep } = require('./utils/strategies');

describe("Regular / Sweep", () => {
  it.each(new Array(20).fill(0).map((_, i) => i + 1))("should get round %s", async n => {
    const round = simulate(n, regular, sweep);
    expect(round.length).toBe(regular.length / 2);
    expect(formatMatches(round)).toMatchSnapshot("round");
    expect(getRanking(round)).toMatchSnapshot("ranking");
  });
});
