var http = require("http");
var fs = require("fs");
var server = http.createServer(handleRequest);
var port = process.env.PORT || 8080;
var ip = process.env.IP || 127.0.0.1;
server.listen(port, ip);


var handleRequest = function(request, response) {
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/html";
  response.writeHead(statusCode, headers);
  response.end("Hello, World!");
};
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};