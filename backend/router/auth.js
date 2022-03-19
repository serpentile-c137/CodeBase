const { response } = require('express')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

require('../db/conn')
const User = require('../model/UserScehma')
const authenticate = require('../middleware/authenticate')

router.get('/', (req, res) => {
    res.send('hello from express server :) using router')
})

router.post('/register', async (req, res) => {
    const { name, email, username, contact, password, confirmpass } = req.body

    if (!name || !email || !username || !contact || !password || !confirmpass) {
        return res.json({ error: "please fill all the fields" })
    }

    try {
        const userExist = await User.findOne({ username: username })

        if (userExist) {
            return res.status(422).json({ error: "username already exists" })
        } else if (password != confirmpass) {
            return res.status(422).json({ error: "password and confirm password not matching" })
        } else {
            const user = new User({ name, email, username, contact, password, confirmpass })

            await user.save()
            res.status(201).json({ message: "user created successfully" })
        }


    } catch (err) {
        console.log(err)
    }


})

router.post('/login', async (req, res) => {
    try {
        const { email, username, password } = req.body

        if (!email || !username || !password) {
            return res.status(400).json({ error: "please fill all the data" })
        }

        const userLogin = await User.findOne({ email: email, username: username })
        // console.log(userLogin)

        if (userLogin) {
            let token;
            const isMatch = await bcrypt.compare(password, userLogin.password)

            token = await userLogin.generateAuthToken()
            // logintime = new Date.now()
            console.log(token)
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            })

            if (!isMatch) {
                res.status(400).json({ error: "Invalid credential." })
            } else {
                res.json({ message: "login successful" })
            }
        } else {
            res.status(400).json({ error: "Invalid credential." })
        }

    } catch (err) {
        console.log(err)
    }
})

router.get('/about', authenticate, (req, res) => {
    console.log("about page")
    // res.send("about page")
    res.send(req.rootUser)
})

router.get('/tutorial', authenticate, (req, res) => {
    console.log("tutorial page")
    // res.send("tutorial page")
    res.send(req.rootUser)
})

router.get('/compiler', authenticate, (req, res) => {
    console.log("compiler page")
    // res.send("compiler page")
    res.send(req.rootUser)
})

router.get('/logout', (req, res) => {
    console.log("logout page")
    res.clearCookie("jwtoken", { path: '/' })
    res.status(200).send("logout")
})

module.exports = router