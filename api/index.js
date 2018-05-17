var request = require('axios');

var api = {
  get: function (url) {
    var options = {
      url: url,
      json: true,
      headers: {
        'User-Agent': 'request'
      }
    };
    return new Promise(function (resolve, reject) {
      request.get(options, function (err, res, body) {
        if (err) {
          reject(err);
        } else {
          resolve(body);
        }
      })
    })
  }
};
module.exports = api;
