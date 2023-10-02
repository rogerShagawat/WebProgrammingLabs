/* 
TODO: Import the functions from your three modules here and write two test
cases for each function.. You should have a total of 18 test cases. do not
forget that you need to create the package.json and add the start command to run
app.js as the starting script
*/

import {
   mergeCommonElements,
   findTriangles,
   stringMetrics,
} from "./arrayUtils.js";

import { emojiCounter, sortStockPrices, mashUp } from "./stringUtils.js";

import { solvePuzzles, evaluatePokerHand, combineObjects } from "./objUtils.js";

// mergeCommonElements
try {
   const merge1 = mergeCommonElements(
      [1, 4, 8, -2, -4],
      [3, 47, 1, 8, -4],
      [12, "-4", 8, 1, 2]
   );
   console.log(`mergeCommonElements passed successfully`);
} catch (e) {
   console.error(`mergeCommonElements failed test case`);
}

try {
   const merge2 = mergeCommonElements([7, 8, 9], [], [10, 11, 12]);
   console.error(`mergeCommonElements did not error`);
} catch (e) {
   console.log(`mergeCommonElements failed successfully`);
}

// findTriangles
try {
   const triangle1 = findTriangles([
      [5, 5, 5],
      [5, 5, 6],
      [7, 8, 9],
   ]);
   console.log(`findTriangles passed successfully`);
} catch (e) {
   console.error(`findTriangles failed test case`);
}

try {
   const triangle2 = findTriangles([6, 6, 6]);
   console.error(`findTriangles did not error`);
} catch (e) {
   console.log(`findTriangles failed successfully`);
}

// stringMetrics
try {
   const met1 = stringMetrics(["bob", "bill", "malinda", "melinda"]);
   console.log(`stringMetrics passed successfully`);
} catch (e) {
   console.error(`stringMetrics failed test case`);
}

try {
   const met2 = stringMetrics(["winbows"]);
   console.error(`stringMetrics did not error`);
} catch (e) {
   console.log(`stringMetrics failed successfully`);
}

// emojiCounter
try {
   const emoji1 = emojiCounter(":happy::happy::joy::joy:");
   console.log(`emojiCounter passed successfully`);
} catch (e) {
   console.error(`emojiCounter failed test case`);
}

try {
   const emoji2 = emojiCounter("             ");
   console.error(`emojiCounter did not error`);
} catch (e) {
   console.log(`emojiCounter failed successfully`);
}

// sortStockPrices
let lastStocks = `AAPL,175.25|GOOG,135.40|AMZN,140.00`;
let currStocks = `amzn,136.75|GOOG,135.60|AAPL,180.12`;
try {
   const stock1 = sortStockPrices(lastStocks, currStocks);
   console.log(`sortStockPrices passed successfully`);
} catch (e) {
   console.error(`sortStockPrices failed test case`);
}

lastStocks = `GME,18.25|AMC, 8.00|PFE, 34.00`;
currStocks = `amc, 7.75|GME, 18.80|AAL, 13.32`;
try {
   const stock2 = sortStockPrices(lastStocks, currStocks);
   console.error(`sortStockPrices did not error`);
} catch (e) {
   console.log(`sortStockPrices failed successfully`);
}

// mashUp
try {
   const mash1 = mashUp("Roger", "Shagawat");
   console.log(`mashUp passed successfully`);
} catch (e) {
   console.error(`mashUp failed test case`);
}

try {
   const mash2 = mashUp("", "Shagawat");
   console.error(`mashUp did not error`);
} catch (e) {
   console.log(`mashUp failed successfully`);
}

// solvePuzzles
try {
   const solve1 = solvePuzzles(
      [
         { a: 3, b: 1, d: 22 },
         { b: 7, d: 53, e: "pog" },
      ],
      { a: 4, b: 0, c: 3, d: 888, e: 222 }
   );
   console.log(`solvePuzzles passed successfully`);
} catch (e) {
   console.error(`solvePuzzles failed test case`);
}

try {
   const solve1 = solvePuzzles(
      [
         { a: 3, b: 1, d: 22 },
         { b: 7, d: 53, e: "pog" },
      ],
      { a: 4, b: 0, c: 3, d: 888, f: 222 }
   );
   console.error(`solvePuzzles did not error`);
} catch (e) {
   console.log(`solvePuzzles failed successfully`);
}

