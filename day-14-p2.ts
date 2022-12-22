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

const locMap = new Map<string, Point>();
let maxY = 0;

const parsedData = data.split("\n").map((line) => {
  return line.split(" -> ").map((pointStr) => {
    const [xStr, yStr] = pointStr.split(",");
    const point = new Point(parseInt(xStr, 10), parseInt(yStr, 10), "rock");
    locMap.set(`${point.x}:${point.y}`, point);
    if (point.y > maxY) maxY = point.y;
    return point;
  });
});

parsedData.forEach((rockPath) => {
  rockPath.map((point) => {
    if (point.y > maxY) maxY = point.y;
  });
});

parsedData.forEach((path) => {
  path.forEach((point, index) => {
    if (index) {
      const prevPoint = path[index - 1];
      const points = getPointsBetween(prevPoint, point);
      locMap.set(`${point.x}:${point.y}`, point);
      locMap.set(`${prevPoint.x}:${prevPoint.y}`, prevPoint);

      points.forEach((point) => {
        locMap.set(`${point.x}:${point.y}`, point);
      });
    }
  });
});

console.log("stationary units of sand", simulate());

function simulate() {
  let stationaryCount = 0;
  while (true) {
    const sand = new Point(500, 0, "sand");

    while (
      canMoveDown(sand) ||
      canMoveDownLeft(sand) ||
      canMoveDownRight(sand)
    ) {
      if (canMoveDown(sand)) moveDown(sand);
      else if (canMoveDownLeft(sand)) moveDownLeft(sand);
      else if (canMoveDownRight(sand)) moveDownRight(sand);
    }
    stationaryCount += 1;
    if (sand.x === 500 && sand.y === 0) {
      break;
    } else {
      locMap.set(`${sand.x}:${sand.y}`, sand);
    }
  }

  return stationaryCount;
}

function canMoveDown(point: Point) {
  const pointDown = locMap.get(`${point.x}:${point.y + 1}`);
  return (
    !["rock", "sand"].includes(pointDown?.kind ?? "air") && point.y - 1 < maxY
  );
}

function canMoveDownRight(point: Point) {
  return (
    !["rock", "sand"].includes(
      locMap.get(`${point.x + 1}:${point.y + 1}`)?.kind ?? "air"
    ) && point.y - 1 < maxY
  );
}

function canMoveDownLeft(point: Point) {
  return (
    !["rock", "sand"].includes(
      locMap.get(`${point.x - 1}:${point.y + 1}`)?.kind ?? "air"
    ) && point.y - 1 < maxY
  );
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
