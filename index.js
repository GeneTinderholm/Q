const flatten = require('./flatten');
const autoLoop = require('./autoLoop');
const c = require('./c');
const Matrix = require('./Matrix');

const Q = {
  matrix: (...args) => new Matrix(...args),
  Matrix: Matrix,
  c: c,
};

module.exports = Q;

// console.log(Q.c({1: 80}));
let matt = new Matrix(c({1: 80}), null, 7);
console.log(matt.toString());
console.log(matt.bracket(15))
console.log(matt.bracket(14))

