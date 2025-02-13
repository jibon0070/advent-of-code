import input from "./input";

const cache: Record<string, number> = {};

class Wire {
  constructor(
    private blueprient: Record<string, string>,
    private instructions: string,
    private name: string,
  ) {}

  private get getExpensiveValue(): number {
    const commandRegex = /(AND)|(OR)|(LSHIFT)|(RSHIFT)|(NOT)/;

    const nameRegex = /^\D+$/;

    if (!commandRegex.test(this.instructions)) {
      if (nameRegex.test(this.instructions)) {
        return new Wire(
          this.blueprient,
          this.blueprient[this.instructions],
          this.instructions,
        ).value;
      }

      return Number(this.instructions);
    }

    const command = this.instructions.match(commandRegex)!.at(0)!;

    if (command === "NOT") {
      const name = this.instructions.replace("NOT ", "");
      let value: number;

      if (nameRegex.test(name)) {
        value = new Wire(this.blueprient, this.blueprient[name], name).value;
      } else {
        value = Number(name);
      }

      return ~value;
    }

    const [name1, name2] = this.instructions.split(` ${command} `);
    let value1: number, value2: number;

    if (nameRegex.test(name1)) {
      value1 = new Wire(this.blueprient, this.blueprient[name1], name1).value;
    } else {
      value1 = Number(name1);
    }

    if (nameRegex.test(name2)) {
      value2 = new Wire(this.blueprient, this.blueprient[name2], name2).value;
    } else {
      value2 = Number(name2);
    }

    if (command === "AND") {
      return value1 & value2;
    } else if (command === "OR") {
      return value1 | value2;
    } else if (command === "LSHIFT") {
      return value1 << value2;
    } else if (command === "RSHIFT") {
      return value1 >> value2;
    }

    return 0;
  }

  get value(): number {
    if (!cache[this.name]) {
      console.log("expensive");
      cache[this.name] = this.getExpensiveValue;
    } else {
      console.log("cheap");
    }

    return cache[this.name];
  }
}

const blueprient: Record<string, string> = {};

for (const instruction of input.split("\n")) {
  const [value, name] = instruction.split(" -> ");
  blueprient[name] = value;
}

const a = new Wire(blueprient, blueprient["a"], "a");

console.log(a.value);
