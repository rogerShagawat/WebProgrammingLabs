function arrayEquals(a, b) {
  return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
}

export const assertEquals = (expectedOut, funcCall, input) => {
  let output;
  try { 
    output = funcCall.apply(null, input);
  } catch (e) {
    console.log(e);
  }

  if (Array.isArray(expectedOut)) {
    if (arrayEquals(expectedOut, output)) {
      console.log(`Success! :)`);
    } else {
      console.log(`:( Failed: Expected: ${expectedOut}, Received: ${output}`);
    }
  }
};

export const assertError = (funcCall, input) => {
  try { 
    funcCall.apply(null, input);
  } catch (e) {
    console.log(e);
  }
};