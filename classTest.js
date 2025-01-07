const Model = require('./models/Model.js');
const User = require('./models/User.js')

let u = new User({id:2});
let u2 = new User();
console.log(u);
console.log(u2);
u.save();
u2.save();