const data = await Deno.readTextFile("./day-2-input.txt");

type OpponentsPlay = "A" | "B" | "C";
type YourDesiredResult = "X" | "Y" | "Z";

const winScore: {
  [x in YourDesiredResult]: {
    [x in OpponentsPlay]: number;
  };
} = {
  X: {
    A: 3,
    B: 1,
    C: 2,
  },
  Y: {
    A: 1,
    B: 2,
    C: 3,
  },
  Z: {
    A: 2,
    B: 3,
    C: 1,
  },
};

const resultScore: {
  [x in YourDesiredResult]: number;
} = {
  X: 0,
  Y: 3,
  Z: 6,
};

const result = data
  .split("\n")
  .map((play) => {
    return play.split(" ") as [OpponentsPlay, YourDesiredResult];
  })
  .reduce((prev, curr) => {
    return prev + getScore(curr[0], curr[1]);
  }, 0);

console.log("your total score", result);

function getScore(
  opponentsPlay: OpponentsPlay,
  yourDesiredResult: YourDesiredResult
) {
  return (
    resultScore[yourDesiredResult] + winScore[yourDesiredResult][opponentsPlay]
  );
}
