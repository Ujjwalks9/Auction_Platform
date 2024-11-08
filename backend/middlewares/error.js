class ErrorHandler extends Error{  //the error class already exists in the node js
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal server error.";
    err.statusCode = err.statusCode || 500;
    //console.log(err) ouputs error name , type , field ,reason
    if(err.name  === "JsonWebTokenError"){
        const messsage = "Json Web Token is invalid, Try Again."
        err = new ErrorHandler(message, 400);
    }

    if(err.name  === "TokenExpiredError"){
        const messsage = "Json Web Token is expired, Try Again."
        err = new ErrorHandler(message, 400);
    }


    if(err.name  === "CastError"){
        const messsage = `Invalid ${err.path}`; //it recognises the error that does not match with the format of input as specifed in userSchema
        err = new ErrorHandler(message, 400);
    }

    const errorMessage = err.errors ? Object.values(err.errors).map((error) => error.message) .join(" "): err.message;

    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage,
    });
};

export default ErrorHandler;