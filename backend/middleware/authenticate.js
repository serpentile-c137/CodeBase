const jwt = require("jsonwebtoken")
const User = require('../model/UserScehma')

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken
        // let token = req.rawHeaders
        // // const token = req.headers.authorization.split(" ")[1];
        // const token = req.header("jwtoken");

        // console.log(token)
        // console.log(token[9].split("=")[1])
        // const token1 = token[9].split('=')[1]
        // console.log(token1)

        const verifytoken = jwt.verify(token, process.env.SECRET_KEY)
        const rootUser = await User.findOne({ _id: verifytoken._id, "tokens.token": token })

        if (rootUser) { console.log(rootUser) }

        if (!rootUser) {
            throw new Error("User not found")
        }
        console.log("user logged in")
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