const express = require('express');
const app= express();


const mongoose = require('mongoose');

const url="mongodb+srv://alanghribi:Sidibelabbes22@test.u4bfo.mongodb.net/test"
 
mongoose.connect(url).then(()=>{
   console.log("mongodb server Started");
 })

const coursesRouter=require("./Routers/courses.router");
app.use(express.json());




app.use('/api/courses',coursesRouter)



app.listen(5000,()=>{
console.log("this is the port 5000");
});
