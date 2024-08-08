const express= require("express");
const router=express.Router();
const c= require('../controllers/courses.controllers')
const {validationSchema}=require('../middlewares/validationSchema')



router.route('/')
         .get(c.getAllCourses)
         .post(validationSchema(),c.addCourse)




router.route('/:courseId')
            .get(c.getCourse)
            .patch(c.editCourse)
            .delete(c.deleteCourse)

module.exports= router;