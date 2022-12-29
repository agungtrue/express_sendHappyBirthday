const mongoose = require('mongoose');

const emailLogSchema = new mongoose.Schema({
    user: {
        type: Object,
        required: [true, 'a user must have a user'],
    },
    emailBody: {
        type: Object,
        required: [true, 'a user must have a email Body'],
    },
    emailResponse: {
        type: Object,
        required: [true, 'a user must have a email Response'],
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const EmailLog = mongoose.model('EmailLog', emailLogSchema);

module.exports = EmailLog;
