const connection = require('../database/connection')
module.exports ={
  async index(request,response){
     const cnpj = request.headers.authorization;

     const id = await connection('users')
     .where('cnpj',cnpj)
     .select('id');


     
     const donations = await connection('donations')
     .where('user_id',id[0].id) // pega o id de um array de objetos e transforma em uma string para fazer a consulta no banco
     .select('*');
     
     //console.log(donations)

     const serializedDonations = donations.map(donation=>{
       return{
         ...donation,
         image_url:`https://backend-donation.herokuapp.com/uploads/${donation.picture}`
       }
     })
     console.log(serializedDonations)

     return response.json(serializedDonations);
  }
}