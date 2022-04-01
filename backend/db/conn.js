const mongoose = require("mongoose")

const USERDB = process.env.USERDATABASE

mongoose.connect(USERDB).then(() => {
    console.log("connection successful")
}).catch((err) => console.log('no connection', err))