
const {body}=require("express-validator");

const validationSchema=()=>{
return [body("title")
   .notEmpty()
   .withMessage("Invalid Input")
   .isLength({min:2})
   .withMessage("Input less than 2 chars")
   ,body("price")
   .notEmpty()
   .withMessage("Invalid Input")
]};

module.exports={
   validationSchema
}