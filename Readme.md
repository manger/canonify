# Canonical JSON

`JSON.canonify(value)` produces a canonical form of JavaScript Object Notation
(JSON). The canonical form is very similar to the form defined by ECMAScript
for JSON.stringify, merely adding one additional constraint that the key/value
pairs of an object are sorted in lexical order of keys.

#### Code status

[![Build Status](https://travis-ci.org/manger/canonify.png)](https://travis-ci.org/manger/canonify)
