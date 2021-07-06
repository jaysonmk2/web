require('dotenv').config()
const key = process.env.KEY
const ErrorResponse = require('../utils/errorResponse');

//libs

const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try{
    const decoded = jwt.verify(token, process.env.KEY)
    const user = Users.findById(decoded.id)
    
  
    if(!user) {
      return next(new ErrorResponse("No user found with this id."), 404)
    }
    req.user = user;
    next();

  }catch(error){
    return next(new ErrorResponse("Not authorized to access this router",401))
  }
};