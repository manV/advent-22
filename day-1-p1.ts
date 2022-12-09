const data = await Deno.readTextFile("./day-1-input.txt");

const maxCalories = Math.max(
  ...data.split("\n\n").map((single) => {
    return single
      .split("\n")
      .map((calStr) => parseInt(calStr, 10))
      .reduce((prev, curr) => {
        return prev + curr;
      }, 0);
  })
);

console.log(maxCalories);
