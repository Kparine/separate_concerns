const uuid = require('uuid/v4')
const { manageFile } = require('../../utils/index.js')
const { read, write } = manageFile('../db/snacks.json')


//CREATE FUNCTION
function create(body){
  const error = []
  const name = body.name

  if(!name){
    error.push('Please Provide Name')
  }
  if(typeof name !== "string"){
    error.push('Completed should be a string')
  }

  if(error.length) return { error }

  const snack = {
    id: uuid(),
    name
  }

  const snacks = read()
  
  snacks.push(snack)
  
  write(snacks)

  return snack
}

//GET ALL FUNCTION
function getAll(id) {
  const snacks = read()
  return id ? snacks.slice(0, id) : snacks
}

//GET ONE FUNCTION
function getOne(id) {
  const snacks = read()

  const snack = snacks.find(ele => ele.id === id)

  if (!snack) {
    return {
      error: ['Snack not found']
    }
  }
  return snack
}

//UPDATE FUNCTION
function update(id, body) {
  const snacks = read()
  const name = body.name
  const oneSnack = snacks.find(ele => ele.id === id)

  if (!oneSnack) {
    return {
      error: ['Snack not found. Could not update']
    }
  }
  const snack = {
    id: uuid(),
    name
  }
  snacks.splice(1, 0, snack)
  write(snacks)
  return snack
}

//DELETE FUNCTION
function remove(id) {
  const snacks = read()
  const idx = snacks.findIndex(ele => ele.id === id)

  if (idx === -1) return {
    error: ['Snack not found, could not delete']
  }

  const savedSnack = snacks[idx]
  snacks.splice(idx, 1)

  write(snacks)

  return savedSnack

}

module.exports = {
  create,
  getOne,
  getAll,
  remove,
  update
}