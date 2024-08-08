const {validationResult}=require("express-validator");
const Course=require('../models/course.model');
const httpStatus = require('../utils/http.status');


const getAllCourses= async (req,res)=>{
   //get all courses from db using cours model
   const courses= await Course.find();
   res.json({status:httpStatus.SUCCSSES,data:{courses}});
};

const getCourse= async (req,res)=>{
   try{
      const course = await Course.findById(req.params.courseId);
      if(!course) return res.status(404).json({status:httpStatus.FAIL,data:{course:"Course not found"}});
      return res.json({status:httpStatus.SUCCSSES,data:{course}});
   }catch(err){
         res.status(400).json({status:httpStatus.ERROR,message:err.message});
      }
   
};

const addCourse= async (req,res)=>{
   const Error=validationResult(req);
   if(!Error.isEmpty()) return res.status(400).json({status:httpStatus.ERROR,message:"invalid data"});
   const newCourse= new Course(req.body);
   await newCourse.save();
   res.status(201).json({status:httpStatus.SUCCSSES,data:{newCourse}});
};

const editCourse= async (req,res)=>{
   try{
      const courseId= req.params.courseId;
         const updatedCourse = await Course.updateOne({_id: courseId},{$set:{...req.body}});
         return res.status(200).json({status:httpStatus.SUCCSSES,data:{course:updatedCourse}});
   }catch(e){
     return res.status(400).json({status:httpStatus.ERROR,message:e.message});
   }

};

const deleteCourse= async (req,res)=>{
 try{
    await Course.deleteOne({_id: req.params.courseId});
   res.status(200).json({status:httpStatus.SUCCSSES,data:null});
    }catch(e){
         return res.status(400).json({status:httpStatus.ERROR,message:e.message});
    }

};


module.exports={
   getAllCourses,
   getCourse,
   addCourse,
   editCourse,
   deleteCourse
}

