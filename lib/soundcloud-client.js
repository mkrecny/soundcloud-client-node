/*
 * Soundcloud Client
 */

var qs = require('querystring')
, http = require('http')
, host = 'api.soundcloud.com'
, agent = http.getAgent(host, 80);

module.exports = {

  //--init vars--[client_id]

  _makeRequest : function(httpOpts, cb){
    var req = http.request(httpOpts, function(res){
      res.setEncoding('utf8');
      var data = '';
      res.on('data', function(d){
        data += d;
      });
      res.on('end', function(){
        try{
          data = JSON.parse(data);
        } catch (e){
          console.log('non-json response');
          return cb(null, data);
        }
        cb(null, data);
      });
    });
    req.end();
  },

  _makeGet : function(path, params, cb){
    var self = this; 
    if (typeof params === 'function'){
      cb = params;
      params = {};
    }
    params.client_id = self.client_id;
    var httpOpts = {
      agent : agent,
      method : 'GET',
      host : host,
      path : '/'+path+'.json'+((params) ? '?'+qs.stringify(params): '')
    };
    this._makeRequest(httpOpts, cb);
  },

  getTracks : function(filters, cb){
    this._makeGet('tracks', filters, cb);
  }

};
