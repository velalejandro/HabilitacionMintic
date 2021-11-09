const { Schema, model } = require('mongoose');

const VentaSchema = Schema({

    fecha : {
        type: Date,
        default: Date.now
    },
    valor_total : {
        type: Number
    }, 
    cliente : {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    vendedor : {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    productos : [{
        producto : {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        cantidad : {
            type: Number
        } 
    }]

});

module.exports = model('Venta',VentaSchema);