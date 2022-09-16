const monggose = require('mongoose');

const userSchema = new monggose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }
},{
    collection: 'User',
    versionKey: false //here
});

module.exports = monggose.model('User', userSchema);