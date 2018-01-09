var mongoose = require('mongoose');

//Setup for promise use instead of callbacks
//mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
    mongoose
};