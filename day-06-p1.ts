const data = await Deno.readTextFile("./day-6-input.txt");

const buffer: Array<string> = [];

for (let i = 0; i < data.length; i++) {
  const c = data[i];
  buffer.push(c);
  if (buffer.length > 4) {
    buffer.shift();
  }
  if (
    buffer.length === 4 &&
    checkAllDiff(buffer[0], buffer[1], buffer[2], buffer[3])
  ) {
    console.log(i + 1);
    break;
  }
}

function checkAllDiff(a: string, b: string, c: string, d: string) {
  const set = new Set<string>();
  set.add(a);
  set.add(b);
  set.add(c);
  set.add(d);
  if (set.size === 4) return true;
  return false;
}
