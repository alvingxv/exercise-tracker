const monggose = require('mongoose');

const exerciseSchema = new monggose.Schema({

    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    userId: {
        type: monggose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    }
}, {
    collection: 'Exercise',
    versionKey: false
});
