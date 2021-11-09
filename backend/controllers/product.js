const { response } = require('express');
const Categoria = require('../models/Category');
const Producto = require('../models/Product');

/** getProductos */
const getProducts = async( req, resp = response ) => {
    
    // const productos = await Producto.find();

    // const productos = await Producto.find()
    //                                    .populate('category');
   
    const productos = await Producto.find()
                                    .populate('category','name');
    resp.status(200).json({
        ok:true,
        msg: 'List of Products',
        productos
    });
}


const setProduct = async ( req, resp = response ) => {
    
    const producto = new Producto(req.body);

    try {
        const productSave = await producto.save();
        resp.status(201).json({
            ok:true,
            msg: 'Product created satisfactorily',
            productSave
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:false,
            msg: 'product hs not been created',
        });
    }


    
        
    
}

/** actualizar producto */
const updateProduct = async ( req, resp = response ) => {
    
    const productId = req.params.id;

    try {
        const producto = await Producto.findById(productId);

        if(!producto){
            resp.status(404).json({
                ok: false,
                msg: "The product id does't exists in database",

            });
        }

        const updatedProduct = await Producto.findByIdAndUpdate(productId, req.body, {new: true});

        resp.json({
            ok:true,
            msg: 'Product updated satisfactorily',
            producto: updatedProduct
        });
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'there were an error creating the product',
        });
    }
    
}

/** eliminar producto */
const deleteProduct = async ( req, resp = response ) => {
    
    const productoId = req.params.id;

    try {
        const producto = await Producto.findById(productoId);

        if(!producto){
            resp.status(404).json({
                ok: false,
                msg: "The product id desn't exists on database"
            });
        }

        await Producto.findByIdAndDelete(productoId);

        resp.json({
            ok: true,
            msg: 'Product deleted satisfactorily'
        });

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'there were an error deleting the product'
        });
    }
}

const getCategories = async (req,resp = response) =>{

    

}


module.exports = {
    getProducts,
    setProduct,
    updateProduct,
    deleteProduct,
    getCategories
}
