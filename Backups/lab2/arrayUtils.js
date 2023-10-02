/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

import * as ic from "./helpers.js";

export let mergeCommonElements = (...args) => {
   ic.checkIsUndefined(args);
   ic.checkIsArrayLongerThanTwo(args);
   args.forEach((elem) => {
      ic.checkIsNonEmptyArray(elem);
      ic.checkIsArrayNumArrayOrString(elem);
   });

   const getIntersection = (acc, arr) => {
      let accSet = new Set(acc);
      let arrSet = new Set(arr);

      let intersection = new Set(
         [...accSet].filter((elem) => arrSet.has(elem))
      );
      return [...intersection];
   };
   const betterSort = (arr) => {
      const numSort = (num1, num2) => num1 - num2;
      let numArr = arr.filter((elem) => typeof elem === "number").sort(numSort);
      let strArr = arr.filter((curKey) => typeof curKey === "string").sort();
      return numArr.concat(strArr);
   };

   let flattenedArgs = args.map((arr) => arr.flat(Infinity));

   const commonElems = flattenedArgs.reduce(getIntersection);

   return betterSort(commonElems);
};

export let findTriangles = (arr) => {
   ic.checkIs2dArray(arr);
   arr.forEach((elem) => {
      ic.checkIsUndefined(elem);
      ic.checkIsArrayOfLength(elem, "Triangle", 3);
      ic.checkIsNumberArray(elem, "Triangle");
      ic.checkIsValidTriangle(elem);
   });

   const checkIsIsosceles = (arr) => {
      ic.checkIsUndefined(arr);
      ic.checkIsArrayOfLength(arr, "Triangle", 3);
      ic.checkIsNumberArray(arr, "Triangle");
      const sidesSet = new Set(arr);
      return sidesSet.size === 2;
   };
   const checkIsScalene = (arr) => {
      ic.checkIsUndefined(arr);
      ic.checkIsArrayOfLength(arr, "Triangle", 3);
      ic.checkIsNumberArray(arr, "Triangle");
      const sidesSet = new Set(arr);
      return sidesSet.size === arr.length;
   };
   const checkIsEquilateral = (arr) => {
      ic.checkIsUndefined(arr);
      ic.checkIsArrayOfLength(arr, "Triangle", 3);
      ic.checkIsNumberArray(arr, "Triangle");
      const sidesSet = new Set(arr);
      return sidesSet.size === 1;
   };
   const findTriangleType = (arr) => {
      ic.checkIsUndefined(arr);
      ic.checkIsArrayOfLength(arr, "Triangle", 3);
      ic.checkIsNumberArray(arr, "Triangle");
      if (checkIsEquilateral(arr)) {
         return "equilateral";
      }
      if (checkIsIsosceles(arr)) {
         return "isosceles";
      }
      if (checkIsScalene(arr)) {
         return "scalene";
      }
      let oops = {
         isEquilateral: checkIsEquilateral(arr),
         isIsosceles: checkIsIsosceles(arr),
         isScalene: checkIsScalene(arr),
      };
      throw `${JSON.stringify(
         oops
      )} You should never see this! The triangle is neither equilateral, isosceles, scalene! Congrats on your breakthrough in mathematics!`;
   };
   const findTriangleArea = (arr) => {
      ic.checkIsUndefined(arr);
      ic.checkIsArrayOfLength(arr, "Triangle", 3);
      ic.checkIsNumberArray(arr, "Triangle");
      const [a, b, c] = arr;
      const s = (a + b + c) / 2;
      const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      const roundedArea = parseFloat(area.toFixed(2));
      return roundedArea;
   };
   const findTrianglePerim = (arr) => {
      ic.checkIsUndefined(arr);
      ic.checkIsArrayOfLength(arr, "Triangle", 3);
      ic.checkIsNumberArray(arr, "Triangle");
      const [a, b, c] = arr;
      return a + b + c;
   };
   const findTriangleData = (arr) => {
      ic.checkIsUndefined(arr);
      ic.checkIsArrayOfLength(arr, "Triangle", 3);
      ic.checkIsNumberArray(arr, "Triangle");
      const area = findTriangleArea(arr);
      const perim = findTrianglePerim(arr);
      const type = findTriangleType(arr);
      return [area, perim, type];
   };

   let output = {};
   for (let i = 0; i < arr.length; i++) {
      const currentTriangle = arr[i];
      output[i] = findTriangleData(currentTriangle);
   }

   return output;
};

