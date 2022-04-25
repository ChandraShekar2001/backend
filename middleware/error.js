const errorHandler = require('../utils/errorhandler')

module.exports = (err, req, res, next)=>{
    
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server error"

    //wrong mongodb id error
    if(err.name === "CastError"){
        const message = `Resource not found ${err.path}`
        err = new errorHandler(message, 400)    
    }

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        err = new errorHandler(message, 400)
    }

    if(err.name === "JsonWebTokenError"){
        const message = `Invalid JSON Web Token`
        err = new errorHandler(message, 400)
    }
    if(err.name === "TokenExpiredError"){
        const message = `JSON Web Token expired, try again`
        err = new errorHandler(message, 400)
    }
    res.status(err.statusCode).json({
        success: false,
        Error: err.message,
    })

}