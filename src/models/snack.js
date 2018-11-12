const uuid = require('uuid/v4')
const { manageFile } = require('../../utils/index.js')

const { read, write } = manageFile('../../db/snacks.json')

//CREATE FUNCTION
function create(newSnack) {
  const error = []
  const {
    name
  } = newSnack

  if (!name) {
    error.push('Please provide a name for your snack')
  }
  if (typeof name !== 'string') {
    error.push('Name must be a string')
  }
  if (error.length) return {
    error
  }
  const snack = {
    id: uuid(),
    name
  }
  const snacks = read()
  snacks.push(snack)
  write(snacks)
  return snacks
}

//GET ALL FUNCTION
function getAll() {
  return read()
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
function update(id) {
  const snacks = read()

  const snack = snack.find(ele => ele.id === id)

  if (!snack) {
    return {
      error: ['Snack not found']
    }
  }
  const snack = {
    id: uuid(),
    name
  }
  const snacks = read()
  snacks.push(snack)
  write(snacks)
  return snacks
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