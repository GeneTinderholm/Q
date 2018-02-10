// const detectColon = arg => {
//
// }
const flatten = el => {
  if(!Array.isArray(el)) return [el];
  let last = el.pop();
  return el.length ? flatten(el).concat(flatten(last)) : flatten(last);
}
const loopObj = {
  up: (one, two) => {
    let result = [];
    for (let i = one; i <= two; i++) {
      result[result.length] = i;
    }
    return result;
  },
  down: (one, two) => {
    let result = [];
    for (let i = one; i >= two; i--) {
      result[result.length] = i;
    }
    return result;
  },
};

const argObject = {
  number: (key, val) => {
    let parse = Number(key);
    return parse < val
      ? loopObj.up(parse, val)
      : parse > val ? loopObj.down(parse, val) : [val];
  },
  string: (key, char) => {
    let parse = key.toString();
    let one = key.charCodeAt(0);
    let two = char.charCodeAt(0);
    let result =
      one < two
        ? loopObj.up(one, two)
        : one > two ? loopObj.down(one, two) : [two];
    return result.map(num => String.fromCodePoint(num));
  },
};
const processObject = {
  number: n => [n],
  string: s => [s],
  object: obj =>
    obj.length
      ? obj
      : Object.keys(obj).map(key => argObject[typeof obj[key]](key, obj[key])),
};

class Matrix {
  constructor(array, nrow = 1, ncol = 1, byrow = false) {
    this.data = {
      rows: [],
      cols: [],
    };
    this.source = array;
    console.log(nrow, ncol, array.length)
    this.nrow = ncol > 1 ? Math.ceil(array.length / ncol) : nrow > 1 ? nrow : 1;
    this.ncol = nrow > 1 ? Math.ceil(array.length / nrow) : nrow === 1 ? array.length : ncol > 1 ? ncol : 1;
    console.log('numbers', this.ncol, this.nrow);
    loopObj.up(1, this.ncol).forEach(el => (this.data.cols[el - 1] = []));
    loopObj.up(1, this.nrow).forEach(el => (this.data.rows[el - 1] = []));
    byrow ? this.fill(array, 'right') : this.fill(array);
  }
  fill(array, direction = 'down') {
    const order = direction === 'right' ? ['cols', 'rows'] : ['rows', 'cols'];
    let count = [0, 0];
    // console.log(this.source);
    let j = 0;
    for (let i = 0; i < this.ncol * this.nrow; i++) {
      // console.log("data: ", this.data);
      // console.log([order[0],count[0]], [order[1],count[1]]);
      this.data[order[0]][count[0]][
        this.data[order[0]][count[0]].length
      ] = array[j];
      this.data[order[1]][count[1]][
        this.data[order[1]][count[1]].length
      ] = array[j];
      count[0]++;
      if (count[0] >= this.data[order[0]].length) {
        count[0] -= this.data[order[0]].length;
        count[1]++;
      }
      j = j === array.length - 1 ? 0 : j + 1;
      console.log('nrow', this.nrow, 'ncol', this.ncol, order, count)
    }
  }
  toString() {
    let result = '\n';
    this.data.rows.forEach(row => {
      result += row.toString() + '\n';
    })
    return result;
  }
}

const Q = {
  matrix: (...args) => new Matrix(...args),

  //takes numbers, strings, objects with key/value pairs or arrays
  c: (...args) => {
    let results = [...args].map(arg => processObject[typeof arg](arg));
    // console.log(results);
    // let final = [];
    //
    // results.(el => { console.log(el);
    //   final.concat(el)});
    return flatten(results);
  },
};

module.exports = Q;

// console.log(Q.c({1: 80}));
console.log(Q.matrix(Q.c({1: 80}), null, 7, true).toString());
// console.log(Q.c({a: 'z'}));
