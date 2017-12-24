var mongoose = require('mongoose');

var todoScheme = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
}, { retainKeyOrder: true });

var Todo = mongoose.model('Todo', todoScheme);

module.exports = Todo;