const express = require('express')
const app = express()
const port = 3000

var bodyParser = require('body-parser')
app.use(bodyParser.json())

const jwt = require('jsonwebtoken')
const secret = 'my-secret-key'
const options={
    expiresIn : 7200 // expires in 2 hrs
}

const mongoose = require('mongoose')



mongoose.connect('mongodb+srv://simran:ASDFGHJKL@cluster0.hjjk00d.mongodb.net/')
