JSON.canonify = function(v) {
  var s, names, n;
  if (Array.isArray(v)) {
    s = '[';
    v.forEach(function(val, i) {
      if (i !== 0) {
        s += ',';
      }
      s += JSON.canonify(val);
    });
    s += ']';
  }
  else if (v !== null && typeof v === 'object') {
    names = [];
    for (n in v) {
      if (v.hasOwnProperty(n) && typeof v[n] !== 'function') {
        names.push(n);
      }
    }
    names.sort();
    s = '{';
    names.forEach(function(val, i) {
      if (i !== 0) {
        s += ',';
      }
      s += JSON.stringify(val) + ':' + JSON.canonify(v[val]);
    });
    s += '}';
  }
  else {
    s = JSON.stringify(v);
  }
  return s;
}

module.exports = JSON.canonify;
