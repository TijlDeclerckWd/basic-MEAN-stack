var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');


var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String},
    password: {type: String},
    email: {type: String, required: true, unique:true},
    registerDate: Date,
    lastLogin: Date,
    profilePicture: {
        uploaded: {type: Boolean, default: false},
        name: {type: String, default: ''}
    },
    googleID: String,
    facebookID: String
}, { usePushEach: true });


schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);