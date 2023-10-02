export const questionOne = (arr) => {
  /* 
  Approach:
  use a filter to remove vowels from each string,
  map the filter to the array,
  concatenate arrays, get length for  vowel count
  */

  let isVowel = char => {
    const vowels = 'AEIOU';
    char = char.toUpperCase();
    return vowels.includes(char);
  };

  let removeConsonants = str => {
    const splitStr = str.split('');
    return splitStr.filter(isVowel);
  };

  let vowelArr = arr.map(removeConsonants);
  let flatVowelArr = vowelArr.flat(1);
  let vowelCount = flatVowelArr.length;

  return [vowelCount, vowelCount % 2 == 0];
}

export const questionTwo = (obj1, obj2) => { 
  /*
  Approach:
  remove any elements from keys1 that are in keys2
  then remove any elements from keys2 that were in original keys1
  concatenate key arrays, then for sorting, make an array of keys 
  which are only the numbers, and one of only the strings, sort the numbers,
  sort the stirngs, concatenate numbers onto strings
  */

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const exclusiveKeys1 = keys1.filter((currentKey) => !keys2.includes(currentKey));
  const exclusiveKeys2 = keys2.filter((currentKey) => !keys1.includes(currentKey));

  let exclusiveKeys = exclusiveKeys1.concat(exclusiveKeys2);

  let strToNum = (str) => {
    const numberfiedStr = Number(str);
    if (isNaN(numberfiedStr)) {
      return str;
    } else {
      return numberfiedStr;
    }
  }

  let typedKeys = exclusiveKeys.map(strToNum);
  let numSort = (num1, num2) => { return num1 - num2; }
  let numKeys = typedKeys.filter(curKey => typeof curKey === 'number').sort(numSort);
  let strKeys = typedKeys.filter(curKey => typeof curKey === 'string').sort();
  numKeys = numKeys.map(String);
  let outputArr = numKeys.concat(strKeys);

  return outputArr;
} 

export const questionThree = (arr) => { 
  /*
  Approach:
  Use Heron's formula (s = (a + b + c) / 2, Area = sqrt(s(s - a)(s - b)(s - c))) to
  calculate the area, calculate perimiter by summing sides,
  round by using toFixed and then convert back to float
  */

  let calcArea = ([a,b,c]) => {
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    const roundedArea = parseFloat(area.toFixed(2));
    return roundedArea;
  }

  let calcPerimeter = ([a,b,c]) => a + b + c;

  let output = {}

  for (let i = 0; i < arr.length; i++) {
    const currentTriangle = arr[i];
    output[i] = [calcArea(currentTriangle), calcPerimeter(currentTriangle)];
  }

  return output
} 

export const questionFour = (string) => { 
  /*
  Approach:
  split string on commas, for each sub string map a function that cuts the string in half 
  and concats the second half with the first half
  */

  const trimString = string.trim();
  let splitString = trimString.split(',')
  splitString = splitString.map((str) => str.trim());

  let halfReverse = (string) => {
    const halfwaryPoint = Math.round(string.length / 2 - string.length % 2);
    const firstHalf = string.slice(0, halfwaryPoint);
    const secondHalf = string.slice(halfwaryPoint);
    return secondHalf.concat(firstHalf);
  }

  const cypherString = splitString.map(halfReverse);

  return cypherString;
} 

export const studentInfo= { 
  firstName: "Roger", 
  lastName: "Shagawat", 
  studentId: "10441828", 

}; 