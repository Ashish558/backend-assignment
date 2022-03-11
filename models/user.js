
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
    },

    referredUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

    isPaymentMade: {
        type: Boolean,
    },

    totalEarnings: {
        type: Number
    },

})


module.exports = mongoose.model("users", userSchema, "users");