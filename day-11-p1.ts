const data = await Deno.readTextFile("./day-11-input.txt");

type OperationType = "Multiply" | "Add" | "Power";

class Monkey {
  itemsHolding: Array<number>;
  operationType: OperationType;
  operationValue: number;
  testDivisableBy: number;
  testResult: {
    true: number;
    false: number;
  };
  constructor(
    itemsHolding: Array<number>,
    operationType: OperationType,
    oprationValue: number,
    testDivisableBy: number,
    testResult: { true: number; false: number }
  ) {
    this.itemsHolding = itemsHolding;
    this.operationType = operationType;
    this.operationValue = oprationValue;
    this.testDivisableBy = testDivisableBy;
    this.testResult = testResult;
  }
}

const monkeys: Array<Monkey> = data.split("\n\n").map((monkeyDataStr) => {
  const monkeyData = monkeyDataStr.split("\n");
  const itemsHolding = monkeyData[1]
    .split(": ")[1]
    .split(", ")
    .map((item) => parseInt(item, 10));
  const opMatches = monkeyData[2]
    .split(": ")[1]
    .matchAll(/new = (?<op1>(old|\d+)) (?<op>(\+|\*)) (?<op2>(old|\d+))/g);
  let opType: OperationType | null = null;
  let opValue: number | null = null;
  for (const match of opMatches) {
    const op1 = match.groups!.op1;
    const op2 = match.groups!.op2;
    const op = match.groups!.op;
    if (op1 === "old" && op2 === "old") {
      if (op === "+") {
        opType = "Multiply";
        opValue = 2;
      } else if (op === "*") {
        opType = "Power";
        opValue = 2;
      }
    } else {
      opType = op === "+" ? "Add" : "Multiply";
      opValue = parseInt(op2, 10);
    }
  }
  const testDivisableBy = parseInt(
    monkeyData[3].split(" ")[monkeyData[3].split(" ").length - 1],
    10
  );

  const trueTestResult = parseInt(
    monkeyData[4].split(" ")[monkeyData[4].split(" ").length - 1],
    10
  );
  const falseTestResult = parseInt(
    monkeyData[5].split(" ")[monkeyData[5].split(" ").length - 1],
    10
  );

  return new Monkey(itemsHolding, opType!, opValue!, testDivisableBy, {
    true: trueTestResult,
    false: falseTestResult,
  });
});

function simulate() {
  const monkeyRoundsMap: Map<Monkey, number> = new Map();
  monkeys.forEach((monkey) => monkeyRoundsMap.set(monkey, 0));
  for (let i = 0; i < 20; i++) {
    for (const monkey of monkeys) {
      while (monkey.itemsHolding.length > 0) {
        const item = monkey.itemsHolding.shift();
        if (typeof item === "undefined") break;
        let newWorryLevel = 0;
        if (monkey.operationType === "Add") {
          newWorryLevel = item + monkey.operationValue;
        } else if (monkey.operationType === "Multiply") {
          newWorryLevel = item * monkey.operationValue;
        } else if (monkey.operationType === "Power") {
          newWorryLevel = item ** monkey.operationValue;
        }
        newWorryLevel = Math.floor(newWorryLevel / 3);

        const throwToMonkeyIndex =
          newWorryLevel % monkey.testDivisableBy === 0
            ? monkey.testResult.true
            : monkey.testResult.false;
        monkeys[throwToMonkeyIndex].itemsHolding.push(newWorryLevel);
        monkeyRoundsMap.set(monkey, monkeyRoundsMap.get(monkey)! + 1);
      }
    }
  }
  return findMonkeyBusiness(monkeyRoundsMap);
}

console.log(simulate());

function findMonkeyBusiness(map: Map<Monkey, number>) {
  const topTwo = [0, 0];
  for (const monkeyThrows of map.values()) {
    if (monkeyThrows > topTwo[0]) {
      topTwo[1] = topTwo[0];
      topTwo[0] = monkeyThrows;
    } else if (monkeyThrows > topTwo[1]) {
      topTwo[1] = monkeyThrows;
    }
  }
  return topTwo[0] * topTwo[1];
}
