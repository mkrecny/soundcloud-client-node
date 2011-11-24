var assert = require('assert');
var client = require('../index.js')('8ff944986fd051ff994fa25186dd731a');
var filters = {limit:1, filter:'public,streamable'};
client.getTracks(filters, function(e, data){
  console.log(data);
});
