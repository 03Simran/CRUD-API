const express = require('express')
const app = express()
const port = 3000

var bodyParser = require('body-parser')
app.use(bodyParser.json())

// const jwt = require('jsonwebtoken')
// const secret = 'my-secret-key'
// const options={
//     expiresIn : 7200 // expires in 2 hrs
// }

const mongoose = require('mongoose')

//Defining faq schema
const faqSchema = new mongoose.Schema({
    id:Number ,
    ques:String,
    ans:String
})

//faqModel
const Faq =  mongoose.model('Faq',faqSchema)
//Connect to the database using Connection String
mongoose.connect('mongodb+srv://kaursp2003:ASDFGHJKL@cluster0.ehzjigu.mongodb.net/',{useNewUrlParser:true, useUnifiedTopology : true}).then(()=>{
    console.log("Connected to MongoDB")
}).catch((error)=>{
    console.log("Error connecting to the database")
})



//Read all data 
app.get('/',async(req,res)=>{
    const ques = await Faq.find({})
    res.json(ques)
})

//Read one 
app.get('/:id',(req,res)=>{
    // var id = req.params.id
    //  var data = data.finOne(id)
    //  res.json(data)
    res.send("Read One")
})

//createOne
app.post('/',async (req,res)=>{
    
    const {ques,ans} = req.body
    var id = Math.floor(Math.random()*1000)
    const newFaq = new Faq({id,ques,ans})
    await newFaq.save()
    res.send("Posted")
})

//updateOne
app.put('/:id',(req,res)=>{

    res.send("Updated ")
})

//deleteOne
app.delete('/:id',(req,res)=>{

    res.send("Deleted")
})


app.listen(port, ()=>{
    console.log(`Todo app listening on port ${port}`)
})