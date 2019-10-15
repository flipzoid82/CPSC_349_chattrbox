var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var wss = require('./websockets-server');
const mime = require('mime');

var handleError = function(err, res) {
  res.writeHead(404, {
    'Content-Type': 'text/html'
  });
  //Redirects 404 errors to /app/error.html - Bronze Challenge
  //res.write('<meta http-equiv="Refresh" content="0; url=/error.html" />');
  res.end('<meta http-equiv="Refresh" content="0; url=/error.html" />');
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

  //Get MIME type and output it to console - Silver Challenge
  var getMime = mime.getType(filePath)
  console.log('MIME Type is: ' + getMime);
});
server.listen(3000);
