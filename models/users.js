var mongoose = require('mongoose')

var usersSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    // 1.token: Modifiez le schéma du user pour sauvegarder le futur token
    token: String
})

var usersModel = mongoose.model('users', usersSchema)

module.exports = usersModel;