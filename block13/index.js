// Is Truthy

// given a certain value, determine if it is truthy or falsy.
// if the value is truthy, print true
// otherwise, print a string corresponding to the data type of the falsy value.
// if the value is 17, should print true
// if the value is null, should print true
// if the value is "oranges" should print true
// if the value is 0, should print "The number 0 is falsy (the only falsy number)"
// if the value is "", should print "The empty string is falsy (the only falsy string)"
// if the value is undefined, should print "undefined is falsy"
// if the value is false, should print "The boolean value false is falsy"

const testValue1 = "I am a string";
const testValue2 = false;
const testValue3 = null;
const testValue4 = undefined;
const testValue5 = 0;
const testValue6 = 17;
const testValue7 = -17;
const testValue8 = "";
const testValue9 = { abs: 12 };

let value = testValue9;

// if (value) {
//   console.log(true);
// } else if (value === undefined) {
//   console.log("undefined is falsy");
// } else if (value === false) {
//   console.log("The boolean value false is falsy");
// } else if (value === null) {
//   console.log("The null value is falsy");
// } else if (value === 0) {
//   console.log("The number 0 is falsy (the only falsy number)");
// } else if (value === "") {
//   console.log("The empty string is falsy (the only empty string)");
// }

console.log(
  value
    ? true
    : typeof value === "undefined"
    ? "undefined is falsy"
    : typeof value === "boolean"
    ? "The boolean value false is falsy"
    : typeof value === "object"
    ? "The null value is falsy"
    : typeof value === "number"
    ? "The number 0 is falsy (the only falsy number)"
    : typeof value === "string"
    ? "The empty string is falsy (the only empty string)"
    : "The value does not fit the paradigm presented. If you see this error, please contact your administrator."
);

//this is more efficient because makes fewer calls to server (only checks typeof once)

if (value) {
  console.log(true);
} else {
  const inputType = typeof value;
  if (inputType === "boolean") {
    console.log("The boolean value false is falsy");
  } else if (inputType === "object") {
    console.log("The null value is falsy");
  } else if (inputType === "undefined") {
    console.log("undefined is falsy");
  } else if (inputType === "number") {
    console.log("The number 0 is falsy (the only falsy number)");
  } else if (inputType === "string") {
    console.log("The empty string is falsy (the only empty string)");
  }
}

// Number Line

// given a pair of numbers, sum them and categorize the sum based on that which most applies:
// less than -1000
// a negative number
// equal to 0
// larger than 0
// greater than 100
// if more than one of the above conditions applies, categorize according to the most exclusive category.
// print a statement including the sum and the category of the sum.
// if the first value is 50 and the second value is 51, print "101 is greater than 100"
// if the first value is 99 and the second value is -2, print "97 is greater than 0"
// if the first value is 0 and the second value is 101, print "101 is greater than 100";
// if the first value is 500 and the second value is -500, print "0 is equal to 0"
// if the first value is -1000 and the second value is 0, print "-1000 is a negative number"

//test inputs:

const nums1 = [50, 51];
const nums2 = [99, -2];
const nums3 = [0, 101];
const nums4 = [500, -500];
const nums5 = [-1000, 0];
const nums6 = [-5, 0];

// replace value with test input from above to test

let numX = nums6;

const sum = numX[0] + numX[1];

console.log(
  sum > 100
    ? `${sum} is greater than 100`
    : sum > 0
    ? `${sum} is greater than 0`
    : sum === 0
    ? `${sum} is equal to 0`
    : sum >= -1000
    ? `${sum} is a negative number`
    : `${sum} is less than -1000`
);

// Greater than 5

// given a pair of numbers, sum them and categorize the sum based on that which most applies:
// less than -1000
// a negative number
// equal to 0
// larger than 0
// greater than 100
// if more than one of the above conditions applies, categorize according to the most exclusive category.
// print a statement including the sum and the category of the sum.
// if the first value is 50 and the second value is 51, print "101 is greater than 100"
// if the first value is 99 and the second value is -2, print "97 is greater than 0"
// if the first value is 0 and the second value is 101, print "101 is greater than 100";
// if the first value is 500 and the second value is -500, print "0 is equal to 0"
// if the first value is -1000 and the second value is 0, print "-1000 is a negative number"

// test inputs:

const nums1 = [50, 51];
const nums2 = [99, -2];
const nums3 = [0, 101];
const nums4 = [500, -500];
const nums5 = [-1000, 0];
const nums6 = [-5, 0];

// replace value with test input from above to test

let numX = nums6;

const sum = numX[0] + numX[1];

console.log(
  sum > 100
    ? `${sum} is greater than 100`
    : sum > 0
    ? `${sum} is greater than 0`
    : sum === 0
    ? `${sum} is equal to 0`
    : sum >= -1000
    ? `${sum} is a negative number`
    : `${sum} is less than -1000`
);

// Pair and Compare

// given two pairs of values, compare each pair. if either of the pairs is truthy (i.e., loosely equal), print true. Otherwise, print false.
// if pair1 is "cat" and "cat" and pair2 is 6 and "6", should print true.
// if pair1 is "five" and 5 and pair2 is "dog" and "dawg", should print false.
// if pair1 is "0" and false and pair2 is "horse" and "horse", should print true.
// if pair1 is "eight" and "eight" and pair2 is "ate" and "ate", should print true.
// if pair1 is 11 and "eleven" and pair2 is "four" and "for", should print true.
// if pair1 is "cake" and "cake" and pair2 is "pie" and "pie", should print true.

const params1 = { one: ["cat", "cat"], two: [6, "6"] };
const params2 = { one: ["five", 5], two: ["dog", "dawg"] };
const params3 = { one: [0, false], two: ["horse", "horse"] };
const params4 = { one: ["eight", "eight"], two: ["ate", "ate"] };
const params5 = { one: [11, "eleven"], two: ["four", "for"] };
const params6 = { one: ["cake", "cake"], two: ["pie", "pie"] };

let params = params6;

console.log(params.one[0] === params.one[1] || params.two[0] === params.two[1]);
