import createHttpError from "http-errors";
import atob from "atob"
import UserModel from "../users/schema.js"

export const basicAuthMiddleware = async (req, res, next) => {

    if (!req.headers.authorization) {
      next(createHttpError(401, "Please provide credentials in Authorization header"))
    } else {
      
      const decodedCredentials = atob(req.headers.authorization.split(" ")[1])
      console.log(decodedCredentials)
  
      const [email, passward] = decodedCredentials.split(":")
      console.log("EMAIL ", email)
      console.log("PASSWORD ", passward)
  
      
  
      const user = await UserModel.checkCredentials(email, passward)
      if (user) {
       
        req.user = user 
        next()
      } else {
        
        next(createHttpError(401, "Credentials are not correct!"))
      }
    }
  }