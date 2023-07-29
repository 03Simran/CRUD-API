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
    ques:String,
    ans:String
})

//faqModel
const Faq =  mongoose.model('Faq',faqSchema)
//Connect to the database using Connection String
mongoose.connect('mongodb+srv://simran:ASDFGHJKL@cluster0.hjjk00d.mongodb.net/test',{useNewUrlParser:true, useUnifiedTopology : true}).then(()=>{
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
app.get('/:id',async (req,res)=>{
    var id = req.params.id
    var data = await Faq.findOne({_id:id})
    res.json(data)
    
})

//createOne
app.post('/',async (req,res)=>{
    
    const {ques,ans} = req.body
    
    const newFaq = new Faq({ques,ans})
    await newFaq.save()
    res.send("Posted")
})

//updateOne

app.put('/:id', async (req, res) => {
    
      var data = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (data) {
        res.send("Updated");
      } else {
        res.status(404).send("Error updating the FAQ");
      }

  });

//deleteOne
app.delete('/:id',async (req,res)=>{
    var id = req.params.id
    var data = await Faq.findByIdAndDelete(req.params.id).exec()

    if(data){
        res.send("Deleted")
    }
    else{
        res.status(404).send("Error deleting the FAQ"); 
    }
})


app.listen(port, ()=>{
    console.log(`Todo app listening on port ${port}`)
})