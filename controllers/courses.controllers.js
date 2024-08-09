const {validationResult}=require("express-validator");
const Course=require('../models/course.model');
const httpStatus = require('../utils/http.status');
const asyncWrapper= require('../middlewares/asyncWrapper');
const appError= require('../utils/appError');


const getAllCourses=asyncWrapper(async (req,res)=>{
   //get all courses from db using cours model
   const courses= await Course.find({},{"__v": false});
   res.json({status:httpStatus.SUCCSSES,data:{courses}});
})

const getCourse= asyncWrapper(
   async (req,res,next) =>{
   
      const course = await Course.findById(req.params.courseId);
      if(!course){
         const error= appError.craete("not found course",404,httpStatus.FAIL);
         return next(error);
      }
      return res.json({status:httpStatus.SUCCSSES,data:{course}});   
   }
);

const addCourse=asyncWrapper( async (req,res,next)=>{
   const Error=validationResult(req);
   if(!Error.isEmpty()) 
      {
         const error=appError.craete(Error.array(),400,httpStatus.ERROR);
         return next(error);
      }
   const newCourse= new Course(req.body);
   await newCourse.save();
   res.status(201).json({status:httpStatus.SUCCSSES,data:{newCourse}});
});

const editCourse=asyncWrapper( async (req,res)=>{
      const courseId= req.params.courseId;
         const updatedCourse = await Course.updateOne({_id: courseId},{$set:{...req.body}});
         return res.status(200).json({status:httpStatus.SUCCSSES,data:{course:updatedCourse}});
});

const deleteCourse=asyncWrapper( async (req,res)=>{
      await Course.deleteOne({_id: req.params.courseId});
      res.status(200).json({status:httpStatus.SUCCSSES,data:null});
    }
);


module.exports={
   getAllCourses,
   getCourse,
   addCourse,
   editCourse,
   deleteCourse
}

