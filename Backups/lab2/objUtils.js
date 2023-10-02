/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

import * as help from "./helpers.js";

export let solvePuzzles = (puzzles, pieces) => {
   help.checkIsUndefined(puzzles, "The first parameter");
   help.checkIsUndefined(pieces, "The second parameter");

   help.checkIsNonEmptyArray(puzzles, "The first parameter");

   help.checkIsNonEmptyObject(pieces, "The second parameter");
   puzzles.forEach((elem) => help.checkIsProperObject(elem));
   puzzles.forEach((elem) => help.checkIsNonEmptyObject(elem));

   const POSSIBLE_PIECES = [`a`, `b`, `c`, `d`, `e`];

   Object.keys(pieces).forEach((elem) => {
      if (!POSSIBLE_PIECES.includes(elem)) {
         throw `pieces contains key that is not a-e`;
      }
   });

   puzzles.forEach((puzzle) => {
      Object.keys(puzzle).forEach((elem) => {
         if (!POSSIBLE_PIECES.includes(elem)) {
            throw `pieces contains key that is not a-e`;
         }
      });
   });

   let missingPieces = puzzles.map((puzzle) => {
      POSSIBLE_PIECES.forEach((key) => {
         if (!(key in puzzle)) {
            puzzle[key] = pieces[key];
         }
      });
      return puzzle;
   });

   return missingPieces;
};

export let evaluatePokerHand = (hand, communityCards) => {
   const VALID_KEYS = ["suit", "value"];
   const VALID_NUMS = ["2", "3", "4", "5", "6", "7", "8", "9", "10"];
   const VALID_FACES = ["J", "Q", "K", "A"];
   const VALID_VALUES = VALID_NUMS.concat(VALID_FACES);
   const VALID_SUITS = ["hearts", "clubs", "diamonds", "spades"];

   help.checkIsUndefined(hand, "The hand");
   help.checkIsUndefined(communityCards, "The community cards");

   help.checkIsNonEmptyArray(hand, "The hand");
   help.checkIsNonEmptyArray(communityCards, "The community cards");

   hand.forEach((card, index) => {
      help.checkIsNonEmptyObject(card);
      help.checkArrayIsConstrainedTo(
         Object.keys(card),
         `card at ${index}`,
         VALID_KEYS
      );
      if (Object.keys(card).length < 2 || Object.keys(card).length > 2) {
         throw `Card at ${index} does not have the right amount of elements (2)`;
      }
   });

   hand = hand.map((card) => {
      card["suit"] = card["suit"].trim();
      card["value"] = card["value"].trim();
      return card;
   });
   communityCards = communityCards.map((card) => {
      card["suit"] = card["suit"].trim();
      card["value"] = card["value"].trim();
      return card;
   });

   hand.forEach((card, index) => {
      if (!VALID_SUITS.includes(card.suit)) {
         throw `Card at ${index} in hand invalid suit`;
      }

      if (!VALID_VALUES.includes(card.value)) {
         throw `Card at ${index} in hand invalid value`;
      }
   });

   communityCards.forEach((card, index) => {
      if (!VALID_SUITS.includes(card.suit)) {
         throw `Card at ${index}    in community cards invalid suit`;
      }

      if (!VALID_VALUES.includes(card.value)) {
         throw `Card at ${index} in community cards invalid value`;
      }
   });

   let allCards = hand.concat(communityCards);
   // Check for straights
   let cardToArrayNumber = (card) => {
      let val = card.value;
      let suit = card.suit;
      const faceObj = { J: 11, Q: 12, K: 13 };
      const suitObj = { hearts: 100, clubs: 200, diamonds: 300, spades: 400 };
      let result = -1;
      result = Number(val) + suitObj[suit];
      if (isNaN(result)) {
         if (val === "A") {
            result = [1 + suitObj[suit], 14 + suitObj[suit]];
         } else {
            result = faceObj[val] + suitObj[suit];
         }
      }
      return result;
   };

   let cardVals = allCards.map((card) => {
      return cardToArrayNumber(card);
   });

   cardVals = cardVals.flat(Infinity);

   const numSort = (num1, num2) => num1 - num2;
   cardVals = cardVals.sort(numSort);

   let consecValues = 0;
   let prevCard = cardVals[0];
   for (let i = 1; i < cardVals.length; i++) {
      let curCard = cardVals[i];
      if (curCard === prevCard + 1) {
         consecValues++;
         if (consecValues >= 4) {
            return `Straight Flush`;
         }
      } else {
         consecValues = 0;
      }
      prevCard = curCard;
   }

   let values = allCards.map((card) => card.value);

   let valueCounts = {};
   values.forEach((val) => {
      if (Object.keys(valueCounts).includes(val)) {
         valueCounts[val]++;
      } else {
         valueCounts[val] = 1;
      }
   });

   let matchingMax = help.maxKeyValueInObject(valueCounts);
   matchingMax = matchingMax[1];
   if (matchingMax >= 3) {
      return `Three of a Kind`;
   } else if (matchingMax === 2) {
      return `Pair`;
   }

   return `High Card`;
};

export let combineObjects = (arr) => {
   help.checkIsUndefined(arr);
   help.checkIsProperArray(arr);
   help.checkIsNonEmptyArray(arr);
   arr.forEach((elem) => help.checkIsProperObject(elem));
   arr.forEach((elem) => help.checkIsNonEmptyObject(elem));
   if (arr.length < 2) {
      throw `Array must have atleast 2 entries`;
   }

   /* 
  Approach:
  Extract keys of each object and get the common keys 
  Make an object whose keys are the common keys of the objects
  Then for each key push the value of the key in the first object, 
  then the second and third etc, until no more keys or objects
  */

   let keysArr = arr.map((obj) => Object.keys(obj));

   // could use merge common elements for this? but i don't want to
   // so elegant!
   let commonKeys = keysArr.shift().filter((key) => {
      return keysArr.every((curKey) => {
         return curKey.indexOf(key) !== -1;
      });
   });

   // so elegant!
   let combinedObj = {};
   commonKeys.forEach((key) => {
      combinedObj[key] = arr.map((obj) => obj[key]);
   });

   return combinedObj;
};
