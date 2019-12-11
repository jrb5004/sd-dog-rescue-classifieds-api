const DogsService = {

    getAllDogs(knex) {
        return knex.select('*').from('dogs')
    },
   
    getById(knex, id) {
        return knex.from('dogs').select('*').where('id', id).first()
    },

    insertDog(knex, newDog) {
        return knex
            .insert(newDog)
            .into('dogs')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    updateDog(knex, id, newDogFields) {
        return knex('dogs')
        .where({ id })
        .update(newDogFields)
    },

}


module.exports = DogsService