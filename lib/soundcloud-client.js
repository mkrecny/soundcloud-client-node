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
  },

  getTimestamp : function(ms){
    var d = new Date(ms);
    var year = d.getFullYear();
    var month = (d.getMonth()+1);
    var date = d.getDate();
    var hours = d.getHours();
    var mins = d.getMinutes();
    var secs = d.getSeconds();
    return year+
    '/'+(month.length===1 ? '0'+month : month)+'/'+
    (date.length===1 ? '0'+date : date)+' '+
    (hours.length===1 ? '0'+hours : hours)+
    ':'+(mins.length===1 ? '0'+mins : mins)+':'+
    (secs.length===1 ? '0'+secs : secs);
  }

};
