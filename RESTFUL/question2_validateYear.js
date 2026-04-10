import joi from 'joi'
import { StatusCodes } from 'http-status-pro-js'
import logger from '../logger/logger.js';
function userMid(req,res,next){
    try{
        let{year} = req.body;
        let ab = joi.object({
            year : joi.number().max(2026).min(1900)
        });
        let{error,value} = ab.validate(req.body)
        if(error){
            res.status(StatusCodes.BAD_REQUEST.code).json({
                code: StatusCodes.BAD_REQUEST.code,
                message: error.message,
                data:null
            })
        }
        req.body = value;
        next();
    }
    catch(error){
        console.log(error);
        logger("error", StatusCodes.INTERNAL_SERVER_ERROR.message)
        
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: StatusCodes.INTERNAL_SERVER_ERROR.message,
            data: null
        })
    }
}
export default userMid;