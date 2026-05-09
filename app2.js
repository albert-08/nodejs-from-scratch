const http = require('http')
const { parse } = require('path')
const url = require('url')

const server = http.createServer((request, response) => {
  try {
    const parsedURL = url.parse(request.url, true)

    const { name } = parsedURL.query

    if (request.url === '/' && request.method === "GET") {
      response.statusCode = 200
      response.end(JSON.stringify({"message": message}))
    } else if (request.url === '/home' && request.method === "GET") {
      response.statusCode = 300
      response.end(JSON.stringify({"message": "Accediendo al home"}))
    } else if (parsedURL.pathname === "/profile" && name) {
      response.statusCode = 200
      response.end(JSON.stringify({"message": "Accediendo a ruta con parémetro:"+name}))
    } else if (request.url === "/register" && request.method === "POST") {
      let body = ''

      request.on('data', chunk => {
        body += chunk
      })

      request.on('end', () => {
        const parsedData = JSON.parse(body)
        const { username, email } = parsedData

        console.log(username, email)

        response.statusCode = 201
        response.end(JSON.stringify({"message": "Usuario registrado con éxito", "data": parsedData}))
      })
    } else {
      response.statusCode = 404
      response.end(JSON.stringify({"message": "Ruta no encontrada"}))
    }  
  } catch (error) {
    response.statusCode = 500
    response.end(JSON.stringify({"message": "Error interno del servidor"}))
  }
})

const port = 5000
const host = "localhost"

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`)
})