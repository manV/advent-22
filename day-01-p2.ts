const data = await Deno.readTextFile("./day-1-input.txt");

const top3Calories = data
  .split("\n\n")
  .map((single) => {
    return single
      .split("\n")
      .map((calStr) => parseInt(calStr, 10))
      .reduce((prev, curr) => prev + curr, 0);
  })
  .sort((a, b) => a - b)
  .slice(-3)
  .reduce((prev, curr) => prev + curr, 0);

console.log(top3Calories);
