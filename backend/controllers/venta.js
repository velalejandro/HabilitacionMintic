const { response } = require('express');
const Venta = require('../models/Venta');


/** SetVenta */

const setVenta = async ( req, resp = response ) => {
    
    const venta = new Venta(req.body);

    try {
        const ventaSave = await venta.save();
        resp.status(201).json({
            ok:true,
            msg: 'Venta created satisfactorily',
            ventaSave
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:false,
            msg: 'venta has not been created',
        });
    }   
    
}

/** getVentas */
const getVentas = async( req, resp = response ) => {
    
    // const productos = await Producto.find();

    // const productos = await Producto.find()
    //                                    .populate('category');
   
    const ventas = await Venta.find();
                                    //.populate('category','name');
    resp.status(200).json({
        ok:true,
        msg: 'List of Products',
        ventas
    });
}

module.exports = {
    setVenta,
    getVentas
}