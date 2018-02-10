const autoLoop = require('./autoLoop');

class Matrix extends Object {
  constructor(array, nrow = 1, ncol = 1, byrow = false) {
    super();
    this.data = {};
    this.source = array;
    this.longest = 0;
    this.nrow = ncol > 1 ? Math.ceil(array.length / ncol) : nrow > 1 ? nrow : 1;
    this.ncol =
      nrow > 1
        ? Math.ceil(array.length / nrow)
        : nrow === 1 ? array.length : ncol > 1 ? ncol : 1;
    let colObj = {};
    this.bracket = this.bracket.bind(this);
    autoLoop(1, this.ncol).forEach(el => (colObj[el] = null));
    autoLoop(1, this.nrow).forEach(
      el => (this.data[el] = Object.assign({}, colObj)),
    );
    byrow ? this.fill(array, 'right') : this.fill(array);
  }

  fill(array, direction = 'down') {
    const order = direction === 'right' ? 0 : 1;
    let count = [1, 1];
    let j = 0;
    for (let i = 0; i < this.ncol * this.nrow; i++) {
      if (array[j].toString().length > this.longest)
        this.longest = array[j].toString().length;

      this.data[count[0]][count[1]] = array[j];
      order ? count[0]++ : count[1]++;

      if (count[0] > this.nrow) {
        count[0] -= this.nrow;
        count[1]++;
      }

      if (count[1] > this.ncol) {
        count[1] -= this.ncol;
        count[0]++;
      }

      j = j === array.length - 1 ? 0 : j + 1;
    }
  }

  getIndex(index){
    let rowIndex = Math.ceil(index/this.ncol);
    let colIndex = index%this.ncol || this.ncol;
    return this.data[rowIndex][colIndex];
  }

  getRowsAndColumns(rows, cols) {
    
  }

  bracket(index, col = 'none') {
    return col === 'none'
      ? this.getIndex(index)
      : this.getRowsAndColumns(index, col);
  }


  toString() {
    let result = '\n';
    let length = Math.max(
      this.longest,
      this.ncol.toString().length,
      this.nrow.toString().length,
      4,
    );
    result += ' '.repeat(this.nrow.toString().length + 3);
    autoLoop(1, this.ncol).forEach(
      colNum =>
        (result += ` ${' '.repeat(length - colNum.toString().length - 3)}(,${
          colNum
        })`),
    );
    result += '\n';
    for (let i = 1; i <= this.nrow; i++) {
      result += `${' '.repeat(
        this.nrow.toString().length - i.toString().length,
      )}(${i},)`;
      for (let j = 1; j <= this.ncol; j++) {
        result += ` ${' '.repeat(length - this.data[i][j].toString().length)}${
          this.data[i][j]
        }`;
      }
      result += '\n';
    }
    return result;
  }

}

module.exports = Matrix;
