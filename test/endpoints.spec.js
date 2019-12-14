const knex = require('knex')
const app = require('../src/app')
const { makeRegionsArray, makeDogsArray, makeExpectedListingArray } = require('./sample-data')

describe('Regions Endpoints', function() {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean the regions table', () => db.raw('DROP TABLE if exists dogs'))

  before('clean the regions table', () => db.raw('DROP TABLE if exists regions'))

  before('clean the regions table', () => db.raw(`CREATE TABLE regions (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name TEXT NOT NULL, 
    description TEXT NOT NULL
  )`))

  before('clean the regions table', () => db.raw(`CREATE TABLE dogs (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name TEXT NOT NULL, 
    breed TEXT NOT NULL,
    size TEXT NOT NULL,
    gender TEXT NOT NULL,
    age TEXT NOT NULL,
    regionid INTEGER
        REFERENCES regions(id) ON DELETE CASCADE,
    story TEXT NOT NULL,
    email TEXT NOT NULL
    )`))


  describe(`GET /api/regions`, () => {
    context('Given there are regions in the database', () => {
      const testRegions = makeRegionsArray()

      beforeEach('insert cateogories', () => {
        return db
          .into('regions')
          .insert(testRegions)
      })

      it('responds with 200 and all of the reions', () => {
        return supertest(app)
          .get('/api/regions')
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(200, testRegions)
      })
    })
  })
})




describe('Dogs Endpoints', function() {
    let db
  
    before('make knex instance', () => {
      db = knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL,
      })
      app.set('db', db)
    })
  
    after('disconnect from db', () => db.destroy())
  
    before('clean the dogs table', () => db('dogs').truncate())
  
    afterEach('cleanup',() => db('dogs').truncate())
  
    describe(`GET /api/dogs`, () => {
      context('Given there are dogs in the database', () => {
        const testDogs = makeDogsArray()
        const expectedListings =makeExpectedListingArray()
  
        beforeEach('insert dogs', () => {
          return db
            .into('dogs')
            .insert(testDogs)
        })
  
        it('responds with 200 and all of the dogs', () => {
          return supertest(app)
            .get('/api/dogs')
            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
            .expect(200, expectedListings)
        })
      })
    })

    describe(`POST /api/dogs`, () => {
      context('Given there are regions in the Regions table', () => {
        let body = {
            id: 7,
            name: 'First Two',
            breed: 'breed two',
            size: 'size two',
            gender: 'gender two',
            age: 'age two',
            regionid: 3,
            story: 'story two',
            email: 'email two'
        }
     
        it('respond with 201 created', () => {
          return supertest(app)
            .post('/api/dogs')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
            .expect(201)
        })
      })
    })
    
    describe(`GET /api/dogs/:dog_id`, () => {
        context('Given there are dogs in the database', () => {
        const testDogs = makeDogsArray()
        const expectedListings =makeExpectedListingArray()
          beforeEach('insert dogs', () => {
            return db
              .into('dogs')
              .insert(testDogs)
          })
    
          it('responds with 200 and appropriate listing', () => {
            const dogId = 2
            const expectedListing = expectedListings[dogId - 1]
            return supertest(app)
              .get(`/api/dogs/${dogId}`)
              .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
              .expect(200, expectedListing)
          })
        })
      })

      describe(`PATCH /api/dogs/:dog_id`, () => {
        context('Given there are dogs in the database', () => {
        const testDogs = makeDogsArray()
          beforeEach('insert dogs', () => {
            return db
              .into('dogs')
              .insert(testDogs)
          })
          let body = {
            name: 'Edited name',
            breed: 'Edited breed',
            size: 'Edited size',
            gender: 'Edited gender',
            age: 'Edited age',
            regionid: 3,
            story: 'Edited story',
            email: 'Edited email'
        }
    
          it('responds with 200', () => {
            const dogId = 2
            return supertest(app)
              .patch(`/api/dogs/${dogId}`)
              .send(body)
              .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
              .expect(200)
          })
        })
      })

  })

