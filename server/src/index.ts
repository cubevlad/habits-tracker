import http from 'node:http'

const HOST = '127.0.0.1'
const PORT = 3000

const server = http.createServer((_request, response) => {
  response.statusCode = 200
  response.setHeader('Content-Type', 'text/plain')
  response.end('Hello World')
})

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`)
})
