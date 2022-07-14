const mongoose = require('mongoose');
var validator = require("email-validator");

var staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required'
    },
    age: {
        type: String,
        required: 'This field is required'
    },
    gender: {
        type: String,
        required: 'This field is required'
    },
    department: {
        type: String,
        required: 'This field is required'
    },
    country: {
        type: String,
        required: 'This field is required'
    },
    email: {
        type: String,
        required: 'This field is required'
    },
    phone: {
        type: String,
        required: 'This field is required'
    }
})

// custom validation for email

staffSchema.path('email').validate((val) => {
    return validator.validate(val);
}, 'Invalid Email');

mongoose.model('Staff', staffSchema);