var http = require('http');
var fs = require('fs');

var hostname = '127.0.0.1';
var port = 8080;

var srv = http.createServer((req, res) => {
    var url = req.url;
    
    if(req.url == '/'){
        url = '/index.html';
    }
    if(req.url == '/favicon.ico'){
        res.writeHead(404);
        res.end();
        return;
    }

    res.writeHead(200);
    res.end(fs.readFileSync(__dirname + url));
});

srv.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
