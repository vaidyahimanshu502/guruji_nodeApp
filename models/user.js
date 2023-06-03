const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        reuired: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'basic',
        enum: ["basic", "supervisor", "admin"]
       },
 },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', UserSchema);
module.exports = User;