const flatten = require('./flatten');
const autoLoop = require('./autoLoop');

const argObject = {
  number: (key, val) => {
    let parse = Number(key);
    return autoLoop(parse, val);
  },
  string: (key, char) => {
    let parse = key.toString();
    let one = parse.charCodeAt(0);
    let two = char.charCodeAt(0);
    let result = autoLoop(one, two);
    return result.map(num => String.fromCodePoint(num));
  },
};

const processObject = {
  boolean: b => b,
  number: n => n,
  string: s => s,
  object: obj =>
    obj.length
      ? obj
      : Object.keys(obj).map(key => argObject[typeof obj[key]](key, obj[key])),
};

//takes numbers, strings, objects with key/value pairs or arrays returns an array
const c =  (...args) => 
     flatten([...args].map(arg => processObject[typeof arg] ? processObject[typeof arg](arg) : null ));

module.exports = c;
