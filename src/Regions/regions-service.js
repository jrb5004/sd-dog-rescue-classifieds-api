const RegionsService = {

    getAllRegions(knex) {
        return knex.select('*').from('regions')
    },
   
    getById(knex, id) {
        return knex.from('regions').select('*').where('id', id).first()
    }
}


module.exports = RegionsService