import * as lab1 from "./lab1.mjs"; 


// make 5 calls to questionOne passing in different inputs
console.log(lab1.questionOne(["Hello", "good", "weather", "today"])) // returns and then outputs: [9, false]
console.log(lab1.questionOne(["I", "love", "CS 546.", "Best class ever."])); // returns [7, false] 
console.log(lab1.questionOne(["Ths s nrdbl", "grd"])); // returns [0, true] 
console.log(lab1.questionOne([])); // returns [0, true] 
console.log(lab1.questionOne(["Glib itiy Glopit   y", "a    aa   aa"])); // returns [10, true] 

// make 5 calls to questionTwo passing in different inputs
console.log(lab1.questionTwo({ a: 3, b: 2, c: 1, d: 7 }, { a: 6, b: 5, c: 4, e: 8 })); // Returns and then outputs: ["d","e"]
console.log(lab1.questionTwo({ a: 3, b: 2, f: 1, g: 46 }, { d: 3, e: 4, c: 5, g: 2 })); // returns ["a","b","c","d","e","f"]
console.log(lab1.questionTwo( {'1': true, a: 5, '2': 'hi'}, {'3': true, b: 5, '44': "hi", '4': "bye", '5': 8})); // returns ['1', '2', '3', '4', '5', '44', 'a', 'b'] 
console.log(lab1.questionTwo({ super:5, '34': 'hows', it: 'going', 'man': 'well'}, { cool:'thanks', '34': 'alright', '17': "swell"})); // Returns and then outputs: ['17', 'cool', 'it', 'man', 'super']
console.log(lab1.questionTwo({ }, { })); // Returns and then outputs: []

// make 5 calls to questionThree
console.log(lab1.questionThree([[3,3,3], [3,3,4], [5,4,2]])); // returns and then outputs: {'0': [3.9,9], '1': [4.47,10], '2': [3.8,11]} 
console.log(lab1.questionThree([[7,5,5], [2,4,3], [8,5,6], [12,12,11]]))   // returns {'0': [12.5, 17], '1': [2.9,9], '2': [14.98,19], '3': [58.66,35]} 
console.log(lab1.questionThree([[3,4,5]])); // returns and then outputs: {'0': [6,12]} 
console.log(lab1.questionThree([[500,600,200], [0,0,0]])); // returns and then outputs: {'0': [3.9,9], '1': [0,0]} 
console.log(lab1.questionTwo([], [])); // Returns and then outputs: []

// make 5 calls to questionFour
console.log(lab1.questionFour('patrick,hill,trees,home'));  // Returns and then outputs: ['rickpat', 'llhi', 'eestr', 'meho'] 
console.log(lab1.questionFour('joseph,ball,square,pencil'));  //should return and then log ['ephjos', 'llba', 'aresqu', 'cilpen'] 
console.log(lab1.questionFour('      supercalifragilisticexpialidocious  ')); // Return ['ticexpialidocioussupercalifragilis']
console.log(lab1.questionFour(' I, AM, RLY, COOL' )); // Return ['I', 'MA', 'LYR', 'OLCO']
console.log(lab1.questionFour('   back   , to ,normal, like, a , window,pane')); // Return ['ckba', 'ot', 'malnor', 'keli', 'a', 'dowwin', 'nepa']