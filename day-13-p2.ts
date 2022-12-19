const data = await Deno.readTextFile("./day-13-input.txt");

const pairsStr = data.split("\n\n");

type ArrayElement = number | ArrayElement[];

const divider1: ArrayElement = [[2]];
const divider2: ArrayElement = [[6]];
const messages: ArrayElement[] = [divider1, divider2];

pairsStr.forEach((pairStr) => {
  const [msg1Str, msg2Str] = pairStr.split("\n");
  const msg1 = strListToArray(msg1Str);
  const msg2 = strListToArray(msg2Str);
  messages.push(msg1);
  messages.push(msg2);
});

messages.sort((a, b) => {
  const comparisonResult = compareMessages([a], [b], 0);

  if (comparisonResult === true || comparisonResult === "cont") {
    return -1;
  }
  return 1;
});

console.log(
  "result",
  (messages.indexOf(divider1) + 1) * (messages.indexOf(divider2) + 1)
);

function compareMessages(
  msg1: ArrayElement[],
  msg2: ArrayElement[],
  index: number
): boolean | "cont" {
  while (index < msg1.length || index < msg2.length) {
    const el1: ArrayElement | undefined = msg1[index];
    const el2: ArrayElement | undefined = msg2[index];

    if (typeof el1 === "number" && typeof el2 === "number") {
      if (el1 < el2) return true;
      if (el1 > el2) return false;
    } else if (Array.isArray(el1) && Array.isArray(el2)) {
      const res = compareMessages(el1, el2, 0);
      if (typeof res === "boolean") return res;
    } else if (el1 === undefined || el2 === undefined) {
      if (el1 === undefined) return true;
      if (el2 === undefined) return false;
    } else if (Array.isArray(el1) || Array.isArray(el2)) {
      const el1Array = Array.isArray(el1) ? el1 : [el1];
      const el2Array = Array.isArray(el2) ? el2 : [el2];
      const res = compareMessages(el1Array, el2Array, 0);
      if (typeof res === "boolean") return res;
    }
    index++;
  }

  return "cont";
}

function strListToArray(listStr: string): ArrayElement[] {
  const chars = listStr.split("");
  const result: ArrayElement[] = [];
  chars.shift();
  chars.pop();
  while (chars.length) {
    result.push(parseFullNumberOrArray(chars));
  }
  return result;
}

function parseFullNumberOrArray(chars: string[]): ArrayElement {
  if (!["[", "]", ","].includes(chars[0])) {
    let numStr = chars.shift()!;
    while (chars.length && !["[", "]", ","].includes(chars[0])) {
      numStr += chars.shift();
    }
    if (chars.length && chars[0] === ",") chars.shift();
    return parseInt(numStr, 10);
  }

  if (chars[0] === "[") {
    chars.shift();
    const arr: ArrayElement[] = [];
    while ((chars[0] as string) !== "]") {
      arr.push(parseFullNumberOrArray(chars));
    }
    chars.shift();
    if (chars.length && (chars[0] as string) === ",") chars.shift();
    return arr;
  }

  console.log(chars);
  throw new Error("should not happen");
}
