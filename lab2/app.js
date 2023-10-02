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
