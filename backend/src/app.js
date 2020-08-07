const express = require('express');
const cors = require('cors')
const path = require('path')

const routes = require('./routes');
const {errors} = require('celebrate')
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads',express.static(path.resolve(__dirname,'..','uploads')))

app.use(routes);



app.use(errors());


module.exports = app;