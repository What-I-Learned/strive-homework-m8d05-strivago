import createHttpError from "http-errors"
import { verifyJWT } from "./tools"

export const JWTAuthMiddleware = (req, res, next) => {

    if (!req.headers.Authorization) {
        next(createHttpError(401, " please provide credentials in Authorization header!"))
    } else {
        try {
            const token = req.headers.Authorization.replace("barer", " ")
            const decordedToken = await verifyJWT(token)
            console.log(decordedToken)
            next()
            const user = await('add import and connection to model').findById(decordedToken.id)
            if (user) {
                req.user = user
                next()
            } else {
                next(createHttpError(404, "user not found"))
            }
        } catch (error) {
            console.log(error)
            next(createHttpError(401, "token not valid"))
        }
    }

}