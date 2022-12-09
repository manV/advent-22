const data = await Deno.readTextFile("./day-8-input.txt");

/**
 * distance from same height|higher or edge is what we need
 * to find for any given tree
 */
const gridArray: Array<Array<number>> = [];

data.split("\n").forEach((row, i) => {
  gridArray.push([]);
  row.split("").forEach((treeHeight) => {
    gridArray[i].push(parseInt(treeHeight, 10));
  });
});

const gridLength = gridArray[0].length;
const gridHeight = gridArray.length;

let maxScenicScore = 0;

for (let i = 0; i < gridHeight; i++) {
  for (let j = 0; j < gridLength; j++) {
    const currTreeHeight = gridArray[i][j];
    let left = 0;
    let right = 0;
    let top = 0;
    let bottom = 0;
    for (let k = j - 1; k >= 0; k--) {
      const t = gridArray[i][k];
      left += 1;
      if (t >= currTreeHeight) {
        break;
      }
    }
    for (let k = j + 1; k < gridLength; k++) {
      const t = gridArray[i][k];
      right += 1;
      if (t >= currTreeHeight) {
        break;
      }
    }
    for (let k = i - 1; k >= 0; k--) {
      const t = gridArray[k][j];
      top += 1;
      if (t >= currTreeHeight) {
        break;
      }
    }
    for (let k = i + 1; k < gridHeight; k++) {
      const t = gridArray[k][j];
      bottom += 1;
      if (t >= currTreeHeight) {
        break;
      }
    }
    maxScenicScore = Math.max(maxScenicScore, left * right * top * bottom);
  }
}

console.log("max scenic score", maxScenicScore);
