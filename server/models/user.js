var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    }
}, { retainKeyOrder: true });

var User = mongoose.model('User', usersSchema);


module.exports = User;