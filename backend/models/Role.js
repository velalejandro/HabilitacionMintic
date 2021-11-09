const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    name:{
        type: String,
        required: true
    }
},
{
    collection : 'roles'
}
);

module.exports = model('Role', RoleSchema);