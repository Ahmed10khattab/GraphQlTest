const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },7
    isAdmin: { type: Boolean, default: false }
});

const AUTH1 = mongoose.model('User', userSchema);

module.exports = AUTH1;