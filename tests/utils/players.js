// Regular: All 128 players start with 0 points
exports.regular = new Array(128).fill(0).map((_, i) => {
  const player = { seed: i + 1, points: 0 };
  return player;
});

// Accelerated:
// * Top 64 starts with 3 points (1 victory)
exports.accelerated = new Array(128).fill(0).map((_, i) => {
  const player = { seed: i + 1, points: i < 64 ? 3 : 0 };
  return player;
});

// "Six-three":
// * Top 32 starts with 6 points (2 victories)
// * Top 96 starts with 3 points (1 victory)
exports.sixThree = new Array(128).fill(0).map((_, i) => {
  const player = { seed: i + 1 };

  if (i < 32) {
    player.points = 6;
  } else if (i < 96) {
    player.points = 3;
  } else {
    player.points = 0;
  }

  return player;
});

// "Staggered":
// * Top 32 starts with 6 points (2 victories)
// * Top 48 starts with 5 points
// * Top 64 starts with 4 points
// * Top 80 starts with 3 points (1 victory)
// * Top 96 starts with 2 points
// * Top 112 starts with 1 points
exports.staggered = new Array(128).fill(0).map((_, i) => {
  const player = { seed: i + 1 };

  if (i < 32) {
    player.points = 6;
  } else if (i < 48) {
    player.points = 5;
  } else if (i < 64) {
    player.points = 4;
  } else if (i < 80) {
    player.points = 3;
  } else if (i < 96) {
    player.points = 2;
  } else if (i < 112) {
    player.points = 1;
  } else {
    player.points = 0;
  }

  return player;
});