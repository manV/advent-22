const data = await Deno.readTextFile("./day-10-input.txt");

type Instruction =
  | {
      kind: "noop";
    }
  | {
      kind: "addx";
      val: number;
      pendingCycles: number;
    };

const instructions: Instruction[] = data.split("\n").map((instStr) => {
  if (instStr === "noop") {
    return { kind: "noop" };
  }
  return {
    kind: "addx",
    val: parseInt(instStr.split(" ")[1], 10),
    pendingCycles: 2,
  };
});

class CPU {
  private registerX = 1;
  private instructions: Instruction[];
  private cycle = 0;
  constructor(instructions: Instruction[]) {
    this.instructions = instructions;
  }
  tick() {
    const currentInstruction = this.instructions[0];
    if (currentInstruction.kind === "noop") {
      this.cycle += 1;
      instructions.shift();
    } else if (currentInstruction.kind === "addx") {
      this.cycle += 1;
      currentInstruction.pendingCycles -= 1;
      if (currentInstruction.pendingCycles === 0) {
        this.registerX += currentInstruction.val;
        instructions.shift();
      }
    }
  }
  hasInstructionsToExecute() {
    return !!this.instructions.length;
  }
  getCycle() {
    return this.cycle;
  }
  getRegisterX() {
    return this.registerX;
  }
}

type Pixel = "lit" | "dark";
class CRT {
  screen = new Array<Pixel>(240).fill("dark");
  drawPixel(spritePosition: number, cycle: number) {
    const cycleLine = Math.floor(cycle / 40);
    const adjustedSpriteLocation = cycleLine * 40 + spritePosition;
    if (
      [
        adjustedSpriteLocation - 1,
        adjustedSpriteLocation,
        adjustedSpriteLocation + 1,
      ].includes(cycle)
    ) {
      if (this.screen[cycle]) {
        this.screen[cycle] = "lit";
      }
    }
  }
  print() {
    const arr: Array<Array<string>> = [];
    this.screen.forEach((pixel, index) => {
      const line = Math.floor(index / 40);
      if (!arr[line]) arr[line] = [];
      arr[line].push(pixel === "dark" ? "." : "#");
    });
    console.log(arr.map((line) => line.join(" ")).join("\n"));
  }
}

// inspect **during** the cycle, so still use old values!
function simulate() {
  const cpu = new CPU(instructions);
  const crt = new CRT();
  while (cpu.hasInstructionsToExecute()) {
    crt.drawPixel(cpu.getRegisterX(), cpu.getCycle());
    cpu.tick();
  }
  crt.print();
}

simulate();
