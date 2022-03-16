const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: true
    },
    // gender: {
    //     type: String,
    //     required: true
    // },
    password: {
        type: String,
        required: true
    },
    confirmpass: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            },
            logintime: {
                type: String,
                required: true
            }
        }
    ]
})

userSchema.pre('save', async function (next) {
    // console.log("hi from inside")
    const salt = bcrypt.genSaltSync(12);
    if (this.isModified('password')) {
        // this.password = bcrypt.hashSync(this.password, salt)
        // this.confirmpass = bcrypt.hashSync(this.confirmpass, salt)
        this.password = bcrypt.hashSync(this.password, salt)
        this.confirmpass = bcrypt.hashSync(this.confirmpass, salt)
        // console.log("hi from inside inside")
        // console.log(this.password)
        // console.log(this.confirmpass)
    }
    next();
})

// token generation
userSchema.methods.generateAuthToken = async function () {
    try {
        let logintime = new Date()
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: token, logintime: logintime })
        // this.tokens = this.tokens.concat({ logintime: logintime })
        await this.save()
        return token
    } catch (err) {
        console.log(err)
    }
}

const User = mongoose.model('user', userSchema)

module.exports = User