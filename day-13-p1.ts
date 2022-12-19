const data = await Deno.readTextFile("./day-13-input.txt");

const pairsStr = data.split("\n\n");

type ArrayElement = number | ArrayElement[];

let sum = 0;

pairsStr.forEach((pairStr, index) => {
  const [msg1Str, msg2Str] = pairStr.split("\n");
  const msg1 = strListToArray(msg1Str);
  const msg2 = strListToArray(msg2Str);
  if (compareMessages(msg1, msg2)) {
    sum += index + 1;
  }
});

console.log("answer", sum);

function compareMessages(
  msg1: ArrayElement[],
  msg2: ArrayElement[]
): boolean | "cont" {
  while (msg1.length || msg2.length) {
    const el1 = msg1.shift();
    const el2 = msg2.shift();

    if (typeof el1 === "number" && typeof el2 === "number") {
      if (el1 < el2) return true;
      if (el1 > el2) return false;
    } else if (Array.isArray(el1) && Array.isArray(el2)) {
      const res = compareMessages(el1, el2);
      if (typeof res === "boolean") return res;
    } else if (el1 === undefined || el2 === undefined) {
      if (el1 === undefined) return true;
      if (el2 === undefined) return false;
    } else if (Array.isArray(el1) || Array.isArray(el2)) {
      const el1Array = Array.isArray(el1) ? el1 : [el1];
      const el2Array = Array.isArray(el2) ? el2 : [el2];
      const res = compareMessages(el1Array, el2Array);
      if (typeof res === "boolean") return res;
    }
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
