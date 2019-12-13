function makeRegionsArray() {
    return [
      {
        id: 1,
        name: 'Region One',
        description: 'All about region one.'
      },
      {
        id: 2,
        name: 'Region Two',
        description: 'All about region two.'
      },
      {
        id: 3,
        name: 'Region Three ',
        description: 'All about region three.'
      }
    ]
  }
  
  function makeDogsArray() {
    return [
        {
          id: 1,
          name: 'First Dog',
          breed: 'breed one',
          size: 'size one',
          gender: 'gender one',
          age: 'age one',
          regionid: 2,
          story: 'story one',
          email: 'email one'
        },

        {
            id: 2,
            name: 'First Two',
            breed: 'breed two',
            size: 'size two',
            gender: 'gender two',
            age: 'age two',
            regionid: 3,
            story: 'story two',
            email: 'email two'
        }
    ]
  }

  function makeExpectedListingArray() {
    return [
        {
            id: 1,
            name: 'First Dog',
            breed: 'breed one',
            size: 'size one',
            gender: 'gender one',
            age: 'age one',
            regionid: 2,
            story: 'story one',
            email: 'email one'
          },
  
          {
              id: 2,
              name: 'First Two',
              breed: 'breed two',
              size: 'size two',
              gender: 'gender two',
              age: 'age two',
              regionid: 3,
              story: 'story two',
              email: 'email two'
        }
    ]
}
  
  module.exports = {
    makeRegionsArray,
    makeDogsArray,
    makeExpectedListingArray
  }