const jwt = require("jsonwebtoken")
const User = require('../model/UserScehma')

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken
        const verifytoken = jwt.verify(token, process.env.SECRET_KEY)
        const rootUser = await User.findOne({ _id: verifytoken._id, "tokens.token": token })

        if (!rootUser) {
            throw new Error("User not found")
        }
        req.token = token
        req.rootUser = rootUser
        req.userID = rootUser._id
        next()

    } catch (err) {
        res.status(401).send('Unauthorised: no token provided')
        console.log(err)
    }
}

module.exports = authenticate