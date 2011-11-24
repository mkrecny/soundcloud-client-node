var config = require('./config.js');
module.exports = Object.create(require('./lib/soundcloud-client.js'), {
  client_id : {
    value : config.client_id,
    enumerable : true
  }
});
