const http = require("http")


const host = 'localhost'
const port = 8080

console.log("Hello, World!")
const server = http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type': 'text/html'})
	res.end("Hello, World!")
})

server.listen({
	host: host,
	port: port
})