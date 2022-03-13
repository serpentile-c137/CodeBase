const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

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
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpass: {
        type: String,
        required: true
    }
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


const User = mongoose.model('user', userSchema)

module.exports = User