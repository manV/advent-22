const data = await Deno.readTextFile("./day-12-input.txt");

class Node {
  i = 0;
  j = 0;
  elevation = 0;
  steps = 0;
  visited = false;
  constructor(i: number, j: number, elevation: number) {
    this.i = i;
    this.j = j;
    this.elevation = elevation;
  }
}

const start: Node = new Node(0, 0, "a".charCodeAt(0));
const end: Node = new Node(0, 0, "z".charCodeAt(0));

const grid: Array<Array<Node>> = data.split("\n").map((line, i) => {
  return line.split("").reduce<Array<Node>>((prev, c, j) => {
    if (c === "S") {
      start.i = i;
      start.j = j;
      return [...prev, start];
    } else if (c === "E") {
      end.i = i;
      end.j = j;
      return [...prev, end];
    }
    return [...prev, new Node(i, j, c.charCodeAt(0))];
  }, []);
});

function shortestPath(start: Node) {
  const queue: Array<Node> = [start];

  while (true) {
    const current = queue.shift();
    if (!current) {
      break;
    }

    if (current.visited) {
      continue;
    }

    current.visited = true;

    if (current.i === end.i && current.j === end.j) {
      return current.steps;
    }

    const up = grid[current.i - 1]?.[current.j];
    const down = grid[current.i + 1]?.[current.j];
    const left = grid[current.i]?.[current.j - 1];
    const right = grid[current.i]?.[current.j + 1];

    if (up && up.elevation <= current.elevation + 1 && !up.visited) {
      up.steps = current.steps! + 1;
      queue.push(up);
    }
    if (down && down.elevation <= current.elevation + 1 && !down.visited) {
      down.steps = current.steps! + 1;
      queue.push(down);
    }
    if (left && left.elevation <= current.elevation + 1 && !left.visited) {
      left.steps = current.steps! + 1;
      queue.push(left);
    }
    if (right && right.elevation <= current.elevation + 1 && !right.visited) {
      right.steps = current.steps! + 1;
      queue.push(right);
    }
  }
}

function simulate() {
  const possibleStarts: Node[] = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j].elevation === "a".charCodeAt(0)) {
        possibleStarts.push(grid[i][j]);
      }
    }
  }
  return Math.min(
    ...possibleStarts.map((possibleStart) => {
      resetData();
      return shortestPath(possibleStart) ?? Number.MAX_VALUE;
    })
  );
}

function resetData() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      grid[i][j].visited = false;
      grid[i][j].steps = 0;
    }
  }
}

console.log(simulate());
