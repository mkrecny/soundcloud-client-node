var client = require('../index.js')('8ff944986fd051ff994fa25186dd731a');
var now = new Date().getTime();
var d = client.getTimestamp(now);
console.log(d);
