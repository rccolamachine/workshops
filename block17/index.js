// const { coffeeMenu, secretMenu } = require("./coffee_data.js");
const coffeeMenu = require("./coffee_data.js");

// Print an array of all the drinks on the menu.
const printNames = (item) => item.name;
console.log(coffeeMenu.map(printNames));

// Print an array of drinks that cost 5 and under
console.log(coffeeMenu.filter((item) => item.price <= 5).map(printNames));

// Print an array of drinks that are priced at an even number
console.log(coffeeMenu.filter((item) => !(item.price % 2)).map(printNames));

// Print the total if you were to order one of every drink.
const totalForOneOfEachDrink = coffeeMenu.reduce(
  (sum1, drink) => sum1 + drink.price,
  0
);
console.log(totalForOneOfEachDrink);

let sum2 = 0;
const totalForOneOfEachDrink2 = coffeeMenu
  .map((drink) => drink.price)
  .forEach((price) => (sum2 += price));

console.log(sum2);

const totalForOneOfEachDrink3 = coffeeMenu.forEach(
  (drink) => (sum3 += drink.price),
  (sum3 = 0)
);
console.log(sum3);

// Print an array with all the drinks that are seasonal.

const isSeasonal = (item) => item.seasonal;
console.log(coffeeMenu.filter(isSeasonal).map(printNames));

// Print all the seasonal drinks with the words "with imported beans" after the item name. For example: "affogato with imported beans".

console.log(
  coffeeMenu
    .filter(isSeasonal)
    .map((item) => `${item.name} with imported beans`)
);
