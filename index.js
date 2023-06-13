require('dotenv').config()

const express=require('express')

const cors=require('cors')

require('./db/connection')

const router=require('./routes/router')

const server=express()

const PORT=5000

server.use(cors())
server.use(express.json())
server.use(router)

server.listen(5000,()=>{
    console.log("server listening to the port "+PORT);
})