const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required:true
    },
    user:{
        type: String,
        required: true,
        defaul: 'user'
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
        default: '6186bbbf611f87c0a912de40'
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    registeredDate: {
        type: Date,
        default: Date.now
    },
    idToken : {
        type: String
    }


});
module.exports = model('User',UserSchema);
// var schema = new Schema({name:string}, // eesta linea // { ollection: 'actores});