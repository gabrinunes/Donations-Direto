const connection = require('../database/connection');
const { update } = require('../database/connection');


module.exports ={
    async index(request,response){
        const {page = 1} = request.query;

        const [count] = await connection('donations').count()
        const donations = await connection('donations')
        .join('users','users.id','=','donations.user_id')
        .limit(5)
        .offset((page -1)* 5)
        .select([
        'donations.*',
        'users.name',
        'users.email',
        'users.cnpj',
        'users.whatsapp',
        'users.city',
        'users.uf'
        ]);

        
        response.header('X-Total-Count', count['count(*)']);

        return response.json(donations);
    },
    async delete(request,response){
       const {id}= request.params;
       const user_id = request.headers.authorization

       const donation = await connection('donations')
       .where('id',id)
       .select('user_id')
       .first()

       if(donation.user_id != user_id){
           return response.status(401).json({error:'Operation not permited'})
       }
       await connection('donations').where('id',id).delete();

       return response.status(204).send();
    },

    async update(request,response){
        const{title,description} = request.body;

        const pic = request.file.filename

        const url_id = `https://backend-donation.herokuapp.com/uploads/${pic}`

        const {id}= request.params;
        const user_id = request.headers.authorization

        const updateDonation = await connection('donations')
        .where('id',id)
        .select('user_id')
        .first()

        const donation = {
            picture:url_id,
            title,
            description,
            user_id,
        }

        console.log(updateDonation)
        console.log(user_id)

        if(updateDonation.user_id != user_id){
            return response.status(401).json({error:'Operation not permited'})
        }
 
        await connection('donations').update(donation).where('id',id)
        
        return response.status(204).send();

    },
    async create(request,response){
        const{title,description} = request.body;

        const pic = request.file.filename

        const url_id = `https://backend-donation.herokuapp.com/uploads/${pic}`

        console.log(url_id)

    
        const user_id = request.headers.authorization;

        const donation = {
            picture:url_id,
            title,
            description,
            user_id,
        }

        console.log('multer',donation)

       const [id] = await connection('donations').insert(donation)
        return response.json({ id })
    }
}