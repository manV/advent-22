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

// inspect **during** the cycle, so still use old values!
function simulate() {
  const cyclesToInspect = [20, 60, 100, 140, 180, 220];
  const cpu = new CPU(instructions);
  let result = 0;
  while (cpu.hasInstructionsToExecute()) {
    if (cyclesToInspect.includes(cpu.getCycle() + 1)) {
      result += (cpu.getCycle() + 1) * cpu.getRegisterX();
    }
    cpu.tick();
  }
  return result;
}

console.log(simulate());
