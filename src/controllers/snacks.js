const snackModel = require('../models/snack.js')


//CREATE
function create(req, res, next) {
  const newSnack = snackModel.create(req.body)

  if (newSnack.error) return next({
    status: 400,
    message: newSnack
  })

  res.status(201).send({
    data: newSnack
  })
}

//GET ALL 

function getAll(req, res, next) {
  const snacks = snackModel.getAll()

  res.send({
    data: snacks
  })
}

//GET ONE
function getOne(req, res, next) {
  const snack = notesModel.getOne(req.params.id)

  if(!snack) return next({status: 404, message: snack })

  res.status(200).send(snack)
}

//UPDATE
function update(req, res, next) {
  const id = req.params.id
  const result = snackModel.update(id, req.body)

  if (result.error) {
    return next({
      status: 404,
      message: `Could not update snack with id of ${id} `
    })

  }
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