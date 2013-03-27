JSON.canonify = function(v) {
  var s, names, n, i;
  if (Array.isArray(v)) {
    s = '[';
    for (i = 0; i < v.length; i++) {
      if (i !== 0) {
        s += ',';
      }
      s += typeof v[i] !== 'undefined' ? JSON.canonify(v[i]): 'null';
      // an undefined array element is treated as null
    }
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
