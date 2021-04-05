const  mongoose  = require("mongoose");

mongoose
    .connect('mongodb+srv://root:arzeezar123@cluster0.4iyye.mongodb.net/exam-numer',{useNewUrlParser: true,useUnifiedTopology: true})
    .catch(e => {
        console.error('Connection error',e.message)
    })
const db = mongoose.connection

module.exports = db