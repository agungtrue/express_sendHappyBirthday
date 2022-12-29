const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'a user must have a first name'],
        trim: true,
        lowercase: true,
    },
    lastName: {
        type: String,
        required: [true, 'a user must have a last name'],
        trim: true,
        lowercase: true,
    },
    birthdayDate: {
        type: String,
        required: [true, 'a user must have a birthday date'],
    },
    dob_obj: {
        type: Object
    },
    location: {
        type: String,
        required: [true, 'a user must have a location'],
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
