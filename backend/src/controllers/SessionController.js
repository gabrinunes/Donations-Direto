const connection = require('../database/connection')
module.exports = {
  async create(request,response){  
  const {cnpj} = request.body;

  const user = await connection('users')
  .where('cnpj',cnpj)
  .select('name')
  .select('id')
  .first();

  const id = await connection('users')
  .where('cnpj',cnpj)
  .select('id')


  if(!user){
      return response.status(400).json({error:'No User found with this ID'})
  }
  return response.json(user);
  }
}