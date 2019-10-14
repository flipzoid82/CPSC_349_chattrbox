var http = require('http');
var fs = require('fs');
var extract = require('./extract');
const mime = require('mime');

var handleError = function(err, res) {
  res.writeHead(404, {
    'Content-Type': 'text/html'
  });
  res.write('<meta http-equiv="Refresh" content="0; url=/error.html" />');
  res.end();
};

var server = http.createServer(function(req, res) {
  console.log('Responding to a request.');
  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      res.end(data);
    }
  });

  var getMime = mime.getType(req.url)
  fs.readFile(getMime, function(err, data) {
    console.log('MIME Type is: ' + data);
  });
});
server.listen(3000);
