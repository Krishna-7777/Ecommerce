const express = require("express");
const UserModel = require("../models/user.model");

const authRouter = express.Router()

authRouter.post('/register', async (ask, give) => {
    let { email, password, name } = ask.body
    try {
        if (!email || !password || !name) {
            give.send({ msg: "email, password & name is required in Request Body." })
        } else {
            let checkUser = await UserModel.findOne({ email }, { email: 1 })
            if (checkUser) {
                give.send({ msg: "You have already registerd, Please Login!" })
            } else {
                let user = new UserModel({ email, password, name })
                await user.save()
                give.send({ msg: "You have Succesfuly Registed, You can now Login." })
            }
        }
    } catch (error) {
        give.send({ msg: "Error occured while registering the user !", error: "Internal Server Error" })
    }
})

module.exports = {
    authRouter
}