const path = require('path')
const express = require('express')
const xss = require('xss')
const DogsService = require('./dogs-service')

const dogsRouter = express.Router()
const jsonParser = express.json()

const serializeDog = dog => ({
  id: dog.id,
  name: xss(dog.name),
  breed: xss(dog.breed),
  size: xss(dog.size),
  gender: xss(dog.gender),
  age: xss(dog.age),
  regionid: dog.regionid,
  story: xss(dog.story),
  email: xss(dog.email),
})

dogsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    DogsService.getAllDogs(knexInstance)
      .then(dogs => {
        res.json(dogs.map(serializeDog))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { name, breed, size, gender, age, regionid, story, email } = req.body
    const newDog = { name, breed, size, gender, age, regionid, story, email }

    for (const [key, value] of Object.entries(newDog)) 
      if (value == null) 
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        }) 

    DogsService.insertDog(
      req.app.get('db'),
      newDog
    )
      .then(dog => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${dog.id}`))
          .json(serializeDog(dog))
      })
      .catch(next)
  })
 

dogsRouter
  .route('/:dog_id')
  .all((req, res, next) => {
      DogsService.getById(
        req.app.get('db'),
        req.params.dog_id
      )
        .then(dog => {
          if (!dog) {
            return res.status(404).json({
              error: { message: `dog not in database` }
            })
          }
          res.dog = dog
          next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
      res.json(serializeDog(res.dog))
  })
  .patch(jsonParser, (req, res, next) => {
    const { name, breed, size, gender, age, regionid, story, email } = req.body
    const dogToUpdate = { name, breed, size, gender, age, regionid, story, email }

    for (const [key, value] of Object.entries(dogToUpdate)) 
      if (value == null) 
        return res.status(400).json({
          error: { message: `'${key}' field is required` }
    })

    DogsService.updateDog(
      req.app.get('db'),
      req.params.dog_id,
      dogToUpdate
    )
      .then(numRowsAffected => {
        DogsService.getById(
          req.app.get('db'),
          req.params.dog_id
        )
      .then(dog => {
          if (!dog) {
            return res.status(404).json({
              error: { message: `dog not found in database` }
            })
          }
          res.dog = dog
          res.json(dog)
        })
        .catch(next)
    })
  })




module.exports = dogsRouter