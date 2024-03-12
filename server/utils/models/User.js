const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },

})


const UsersModel = mongoose.models.users || mongoose.model('users', UserSchema);

module.exports = UsersModel