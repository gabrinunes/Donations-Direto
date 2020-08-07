const connection = require('../database/connection')
const generateUniqueId = require('../utils/generateUniqueId')

module.exports ={
    async index(request,response){
      const users = await connection('users').select('*');
      return response.json(users)
    },
   
    async create(request,response){
        const{name,email,whatsapp,city,uf,cnpj} = request.body;

        const id = generateUniqueId()

        const validateCpnj = await connection('users')
        .where('cnpj',cnpj)
        .select('name')

        if(validateCpnj.length > 0){
          return response.status(402).json({error:'User with CNPJ/CPF already exists'})
        
        }else{
          const user = await connection('users').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
            cnpj
        })
        console.log(user)
        return response.json({id})
    } 
         }
       
}