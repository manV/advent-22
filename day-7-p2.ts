const data = await Deno.readTextFile("./day-7-input.txt");

enum NodeType {
  DIRECTORY = "DIRECTORY",
  FILE = "FILE",
}

interface Node {
  name: string;
  type: NodeType;
  size: number;
  parent: Node | null;
  children: Node[] | null;
}

let root: Node | null = null;
let currentNode: Node | null = null;

data.split("$ ").forEach((commandStr) => {
  const commandWithOutput = commandStr.split("\n").filter((str) => str.length);
  if (!commandWithOutput.length) return;
  const command = commandWithOutput[0];
  if (command === "cd /") {
    root = {
      name: "/",
      parent: null,
      size: 0,
      type: NodeType.DIRECTORY,
      children: [],
    };
    currentNode = root;
  } else if (command.startsWith("cd")) {
    const [_, directory] = command.split(" ");
    if (directory === ".." && currentNode?.parent) {
      currentNode = currentNode.parent;
    } else {
      currentNode =
        currentNode?.children?.find((child) => child.name === directory) ??
        null;
    }
  } else {
    for (let i = 1; i < commandWithOutput.length; i++) {
      const line = commandWithOutput[i];
      const [lineType, name] = line.split(" ");
      currentNode?.children?.push({
        name,
        type: lineType === "dir" ? NodeType.DIRECTORY : NodeType.FILE,
        size: lineType === "dir" ? 0 : parseInt(lineType, 10),
        children: lineType === "dir" ? [] : null,
        parent: currentNode,
      });
    }
  }
});

function calculateTotalSizes(node: Node) {
  node.size =
    node.children?.reduce((prev, child) => {
      return (
        prev +
        (child.type === NodeType.DIRECTORY
          ? calculateTotalSizes(child)
          : child.size)
      );
    }, 0) ?? node.size;

  return node.size;
}

calculateTotalSizes(root!);

const sizeToFree = 30000000 - (70000000 - root!.size);
console.log("size to free for update", sizeToFree);

let closest = root!;

function findClosestDirectoryToDelete(node: Node) {
  if (
    node.type === NodeType.DIRECTORY &&
    node.size >= sizeToFree &&
    node.size - sizeToFree < closest.size - sizeToFree
  ) {
    closest = node;
  }

  node.children?.forEach((node) => {
    findClosestDirectoryToDelete(node);
  });
}

findClosestDirectoryToDelete(root!);

console.log(
  "size of the directory that can be deleted which would free up enough space for update",
  closest!.size
);
