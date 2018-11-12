const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
app.use(morgan('dev'))

const snackRoutes = require('../src/routes/snacks.js')
app.use('/snacks.js', snackRoutes)

app.use(function(req, res, next) {
  next( { status: 404, message: { error: 'Not Found'}} )
})

//ERROR HANDLER
app.use(function(err, req, res, next){
  const error = {}

  error.message = err.message || "Internal Server Error"
  error.status = err.status || 500
  error.stack = err.stack

  res.status(error.status).send(error)
})

app.listen(port, function(){
  console.log(`Howdy from port ${port}`)
})

module.exports = app