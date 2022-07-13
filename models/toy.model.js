const mongoose = require('mongoose');
var validator = require("email-validator");

var toySchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required'
    },
    price: {
        type: String,
        required: 'This field is required'
    },
    amount: {
        type: String,
        required: 'This field is required'
    },
    provider: {
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
    },
    city: {
        type: String,
        required: 'This field is required'
    }
})

// custom validation for email

toySchema.path('email').validate((val) => {
    return validator.validate(val);
}, 'Invalid Email');

mongoose.model('Toy', toySchema);