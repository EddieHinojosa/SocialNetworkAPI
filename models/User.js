const { Schema, model } = require('mongoose');



const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmmed: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid email address']
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thoughts'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);