// evaluatePokerHand
let hand = [
   { suit: "hearts", value: "5" },
   { suit: "clubs", value: "5" },
];
let communityCards = [
   { suit: "diamonds", value: "4" },
   { suit: "spades", value: "5" },
   { suit: "hearts", value: "2" },
   { suit: "clubs", value: "J" },
   { suit: "diamonds", value: "Q" },
];
try {
   const poker1 = evaluatePokerHand(hand, communityCards);
   console.log(`evaluatePokerHand passed successfully`);
} catch (e) {
   console.error(`evaluatePokerHand failed test case`);
}

hand = [
   { suit: "farts :)", value: "4" },
   { suit: "clubs", value: "9" },
];
communityCards = [
   { suit: "diamonds", value: "2" },
   { suit: "spades", value: "5" },
   { suit: "hearts", value: "6" },
   { suit: "clubs", value: "7" },
   { suit: "diamonds", value: "8" },
];
try {
   const poker2 = evaluatePokerHand(hand, communityCards);
   console.error(`evaluatePokerHand did not error`);
} catch (e) {
   console.log(`evaluatePokerHand failed successfully`);
}

// combineObjects
try {
   const comb1 = combineObjects([
      { a: 1, b: 2, c: 3, d: 4 },
      { d: "pc", e: "linus", a: "winbows" },
      { a: 7, d: 1 },
   ]);
   console.log(`combineObjects passed successfully`);
} catch (e) {
   console.error(`combineObjects failed test case`);
}

try {
   const comb2 = combineObjects([
      {},
      { d: "pc", e: "linus", a: "winbows" },
      { a: 7, d: 1 },
   ]);
   console.error(`combineObjects did not error`);
} catch (e) {
   console.log(`combineObjects failed successfully`);
}

// import { assertError, assertEquals } from "./testing.js";

// import {
//    checkIsProperString,
//    checkIsUndefined,
//    checkIsProperObject,
//    checkIsNonEmptyArray,
//    checkIsNonEmptyObject,
//    checkKeysConstainedTo,
// } from "./helpers.js";

/* SOLVEPUZZLES TESTING */
// try {
//    console.log(
//       solvePuzzles(
//          [
//             { a: 23, b: 17, d: 2 },
//             { b: 17, d: 3, e: "hello" },
//          ],
//          { a: 45, b: 60, c: -3, d: 88, e: 12 }
//       )
//    );
// } catch (e) {
//    console.log(e);
// }

// const VALID_KEYS = ['a', 'b', 'c', 'd', 'e'];
// let testMe = {a: 5, b: 2, c: 3, d: 4, e: 5};
// try {
//   checkIsProperObject({a:1, b:2});
//   // checkKeysConstainedTo({a: 5, b: 2, c: 3, d: 4, e: 5}, "not much", VALID_KEYS);
// } catch(e) {
//   console.log(e);
// }

/* TESTING SORT STOCK PRICES */

// let lastStocks = ` AAPL,175.25|GOOG,135.40|AMZN,140.00`;
// let currStocks = `amzn,136.75|GOOG,135.60|AAPL,180.12`;

// try {
//    console.log(sortStockPrices(lastStocks, currStocks));
// } catch (e) {
//    console.log(e);
// }

/* TESTING MERGE COMMON ELEMENTS */
// assertError(mergeCommonElements, [[1, 1, 2, 3], "string", [6, 4, 5, 6, 1]])
// assertEquals(mergeCommonElements, [[1, 1, 2, 3], [6, 4, 5, 6, 1]], [1])
// assertEquals(mergeCommonElements, [[3, 4, 1, -2, -4], [3, 45, 1, 24, -4], [112, "-4", 0, 1, 3,]], [1, 3]) //returns [1, 3]
// assertEquals(mergeCommonElements, [[35, "hello", 24,  ["abc", 7], 3, -4], [3, ["62", 4], 1, 24, -4, "abc"]], [-4, 3, 24, "abc"]) //returns [-4, 3, 24, "abc"]
// assertEquals(mergeCommonElements, [[5, 3, "apple", "banana"], [5, "banana", 2, 4], [1, 5, "apple", "banana", 0]], [5, "banana"]) // returns [5, "banana"]
// assertEquals(mergeCommonElements, [[4, [5, "apple"], 3], [3, 4, [5, "apple"]], [3, "apple", 6, 7]], [3, "apple"]) // returns [3, "apple"]
// assertEquals(mergeCommonElements, [["apple", "apple"], ["apple", "apple", "banana"], ["apple", "apple", "mango"]], ["apple"]) // returns ["apple"]
// assertError(mergeCommonElements, [[1, 2, 3], "string", [4, 5, 6]]) // throws an error
// assertError(mergeCommonElements, [[1, 2, 3], [], [4, 5, 6]]) // throws an error

