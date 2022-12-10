const data = await Deno.readTextFile("./day-2-input.txt");

type OpponentsPlay = "A" | "B" | "C";
type YourPlay = "X" | "Y" | "Z";

const yourHandScores: {
  [x in YourPlay]: number;
} = {
  X: 1,
  Y: 2,
  Z: 3,
};

const drawHand: {
  [x in OpponentsPlay]: YourPlay;
} = {
  A: "X",
  B: "Y",
  C: "Z",
};

const winHand: {
  [x in OpponentsPlay]: YourPlay;
} = {
  A: "Y",
  B: "Z",
  C: "X",
};

const result = data
  .split("\n")
  .map((play) => {
    return play.split(" ") as [OpponentsPlay, YourPlay];
  })
  .reduce((prev, curr) => {
    return prev + getScore(curr[0], curr[1]);
  }, 0);

console.log("your total score", result);

function getScore(opponentsPlay: OpponentsPlay, yourPlay: YourPlay) {
  if (winHand[opponentsPlay] === yourPlay) {
    return 6 + yourHandScores[yourPlay];
  } else if (drawHand[opponentsPlay] === yourPlay) {
    return 3 + yourHandScores[yourPlay];
  }
  return yourHandScores[yourPlay];
}
