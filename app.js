const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const userRouter = require('./routers/userRouter')
const userLogged = require('./middlewares/userLogged')
const connection = require('./database/connection')

app.get('/', (req, res) => {
  const data = {
    "title": "Título de mi página",
    "message": "Bienvenido a mi sitio web",
    "showMessage": true,
    "items": [1, 2, 3, 4, 5]
  }
  res.render('index', data)
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(morgan('dev'))
// app.use(userLogged)
app.use('/users', userRouter)

app.listen(3000, () => {
  console.log('Aplicación con express ejecutandose en el puerto 3000')
})