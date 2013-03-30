;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0](function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
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

},{}]},{},[1])
;