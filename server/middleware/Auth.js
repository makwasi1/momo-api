const catchAsyncErrors = require('./CatchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const admin = require('firebase - admin');
const authenticateJWT = async(req, res, next) => {
    const authHeader = req.headers.authorization;

    exports.checkUserAuthentication = catchAsyncErrors(async(req, res, next) => {
        const { token } = req.cookies;
        if (!token) {
            return next(
                new ErrorHandler('Please login again to access this resource', 401)
            );
        }
        if (authHeader) {
            const idToken = authHeader.split(" ")[1];
            admin
                .auth()
                .verifyIdToken(idToken)
                .then(function(decodedToken) {
                    return next();
                })
                .catch(function(error) {
                    console.log(error);
                    return res.sendStatus(403);
                });
        } else {
            res.sendStatus(401);
        };
    }, )
}
module.exports = authenticateJWT