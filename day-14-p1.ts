const data = await Deno.readTextFile("./day-14-input.txt");

type SlotKind = "rock" | "air" | "sand";
class Point {
  x: number;
  y: number;
  kind: SlotKind;
  constructor(x: number, y: number, kind: SlotKind) {
    this.x = x;
    this.y = y;
    this.kind = kind;
  }
}

const parsedData = data.split("\n").map((line) => {
  return line.split(" -> ").map((pointStr) => {
    const [xStr, yStr] = pointStr.split(",");
    return new Point(parseInt(xStr, 10), parseInt(yStr, 10), "rock");
  });
});

let maxX = 0;
let maxY = 0;

parsedData.forEach((rockPath) => {
  rockPath.map((point) => {
    if (point.x > maxX) maxX = point.x;
    if (point.y > maxY) maxY = point.y;
  });
});

const grid: Point[][] = [];

for (let i = 0; i <= maxY; i++) {
  grid.push([]);
  for (let j = 0; j <= maxX; j++) {
    grid[i].push(new Point(j, i, "air"));
  }
}

parsedData.forEach((path) => {
  path.forEach((point, index) => {
    if (index) {
      const prevPoint = path[index - 1];
      const points = getPointsBetween(prevPoint, point);
      grid[point.y][point.x] = point;
      grid[prevPoint.y][prevPoint.x] = prevPoint;
      points.forEach((point) => {
        grid[point.y][point.x] = point;
      });
    }
  });
});

console.log("stationary units of sand", simulate());

function simulate() {
  let outOfBounds = false;
  let stationaryCount = 0;
  while (!outOfBounds) {
    const sand = new Point(500, 0, "sand");

    while (
      canMoveDown(sand) ||
      canMoveDownLeft(sand) ||
      canMoveDownRight(sand)
    ) {
      if (canMoveDown(sand)) moveDown(sand);
      else if (canMoveDownLeft(sand)) moveDownLeft(sand);
      else if (canMoveDownRight(sand)) moveDownRight(sand);
      if (isOutOfBounds(sand)) {
        outOfBounds = true;
        break;
      }
    }
    if (!outOfBounds) {
      grid[sand.y][sand.x] = sand;
      stationaryCount += 1;
    }
    // printGrid();
  }

  return stationaryCount;
}

function canMoveDown(point: Point) {
  return !["rock", "sand"].includes(grid[point.y + 1]?.[point.x]?.kind);
}
function canMoveDownRight(point: Point) {
  return !["rock", "sand"].includes(grid[point.y + 1]?.[point.x + 1]?.kind);
}
function canMoveDownLeft(point: Point) {
  return !["rock", "sand"].includes(grid[point.y + 1]?.[point.x - 1]?.kind);
}
function moveDown(point: Point) {
  point.y = point.y + 1;
}
function moveDownLeft(point: Point) {
  moveDown(point);
  point.x = point.x - 1;
}
function moveDownRight(point: Point) {
  moveDown(point);
  point.x = point.x + 1;
}

function isOutOfBounds(point: Point) {
  return point.y >= grid.length || point.x >= grid[0].length;
}

function getPointsBetween(point1: Point, point2: Point): Point[] {
  const points: Point[] = [];
  if (point1.x === point2.x) {
    if (point1.y > point2.y) [point1, point2] = [point2, point1];
    for (let i = point1.y + 1; i < point2.y; i++) {
      points.push(new Point(point1.x, i, "rock"));
    }
  } else if (point1.y === point2.y) {
    if (point1.x > point2.x) [point1, point2] = [point2, point1];
    for (let i = point1.x + 1; i < point2.x; i++) {
      points.push(new Point(i, point1.y, "rock"));
    }
  }
  return points;
}

function printGrid() {
  for (let i = 0; i < grid.length; i++) {
    let line = "";
    for (let j = 0; j < grid[0].length; j++) {
      line +=
        grid[i][j].kind === "air"
          ? "."
          : grid[i][j].kind === "rock"
          ? "#"
          : "o";
    }
    console.log(line);
  }
  console.log("\n\n\n");
}
