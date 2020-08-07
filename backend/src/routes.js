const express = require('express')
const {celebrate,Segments,Joi} = require('celebrate')
const multer = require('multer')

const multerConfig = require('./config/multer')

const UserController = require('./controllers/UserController')
const DonatioController = require('./controllers/DonationController')
const ProfileControler = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')
const routes = express.Router();

routes.post('/sessions',SessionController.create)

routes.get('/users',UserController.index);



const upload = multer(multerConfig)


routes.post('/users', celebrate({
    [Segments.BODY]:Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        cnpj: Joi.string().required(),
        whatsapp: Joi.string().required().min(10).max(15),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), UserController.create);

routes.post('/donations',upload.single('picture'),
celebrate({
    [Segments.BODY]:Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
    })
})
,DonatioController.create)

routes.delete('/donations/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}),DonatioController.delete)


routes.put('/donations/:id',upload.single('picture'),celebrate({
    [Segments.BODY]:Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
    })
})
,DonatioController.update)


routes.get('/donations',celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}),DonatioController.index)

routes.get('/profile', celebrate({
    [Segments.HEADERS]:Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}),ProfileControler.index)


module.exports = routes;    