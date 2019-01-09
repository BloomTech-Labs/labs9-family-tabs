const express = require('express');
const server = express();
server.use(express.json()); 

const knex = require('knex'); 

const dbEngine = process.env.DB || 'development'; 
const dbConfig = require("./knexfile")[dbEngine];
const db = knex(dbConfig);

const cors = require('cors'); 
const corsOptions = {

  };
server.use(cors(corsOptions)); 

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

server.get('/', (req, res) => {
    db('users')
        .then(users => {
            res.status(201).json({users});
        })
        .catch(err => {
            res.status(500).json({err: "Failed to get user from user table."})
        })
})



module.exports = server;