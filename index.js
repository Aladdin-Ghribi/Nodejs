require('dotenv').config();
const express = require('express');
const app= express();
const httpStatus = require('./utils/http.status');


const mongoose = require('mongoose');

const url=process.env.MONGODB_URL;

mongoose.connect(url).then(()=>{
   console.log("mongodb server Started");
 })

const coursesRouter=require("./Routers/courses.router");
app.use(express.json());




app.use('/api/courses',coursesRouter);
app.all('*',(req, res)=>{
  res.status(400).json({status:httpStatus.ERROR,message:"NOT AVAILABLE"});
})


app.listen(process.env.PORT || 4000,()=>{
console.log("this is the port 5000");
});
