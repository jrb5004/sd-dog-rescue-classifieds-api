const path = require('path')
const express = require('express')
const xss = require('xss')
const RegionsService = require('./regions-service')

const regionsRouter = express.Router()

const serializeRegion = region => ({
  id: region.id,
  name: xss(region.name),
  description: xss(region.description),
})

regionsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    RegionsService.getAllRegions(knexInstance)
      .then(regions => {
        res.json(regions.map(serializeRegion))
      })
      .catch(next)
  })

  
  regionsRouter
    .route('/:region_id')
    .all((req, res, next) => {
      RegionsService.getById(
        req.app.get('db'),
        req.params.region_id
      )
        .then(region => {
          if (!region) {
            return res.status(404).json({
              error: { message: `not a valid region` }
            })
          }
          res.region = region
          next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
      res.json(res.region)
    })
    

module.exports = regionsRouter