export let stringMetrics = (arr) => {
   ic.checkIsUndefined(arr);
   ic.checkIsNonEmptyArray(arr);
   ic.checkIsStringArray(arr);
   ic.checkIsArrayLongerThanTwo(arr);

   arr = arr.map((elem) => elem.trim());

   ic.checkIsNonEmptyArray(arr);
   ic.checkIsStringArray(arr);
   ic.checkIsArrayLongerThanTwo(arr);

   const countVowels = (arr) => {
      let initialVal = 0;
      let result = arr.reduce((acc, val) => {
         const vowelCount = val.match(/[aeiou]/gi).length;
         acc += vowelCount;
         return acc;
      }, initialVal);
      return result;
   };
   const countConsonants = (arr) => {
      let initialVal = 0;
      let result = arr.reduce((acc, val) => {
         const vowelCount = val.match(/[qwrtypsdfghjklzxcvbnm]/gi).length;
         acc += vowelCount;
         return acc;
      }, initialVal);
      return result;
   };
   const calcLengthOfStrings = (arr) => {
      ic.checkIsNonEmptyArray(arr);
      ic.checkIsStringArray(arr);

      const lengthArr = arr.map((str) => str.length);
      return lengthArr;
   };
   const calcMeanStringLength = (arr) => {
      // ic.checkIsNonEmptyArray(arr);
      // ic.checkIsStringArray(arr);

      const numOfStrings = arr.length;
      const lengthArr = calcLengthOfStrings(arr);
      const sumOfLengths = lengthArr.reduce((acc, elem) => acc + elem);
      const meanStrLength = sumOfLengths / numOfStrings;
      return meanStrLength;
   };
   const calcMedianStringLength = (arr) => {
      // ic.checkIsNonEmptyArray(arr);
      // ic.checkIsStringArray(arr);

      const numOfStrings = arr.length;
      const halfWayPoint = Math.round(numOfStrings / 2 - (numOfStrings % 2));
      const lengthArr = calcLengthOfStrings(arr);
      const medianStrLength = lengthArr[halfWayPoint];
      return medianStrLength;
   };
   const calcModeStringLength = (arr) => {
      // checkIsNonEmptyArray(arr);
      // checkIsProperStringArr(arr);

      let occurenceCount = {};
      arr.forEach((elem) => {
         if (elem in occurenceCount) {
            occurenceCount[elem] += 1;
         } else {
            occurenceCount[elem] = 1;
         }
      });

      let occurences = Object.values(occurenceCount);
      let mode = Math.max(...occurences);

      return mode;
   };
   const getLongestStrings = (arr) => {
      let strLengths = {};
      for (let index = 0; index < arr.length; index++) {
         const str = arr[index];
         strLengths[str] = str.length;
      }

      let [keys] = ic.maxKeyValueInObject(strLengths);

      if (keys.length === 1) {
         return keys[0];
      }
      return keys;
   };
   const getShortestStrings = (arr) => {
      let strLengths = {};
      for (let index = 0; index < arr.length; index++) {
         const str = arr[index];
         strLengths[str] = str.length;
      }

      let [keys] = ic.minKeyValueInObject(strLengths);

      if (keys.length === 1) {
         return keys[0];
      }
      return keys;
   };

   let result = {
      vowels: countVowels(arr),
      consonants: countConsonants(arr),
      longest: getLongestStrings(arr),
      shortest: getShortestStrings(arr),
      mean: Math.round(calcMeanStringLength(arr) * 100) / 100,
      median: Math.round(calcMedianStringLength(arr) * 100) / 100,
      mode: Math.round(calcModeStringLength(arr) * 100) / 100,
   };

   return result;
};
