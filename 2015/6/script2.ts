import input from "./input";

class Bulb {
  brightness = 0;

  toggle() {
    this.brightness += 2;
  }

  on() {
    this.brightness += 1;
  }

  off() {
    this.brightness = Math.max(0, this.brightness - 1);
  }
}

class Bulbs {
  items: Bulb[][] = [];

  constructor() {
    for (let y = 0; y < 1000; y++) {
      const row: Bulb[] = [];
      for (let x = 0; x < 1000; x++) {
        row.push(new Bulb());
      }
      this.items.push(row);
    }
  }

  count(): number {
    return this.items
      .map((row) => row.reduce((total, bulb) => total + bulb.brightness, 0))
      .reduce((total, count) => total + count);
  }
}

function getCommand(instruction: string): "turn on" | "turn off" | "toggle" {
  if (instruction.startsWith("turn")) {
    if (instruction.startsWith("turn on")) {
      return "turn on";
    } else {
      return "turn off";
    }
  }

  return "toggle";
}

let bulbs: Bulbs = new Bulbs();

for (const instruction of input.split("\n")) {
  const command = getCommand(instruction);

  const [[startX, startY], [endX, endY]] = instruction
    .replace(`${command} `, "")
    .split(" through ")
    .map((value) => value.split(",").map(Number));

  bulbs.items = bulbs.items.map((row, y) =>
    row.map((cell, x) => {
      if (y >= startX && y <= endX && x >= startY && x <= endY) {
        if (command === "turn on") {
          cell.on();
        } else if (command === "turn off") {
          cell.off();
        } else if (command === "toggle") {
          cell.toggle();
        }
      }

      return cell;
    }),
  );
}
console.log(bulbs.count());
