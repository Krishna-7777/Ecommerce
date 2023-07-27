const jwt = require("jsonwebtoken");
require("dotenv").config()

const authorize = async (ask, give, next) => {
    let token = ask.headers.authorization
    if (token) {
        try {
            token = ((ask.headers.authorization).split(' '))[1]
            let verified = jwt.verify(token, process.env.secret)
            if (verified) {
                ask.user = verified.user
                next()
            } else {
                give.send({ msg: "Wrong Access Token Or Expired, Please Login Again !" })
            }
        } catch (error) {
            give.send({ msg: "Invalid token" })
        }
    } else {
        give.send({ msg: "Access Token is required to access protected routes" })
    }
}

module.exports = {
    authorize
}