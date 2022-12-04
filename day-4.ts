const data = await Deno.readTextFile("./day-4-input.txt");

const res = data
  .split("\n")
  .map((elvePair) => {
    return elvePair.split(",");
  })
  .map(([pair1, pair2]) => {
    const [p1FromStr, p1ToStr] = pair1.split("-");
    const [p2FromStr, p2ToStr] = pair2.split("-");
    return {
      pair1: {
        from: parseInt(p1FromStr, 10),
        to: parseInt(p1ToStr, 10),
      },
      pair2: {
        from: parseInt(p2FromStr, 10),
        to: parseInt(p2ToStr, 10),
      },
    };
  })
  .filter((pairs) => {
    if (
      pairs.pair1.from <= pairs.pair2.from &&
      pairs.pair1.to >= pairs.pair2.to
    ) {
      return true;
    }
    if (
      pairs.pair2.from <= pairs.pair1.from &&
      pairs.pair2.to >= pairs.pair1.to
    ) {
      return true;
    }
    return false;
  });

console.log(res.length);
