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

const autoLoop = (one, two) => one < two ? loopObj.up(one, two) : one > two ? loopObj.down(one,two) : [two];

module.exports = autoLoop;
