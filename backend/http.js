const http = require('http');
const httpPort = 4000;

const server = http.createServer((req, res) => {
    res.write("Hello from Node http server");
    res.end();
});

server.listen(httpPort, () => {
    console.log(`HTTP server started at http://localhost:${httpPort}`);
});
