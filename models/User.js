const mongoose = require('mongoose');


//User Schema
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
            type: mogoose.Schema.Types.ObjectId,
            ref: 'thoughts'
        }],
        friends: [{
            type: mongoose.Schema.Types.ObjectId,
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

// get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// get total count of thoughts on retrieval
UserSchema.virtual('thoughtCount').get(function() {
    return this.thoughts.length;
});

// create the User model using the UserSchema
const User = mongoose.model('User', UserSchema);
module.exports = User;