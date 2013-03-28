# Canonical JSON

`JSON.canonify(value)` produces a canonical form of JavaScript Object Notation
(JSON). The canonical form is very similar to the form defined by ECMAScript
for `JSON.stringify(value)`. The only difference is one additional constraint:
key/value pairs of an object are sorted in lexical order of keys.

`null`, `true`, and `false` are already in canonical form.

The canonical form of a string is bracketted by `"` characters.
It uses 7 of the 8 \x escapes: `\" \\ \b \f \n \r \t`. A reverse solidus is not
escaped, ie `\/` is not used in canonical form. The remaining 27 control
characters from U+0000 to U+001F are escaped as `\u00xx`, using lowercase
hex digits. No other characters are escaped.

Examples of numbers in canonical form are `64000`, `23.7`, `0.001`, `6.22e+23`,
and `-1.60217646e-19`. No exponent is used for numbers ≥ 0.000001 and
< 1,000,000,000,000,000,000,000 (1e21), which includes all 64-bit integers.
Normalized scientific notation is used for positive numbers outside this range.
The exponent is a lowercase `e` and always include a `+` or `-` sign.
The canonical form of zero is `0`. The canonical form of a negative number
is `-` followed by the canonical form of its absolute value.

The canonical form of an array has no whitespace before or after the brackets
or comma separators.

The canonical for of an object has keys in lexical order, based on the code
points of the unescaped characters of the keys. There is no whitespace before
or after the braces, colon separators, or comma separators. Keys are in double
quotes as they are strings in canonical form.

#### Code status

[![Build Status](https://travis-ci.org/manger/canonify.png)](https://travis-ci.org/manger/canonify)
