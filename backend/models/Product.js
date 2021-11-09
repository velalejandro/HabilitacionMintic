const { Schema, model } = require('mongoose');

const ProductSchema = Schema({

    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    stock:{
        type: Number,
        required: true
    },
    purchase_price:{
        type: Number,
        required: true
    },
    sale_price:{
        type: Number,
        required: true
    },
    registration_date:{
        type: Date,
        default: Date.now
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    }

});

module.exports = model('Product',ProductSchema);
