const data = await Deno.readTextFile("./day-8-input.txt");

/**
 * if we can calculate for each and every tree
 * what is the max to the right, left, top and bottom
 * then we can make a decision if a tree is visible or not
 *
 *
 * we need to do two passes to figure it out
 * 1. from top-left to bottom-right which will tell the maxes
 * for left and top side
 * 2. from bottom-right to top-left which will tell the maxes
 * for right and bottom side
 */
type Maybe<T> = T | null;

interface Tree {
  height: number;
  maxToLeft: Maybe<number>;
  maxToRight: Maybe<number>;
  maxToTop: Maybe<number>;
  maxToBottom: Maybe<number>;
}
const gridArray: Array<Array<Tree>> = [];

data.split("\n").forEach((row, i) => {
  gridArray.push([]);
  row.split("").forEach((treeHeight) => {
    gridArray[i].push({
      height: parseInt(treeHeight, 10),
      maxToLeft: null,
      maxToRight: null,
      maxToBottom: null,
      maxToTop: null,
    });
  });
});

const gridLength = gridArray[0].length;
const gridHeight = gridArray.length;

for (let i = 0; i < gridHeight; i++) {
  for (let j = 0; j < gridLength; j++) {
    const tree = gridArray[i][j];
    if (j !== 0) {
      if (j === 1) tree.maxToLeft = gridArray[i][0].height;
      else
        tree.maxToLeft = Math.max(
          gridArray[i][j - 1].height,
          gridArray[i][j - 1].maxToLeft!
        );
    }
    if (i !== 0) {
      if (i === 1) tree.maxToTop = gridArray[0][j].height;
      else
        tree.maxToTop = Math.max(
          gridArray[i - 1][j].height,
          gridArray[i - 1][j].maxToTop!
        );
    }
  }
}

for (let i = gridHeight - 1; i !== 0; i--) {
  for (let j = gridLength - 1; j !== 0; j--) {
    const tree = gridArray[i][j];
    if (j !== gridLength - 1) {
      if (j === gridLength - 2)
        tree.maxToRight = gridArray[i][gridLength - 1].height;
      else
        tree.maxToRight = Math.max(
          gridArray[i][j + 1].height,
          gridArray[i][j + 1].maxToRight!
        );
    }
    if (i !== gridHeight - 1) {
      if (i === gridHeight - 2)
        tree.maxToBottom = gridArray[gridHeight - 1][j].height;
      else
        tree.maxToBottom = Math.max(
          gridArray[i + 1][j].height,
          gridArray[i + 1][j].maxToBottom!
        );
    }
  }
}

let visibleCount = 0;

for (let i = 0; i < gridHeight; i++) {
  for (let j = 0; j < gridLength; j++) {
    if (i === 0 || j === 0 || i === gridHeight - 1 || j === gridLength - 1) {
      visibleCount += 1;
      continue;
    }
    const tree = gridArray[i][j];
    if (
      tree.height > tree.maxToRight! ||
      tree.height > tree.maxToLeft! ||
      tree.height > tree.maxToTop! ||
      tree.height > tree.maxToBottom!
    ) {
      visibleCount += 1;
      continue;
    }
  }
}

console.log("visible trees from outside", visibleCount);
