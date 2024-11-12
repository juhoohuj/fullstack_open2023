const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../models/user')



const userExtractor = (request, response, next) => {
    const authorization = request.get('authorization');
  
    if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
      // No token found, but that's okay, continue to the next middleware or route
      return next();
    }
  
    const token = authorization.substring(7);
  
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      request.user = decodedToken; // Assuming your user information is stored in the token payload
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'Token invalid' });
      }
    } catch (error) {
      return response.status(401).json({ error: 'Token invalid or expired' });
    }
  
    // Token is valid, continue to the next middleware or route
    next();
  };
  
  module.exports = {
    userExtractor,
  };


const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:', request.path)
    console.log('Body:', request.body)
    console.log('---')
    next()
}


const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
        } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
        } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'invalid token' })
        }
    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}


module.exports = {
    requestLogger,
    errorHandler,
    userExtractor
}