/* TESTING FIND TRIANGLES */
// assertEquals(findTriangles, [[[3,3,3], [3,3,4], [5,4,2]]], {'0': [3.9,9, "equilateral"], '1': [4.47,10, "isosceles"], '2': [3.8,11, "scalene"]});
// assertEquals(findTriangles, [[[7,5,5], [2,4,3], [12,12,11]]], {'0': [12.5, 17, "isosceles"], '1': [2.90, 9, "scalene"], '2': [58.66,35, "isosceles"]});
// assertError(findTriangles, [[5, 5, 5]])

/* TESTING STRING METRICS */
// try {
//   console.log(stringMetrics(['rapgod', 'rapgod']));
// } catch (e) {
//   console.log(e);
// }

// try {
//    console.log(stringMetrics(["hello", "patrick", "hill", "bill", "beventeen", "trees", "seventeen"]) );
// } catch (e) {
//    console.log(e);
// }

/* EMOJI COUNTER TESTING */
// assertEquals(emojiCounter, "I am so happy :joy::joy: about scoring a ::100: on my test! I feel :fire:! But :100: doesn't count. Neither does :joy::100: in a row.", 7);
// assertEquals(emojiCounter, "troll", 0);
// assertEquals(emojiCounter, ":fire::fire:", 2);
// assertEquals(emojiCounter, ":::fire:fire:", 1);
// assertEquals(emojiCounter, ":fire::pregnant_man::fire:", 3);
// assertEquals(emojiCounter, "Today was :sunny::sunny:::rainy::sunny:::sunny:rainy::sunny::rainy:::sunny:::rainy:sunny:!", 9);
// assertEquals(emojiCounter, "::", 0);
// assertError(emojiCounter, "        ");
// assertError(emojiCounter, []);

/* SORTSTOCKPRICES TESTING */
// let lastStocks;
// let currStocks;
// lastStocks = `AAPL,175.25|GOOG,135.40|AMZN,140.00`;
// currStocks = `amzn,136.75|GOOG,135.60|AAPL,180.12`;
// try {
//    console.log(sortStockPrices(lastStocks, currStocks));
// } catch (e) {
//    console.log(e);
// }

// lastStocks = `GME,18.25|AMC, 8.00|PFE, 34.00`;
// currStocks = `amc, 7.75|GME, 18.80|AAL, 13.32`;
// try {
//    sortStockPrices(lastStocks, currStocks);
// } catch (e) {
//    console.log(e);
// }

// assertError(sortStockPrices, [lastStocks, currStocks]); // throws an error

/* MASHUP TESTING */
// assertEquals(mashUp, ["Patrick", "Hill"], "Hillick Patr");
// assertEquals(mashUp, ["helloooo", "world!"], "worloooo helld!");
// assertError(mashUp, ["Patrick", ""]);
// assertError(mashUp, []);
// assertError(mashUp, ["John"]);
// assertError(mashUp, ["h", "Hello"]);
// assertError(mashUp, ["h", "e"]);
// assertError(mashUp, ["Hello", "e"]);
// assertError(mashUp, ["", "e"]);

/* EVALUATE POKERHAND TESTING */

// hand = [
//    { suit: "hearts", value: "2" },
//    { suit: "hearts", value: "3" },
// ];
// communityCards = [
//    { suit: "hearts", value: "4" },
//    { suit: "hearts", value: "5" },
//    { suit: "hearts", value: "A" },
// ];
// try {
//    console.log(evaluatePokerHand(hand, communityCards)); // Returns "Straight Flush"
// } catch (e) {
//    console.log(e);
// }

/* COMBINE OBJECTS TESTING */

// const testCase = [
//    { a: 3, b: 7, c: 5, d: 7 },
//    { d: 4, e: 9, a: "apple" },
//    { a: 8, d: 2 },
// ];
// try {
//    console.log(combineObjects(testCase));
// } catch (e) {
//    console.log(e);
// }
