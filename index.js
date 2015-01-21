var thru = require('through2'),
    mail = require('mailgun-send');

exports.config = function (opts) { mail.config(opts) }
exports.send = function (obj) {
  console.log('inside',obj)
  var stream = thru.obj(transform, flush); 
  if (obj) stream.write(obj);
  return stream;
}

function transform (obj, encoding, callback) {
  if (typeof obj != 'object') return callback("Expecting object, but got " + typeof obj);
  mail.send(obj, callback);
  this.push(obj);
}

function flush (callback) {
  callback();
}
