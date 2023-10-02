/* Todo: Implment the functions below and then export them using the ES6 exports
      syntax. DO NOT CHANGE THE FUNCTION NAMES
*/
export { emojiCounter, sortStockPrices, mashUp };

import {
   checkIsProperString,
   checkIsUndefined,
   checkIsProperLength,
   checkIsValidTicker,
} from "./helpers.js";

let emojiCounter = (message) => {
   checkIsUndefined(message, "The Message");
   message = message.trim();

   checkIsProperString(message, "The Message");

   const DELIMITER = ":";
   let emojiCount = 0;
   let curIndex = message.indexOf(DELIMITER);
   let nextIndex;
   let iterationCount = 0;

   while (
      curIndex < message.length &&
      curIndex !== -1 &&
      nextIndex !== -1 &&
      iterationCount < 10000
   ) {
      let emojiDetected = 0;
      nextIndex = message.indexOf(DELIMITER, curIndex + 1);
      if (nextIndex > curIndex) {
         let substr = message.substring(curIndex + 1, nextIndex);

         if (substr.length > 0 && substr.indexOf(" ") === -1) {
            emojiCount++;
            emojiDetected = 1;
         }
      }

      curIndex = message.indexOf(DELIMITER, nextIndex + emojiDetected);
      iterationCount++;
   }

   return emojiCount;
};

let sortStockPrices = (lastStocks, currStocks) => {
   checkIsUndefined(lastStocks);
   checkIsUndefined(currStocks);

   checkIsProperString(lastStocks);
   checkIsProperString(currStocks);

   lastStocks = lastStocks.trim();
   currStocks = currStocks.trim();

   const objectifyStocks = (stocks) => {
      checkIsUndefined(stocks);
      checkIsProperString(stocks);

      let result = {};
      stocks = stocks.split("|");
      stocks.forEach((element) => {
         let [key, val] = element.split(",");
         key = key.trim();
         val = val.trim();

         checkIsValidTicker(key, "Stock Ticker", 5);

         val = Number(val);
         checkIsProperNumber(val, "Stock Price");
         key = key.toUpperCase();
         if (key in result) {
            throw `Duplicate Stock Ticker`;
         }
         result[key] = val;
      });

      return result;
   };

   lastStocks = objectifyStocks(lastStocks);
   currStocks = objectifyStocks(currStocks);

   // TODO check that keys are identical
   const lastStocksKeys = Object.keys(lastStocks);
   const currStocksKeys = Object.keys(currStocks);
   if (lastStocksKeys.length !== currStocksKeys.length) {
      throw `Last Stocks stock tickers not identical to Current Stocks stock tickers`;
   }
   for (let i = 0; i < lastStocksKeys.length; i++) {
      if (!currStocksKeys.includes(lastStocksKeys[i])) {
         throw `Last Stocks stock tickers not identical to Current Stocks stock tickers`;
      }
   }

   let result = [];

   for (let key of Object.keys(lastStocks)) {
      let priceChange;
      let increase = currStocks[key] - lastStocks[key];
      priceChange = (increase / lastStocks[key]) * 100;
      // priceChange = Math.round(priceChange * 10) / 10;
      let stockData = {
         symbol: key,
         price: currStocks[key],
         change: priceChange,
      };
      result.push(stockData);
   }

   return result;
};

let mashUp = (string1, string2) => {
   const MASHUP_LENGTH = 4;

   checkIsUndefined(string1, "The first parameter");
   checkIsUndefined(string2, "The second parameter");

   string1 = string1.trim();
   string2 = string2.trim();

   checkIsProperString(string1, "The first parameter");
   checkIsProperString(string2, "The second parameter");

   checkIsProperLength(string1, "The first parameter", MASHUP_LENGTH);
   checkIsProperLength(string2, "The second parameter", MASHUP_LENGTH);

   const head1 = string1.substring(0, MASHUP_LENGTH);
   const head2 = string2.substring(0, MASHUP_LENGTH);

   const tail1 = string1.substring(MASHUP_LENGTH, string1.length);
   const tail2 = string2.substring(MASHUP_LENGTH, string2.length);

   const mashup1 = `${head2}${tail1}`;
   const mashup2 = `${head1}${tail2}`;

   return `${mashup1} ${mashup2}`;
};
