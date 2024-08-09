class AppError extends Error{
   constructor(){
      super();
   }

   craete(message,statusCode,httpText){
      this.message=message;
      this.statusCode=statusCode;
      this.httpText=httpText;
      return this;

   }
   
}
module.exports= new AppError();