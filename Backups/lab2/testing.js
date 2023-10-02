function arrayEquals(a, b) {
  return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
}

function isObjEqual(object1, object2) {
  return object1.name === object2.name;
}

export const assertEquals = (funcCall, input, expectedOut) => {
  if (!Array.isArray(input)) {
    input = [input];
  }

  let output;
  try { 
    output = funcCall.apply(null, input);
  } catch (e) {
    console.log(e);
  }

  if (!(typeof expectedOut === 'object' || typeof expectedOut === 'function')){
    if (expectedOut === output) {
      console.log(`Success! :)`);
    } else {
      console.log(`:( Failed: Expected: ${expectedOut}, Received: ${output}`);
      return false;
    }
  }

  else if (Array.isArray(expectedOut)) {
    if (arrayEquals(expectedOut, output)) {
      console.log(`Success! :)`);
      return true;
    } else {
      console.log(`:( Failed: Expected: ${expectedOut}, Received: ${output}`);
      return false;
    }
  }

   else if (typeof expectedOut === 'object') {
    if (isObjEqual(expectedOut, output)) {
      console.log(`Success! :)`);
      return true;
    } else {
      console.log(`:( Failed: Expected: ${expectedOut}, Received: ${output}`);
      return false;
    }
  }
};

export const assertError = (funcCall, input) => {
  if (!Array.isArray(input)) {
    input = [input];
  }
  try { 
    funcCall.apply(null, input);
  } catch (e) {
    console.log(`Success! :) ${e}`);
  }
};