const data = await Deno.readTextFile("./day-9-input.txt");

type Direction = "U" | "R" | "D" | "L";
type HeadStep = {
  direction: Direction;
  numSteps: number;
};

const headSteps: HeadStep[] = data.split("\n").map((d) => {
  const [direction, numStepsStr] = d.split(" ");
  const numSteps = parseInt(numStepsStr, 10);
  return {
    direction: direction as Direction,
    numSteps,
  };
});

class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  move(direction: Direction) {
    if (direction === "U") {
      this.y += 1;
    } else if (direction === "D") {
      this.y -= 1;
    } else if (direction === "L") {
      this.x -= 1;
    } else {
      this.x += 1;
    }
  }
  follow(anotherPoint: Point) {
    if (!isTouching(this, anotherPoint)) {
      const xDiff = anotherPoint.x - this.x;
      this.x += Math.abs(xDiff) === 2 ? xDiff / 2 : xDiff;
      const yDiff = anotherPoint.y - this.y;
      this.y += Math.abs(yDiff) === 2 ? yDiff / 2 : yDiff;
    }
  }
}

function isTouching(point1: Point, point2: Point): boolean {
  return Math.abs(point1.x - point2.x) < 2 && Math.abs(point1.y - point2.y) < 2;
}

function addPointToSet(set: Set<string>, point: Point) {
  set.add(`${point.x}-${point.y}`);
}

function simulate() {
  const head = new Point(0, 0);
  const tail = new Point(0, 0);
  const set = new Set<string>();

  headSteps.forEach((headStep) => {
    for (let i = 0; i < headStep.numSteps; i++) {
      head.move(headStep.direction);
      tail.follow(head);
      addPointToSet(set, tail);
    }
  });

  return set.size;
}

console.log(simulate());
