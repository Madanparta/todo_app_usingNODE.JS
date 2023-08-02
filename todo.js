const express = require('express');
const bodyParser = require('body-parser');
// const todos = require('./module/todoMongo');
const mongoose = require('mongoose');
const Todo = require('./module/todoMongo');



mongoose.connect('mongodb://127.0.0.1:27017/todos')
  .then(() => console.log('Connected!'));

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.static("public"))

app.get('/',async(req,res)=>{
    const todo = await Todo.find();
    res.render('todo.ejs',{todo})
})

app.post('/todo/add',async(req,res)=>{
    // console.log(req.body)
    await Todo.create({name:req.body.name})
    res.redirect('/')
})
app.get('/todo/:id/comp',async(req,res)=>{
    // console.log(req.body)
    // await Todo.create({name:req.body.name})
    await Todo.updateOne({_id:req.params.id},{status:true})
    // console.log(req.params.id)
    // console.log("marking")
    res.redirect('/')
})
app.get('/todo/:id/dlt',async(req,res)=>{
    await Todo.deleteOne({_id:req.params.id})
    res.redirect('/')
})

app.listen(5000,()=>{
    console.log("express server as been runing 5000 port");
})