const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
//const corsOptions = {};

const middleware = app =>{
    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.json()) 
    return app
}

module.exports = middleware;