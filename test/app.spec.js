const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../src/app')

describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .set('Authorization', 'Bearer c5403ae6-efcd-4eab-aed6-34658eae1bca')
      .expect(200, 'Hello, world!')
  })
})