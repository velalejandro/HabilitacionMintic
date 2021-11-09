const {Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name:{
        type: String,
        required: true
    }
},
{
    collection : 'categories'
}
);

module.exports = model('Category', CategorySchema);