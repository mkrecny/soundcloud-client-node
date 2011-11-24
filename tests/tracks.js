var assert = require('assert');
var client = require('../index.js');
var filters = {limit:1, filter:'public,streamable'};
client.getTracks(filters, function(e, data){
  console.log(data);
});
