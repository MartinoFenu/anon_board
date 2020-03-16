const { validationResult } = require('express-validator');

//form validation
const validator = (req, res, next) => {
  if(res.locals.isAuthenticated) return next();

  const errors = validationResult(req)
   if (errors.isEmpty()) {
     return next()
   }
   const extractedErrors = []
   errors.array().map(err => extractedErrors.push({
     key: err.param,
     message: err.msg
   }))

   return res.status(422).json({
     error: extractedErrors,
   })
}


module.exports = validator;
