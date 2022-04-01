const { response } = require('express')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

require('../db/conn')
const User = require('../model/UserScehma')
const Tutorial = require('../model/TutorialSchema')
const authenticate = require('../middleware/authenticate')

var axios = require('axios');
const showtutorial = require('../middleware/authenticate')

router.get('/', (req, res) => {
    res.send('hello from express server :) using router')
})

router.post('/pushtutorial', async (req, res) => {
    const { title, concept, codesnippet, practicequestion } = req.body
    if (!title || !concept || !codesnippet || !practicequestion) {
        return res.json({ error: "please fill all the fields" })
    }
    // console.log(req.body)
    try {
        const tutorialExist = await Tutorial.findOne({ title: title })

        if (tutorialExist) {
            return res.status(422).json({ error: "tutorial already exists" })
        } else {
            const tutorial = new Tutorial({ title, concept, codesnippet, practicequestion })
            await tutorial.save()
            res.status(201).json({ message: "tutorial saved successfully" })
        }

    } catch (err) {
        console.log(err)
    }
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

router.get('/tutorial', showtutorial, (req, res) => {
    console.log("tutorial page")
    // res.send("tutorial page")
    res.send(req.tutorial)
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

router.post('/submitcode', authenticate, async (req, res) => {
    console.log("submit code")
    try {
        const code = req.body.code
        const input = req.body.input
        const inputtype = req.body.inputtype
        console.log(req.body.code)
        if (!code) {
            console.log("code cant be empty")
            return res.json({ error: "code cant be empty" })
        }

        var data = JSON.stringify({
            "code": code,
            "language": "c",
            "input": input
        });

        var config = {
            method: 'post',
            url: 'https://codexweb.netlify.app/.netlify/functions/enforceCode',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        const output = await axios(config)
            .then(function (response) {
                // console.log(response.data);
                // output = response.data.output
                // const output = response.data.output
                // console.log(response.json())
                return response.data
            })
            .catch(function (error) {
                console.log(error);
            });

        console.log("output: ", output)

        // const output = response.data.output

        const usercode = await User.findOne({ _id: req.userID })
        if (usercode) {
            const usercode1 = await usercode.addMessage(code, input, inputtype, output.output, output.error)
            // await usercode1.save()
            // console.log(usercode1)
            res.send(output)
            res.status(201).json({ message: "code submitted" })
        }

    } catch (err) {
        console.log(err)
    }
})

module.exports = router