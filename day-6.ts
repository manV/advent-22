const data = await Deno.readTextFile("./day-6-input.txt");

const buffer: Array<string> = [];

for (let i = 0; i < data.length; i++) {
  const c = data[i];
  buffer.push(c);
  if (buffer.length > 14) {
    buffer.shift();
  }
  if (buffer.length === 14 && checkAllDiff(...buffer)) {
    console.log(i + 1);
    break;
  }
}

function checkAllDiff(...chars: string[]) {
  const set = new Set<string>();
  chars.forEach((c) => set.add(c));
  if (set.size === 14) return true;
  return false;
}
