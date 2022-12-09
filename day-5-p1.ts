const data = await Deno.readTextFile("./day-5-input.txt");

const [currentArrengement, steps] = data.split("\n\n");
const stacks: Array<Array<string>> = [];

const stackRows = currentArrengement
  .split("\n")
  .filter((row) => row.startsWith("["));

for (let j = 0; j < (stackRows[0].length + 1) / 4; j++) {
  stacks.push([]);
}

for (let j = 0; j < stackRows.length; j++) {
  const stackRow = stackRows[j];
  for (let i = 1; i < stackRow.length; i += 4) {
    if (stackRow[i].trim().length) stacks[(i - 1) / 4].push(stackRow[i]);
  }
}

for (const step of steps.split("\n")) {
  const [temp1, temp2] = step.split(" from ");
  const [_, numCratesStr] = temp1.split(" ");
  const [fromStr, __, toStr] = temp2.split(" ");

  const [numCrates, from, to] = [
    parseInt(numCratesStr, 10),
    parseInt(fromStr, 10) - 1,
    parseInt(toStr, 10) - 1,
  ];

  const toMove: Array<string> = [];
  for (let i = 0; i < numCrates; i++) {
    toMove.push(stacks[from].shift()!);
  }
  toMove.reverse();

  stacks[to] = [...toMove, ...stacks[to]];
}

const result = stacks.map((stack) => stack[0]).join("");
console.log(result);
