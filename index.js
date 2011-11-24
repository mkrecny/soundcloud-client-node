
module.exports = function(client_id){

  return Object.create(require('./lib/soundcloud-client.js'), {
    client_id : {
      value : client_id,
      enumerable : true
    }
  });

}
