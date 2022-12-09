const data = await Deno.readTextFile("./day-3-input.txt");

const priorityArray = [];
for (let i = 1; i <= 52; i++) {
  priorityArray.push(i);
}

const groups = [];
let temp = [];
const allRucksacks = data.split("\n");

for (let i = 0; i < allRucksacks.length; i++) {
  temp.push(allRucksacks[i]);
  if ((i + 1) % 3 === 0) {
    groups.push(temp);
    temp = [];
  }
}

const res = groups
  .map((group) => {
    const commonChar = findCommonCharactor(group[0], group[1], group[2]);
    if (!commonChar) throw new Error("common char not found");
    return findPriority(commonChar);
  })
  .reduce((prev, curr) => {
    return prev + curr;
  }, 0);

console.log(res);

function findCommonCharactor(
  ruck1: string,
  ruck2: string,
  ruck3: string
): string | null {
  const commonChars: string[] = [];
  for (const c1 of ruck1) {
    if (ruck2.includes(c1) && !commonChars.includes(c1)) {
      commonChars.push(c1);
    }
  }
  for (const c3 of ruck3) {
    if (commonChars.includes(c3)) return c3;
  }

  return null;
}

function findPriority(c: string) {
  const charCode = c.charCodeAt(0);
  if (charCode > 96 && charCode < 123) {
    return charCode - 96;
  } else if (charCode > 64 && charCode < 91) {
    return charCode - 64 + 26;
  }
  throw new Error("unknown common charactor");
}
