// import what I need
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')
const Comment = require('./comment')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const commentSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

module.exports = commentSchema