// Only Odds

// given an array of numbers, print a new array which contains only the odd values in the first array.
// given [2, 4, 6, 8, 11, 20, 15, 22], print [11, 15].
// given [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], print [1, 3, 5, 7, 9].
// given [70, 42, 55, 81, 21, 91, 34], print [55, 81, 21, 91].
// given [2, 4, 6, 8, 10, 11, 12], print [11].
//
// initialize new array
// loop through the inital array. if value mod 2 is 1, push to new array.
//

const inputArray1 = [2, 4, 6, 8, 11, 20, 15, 22];
const inputArray2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const inputArray3 = [70, 42, 55, 81, 21, 91, 34];
const inputArray4 = [2, 4, 6, 8, 10, 11, 12];

let inputArray = inputArray3;

const newArray = [];

for (let i = 0; i < inputArray.length; i++) {
  const iMod = inputArray[i] % 2;
  if (iMod === 1) newArray.push(inputArray[i]);
}

console.log(newArray);

// Vowel Vs Consonant

// given a string of lowercase letters, print the word followed by how many consonants and vowels it has.

// given "hello", print "hello has 3 consonants and 2 vowels"
// given "ukuleke", print "ukelele has 3 consonants and 4 vowels"
// given "awesome", print "awesome has 3 consonants and 4 vowels"
// given "onomonopoeia", print "onomonopia has 4 consonants and 6 vowels"
// given "textbook", print "textbook has 5 consonants and 3 vowels"

// for each letter in the string, if the letter is a, e, i, o, or u, add 1 to the vowel counter. otherwise, add 1 to the consonant counter.
// print template literal with input string, number of consonants, and number of vowels.

const inputString1 = "hello";
const inputString2 = "ukulele";
const inputString3 = "awesome";
const inputString4 = "onomonopoeia";
const inputString5 = "textbook";

let inputString = inputString5;

let nVowels = 0;
let nConsonants = 0;

for (let i = 0; i < inputString.length; i++) {
  if (
    inputString[i] === "a" ||
    inputString[i] === "e" ||
    inputString[i] === "i" ||
    inputString[i] === "o" ||
    inputString[i] === "u"
  ) {
    nVowels++;
  } else {
    nConsonants++;
  }
}
console.log(
  `${inputString} has ${nConsonants} consonants and ${nVowels} vowels`
);

// Reverse Array

// given an array, print an array in reverse order.

// given [1, 2, 3], print [3, 2, 1]
// given [1, 3, 5, 7, 9, 11], print [11, 9, 7, 5, 3, 1]
// given [20, 50, 30, 60, 200], print [200, 60, 30, 50, 20]
// given [1, -1, 2, -3, 5, -8, 13], print [13, -8, 5, -3, 2, -1, 1]

// initialize the output array
// loop through the input array in reverse order, pushing each array value to the output array.

const inputArray5 = [1, 2, 3];
const inputArray6 = [1, 3, 5, 7, 9, 11];
const inputArray7 = [20, 50, 30, 60, 200];
const inputArray8 = [1, -1, 2, -3, 5, -8, 13];

let reverseInputArray = inputArray8;

let reverseOutputArray = [];

for (let i = reverseInputArray.length - 1; i >= 0; i--) {
  reverseOutputArray.push(reverseInputArray[i]);
}
console.log(reverseOutputArray);

// FizzBuzz

// for each number 1 to 100, print "Fizz" if the number is a multiple of three. print "Buzz" if the number is a multiple of five. print "FizzBuzz" if the number is a multiple of 15. Otherwise, print the number.

// for 1, print 1.
// for 33, print "Fizz"
// for 25, print "Buzz"
// for 30, print "FizzBuzz"

for (let i = 1; i <= 100; i++) {
  i % 15 === 0
    ? console.log("FizzBuzz")
    : i % 5 === 0
    ? console.log("Buzz")
    : i % 3 === 0
    ? console.log("Fizz")
    : console.log(i);
}
