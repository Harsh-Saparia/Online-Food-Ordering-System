const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    fname: { type : String, required : true},
    lname: { type : String, required : true},
    email: { type : String, required : true, unique : true},
    password: { type : String, required : true},
    role: { type: String, default: 'customers'}
}, { timestamps: true })

module.exports = mongoose.model('User',userSchema)