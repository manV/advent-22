const data = await Deno.readTextFile("./day-3-input.txt");

const priorityArray = [];
for (let i = 1; i <= 52; i++) {
  priorityArray.push(i);
}

const res = data
  .split("\n")
  .map((rucksackItem) => {
    const compLen = rucksackItem.length / 2;
    return [rucksackItem.slice(0, compLen), rucksackItem.slice(compLen)];
  })
  .map(([comp1, comp2]) => {
    const commonChar = findCommonCharactor(comp1, comp2);
    if (!commonChar) throw new Error("common char not found");
    return findPriority(commonChar);
  })
  .reduce((prev, curr) => {
    return prev + curr;
  }, 0);

console.log(res);

function findCommonCharactor(str1: string, str2: string) {
  for (const c1 of str1) {
    if (str2.includes(c1)) return c1;
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
