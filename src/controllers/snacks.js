const snackModel = require('../models/snack.js')


//CREATE
function create(req, res, next){
  const newSnack = snackModel.create(req.body)

  if(newSnack.error) return next( { status: 400, message: newSnack })
  
  res.status(201).send({ data: newSnack })
}

//GET ALL 
function getAll(req, res, next) {
  const id = req.params.id
  const data = snackModel.getAll(id)
  let result = []
  
  if (result.errors) {
    return next({
      status: 400,
      message: `Could not find snacks`,
      errors: result.errors
    })
  }
  res.status(200).json({
    data
  })
}

//GET ONE
function getOne(req, res, next) {
  const snack = snackModel.getOne(req.params.id)

  if(!snack) return next({status: 404, message: snack })

  res.status(200).send(snack)
}

//UPDATE
function update(req, res, next) {
  // make sure your tabbing is consistent
  const id = req.params.id
  // remove any unused varibles  
  const name = req.body.name
  const result = snackModel.update(id, req.body)

  if(result.errors) {
    return next({
      status: 404,
      message: `Could not update book`,
      errors: result.errors
    })
  }
  res.status(200).json({
    data: result
  })
}

//DELETE

function remove(req, res, next) {
  const snack = snackModel.remove(req.params.id)

  if (!snack) return next({
    status: 404,
    message: snack
  })
  res.status(200).send(snack)
}

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove
}