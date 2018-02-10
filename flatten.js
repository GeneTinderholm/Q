const flatten = el => {
  if(!Array.isArray(el)) return [el];
  let last = el.pop();
  return el.length ? flatten(el).concat(flatten(last)) : flatten(last);
}

module.exports = flatten;
