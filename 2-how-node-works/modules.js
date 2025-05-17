// console.log(arguments);
// console.log(require("module").wrapper);

// module.exports
const C = require("./teste-module-1.js");
const calc1 = new C();
console.log(calc1.add(2, 5));

// exports
// const calc2 = require("./teste-module-2.js");
const { add, multiply } = require("./teste-module-2.js");
console.log(multiply(2, 5));

// caching
require("./teste-module-3.js")();
require("./teste-module-3.js")();
require("./teste-module-3.js")();
