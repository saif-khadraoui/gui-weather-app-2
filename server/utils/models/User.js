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
    locations: {
        type: Array,
        required: false
    },
    crops: {
        type: Array,
        required: false
    }, 
    commodities: {
        type: Array,
        required: false
    }

})


const UsersModel = mongoose.models.users || mongoose.model('users', UserSchema);

module.exports = UsersModel