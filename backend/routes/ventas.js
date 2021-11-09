const {setVenta,getVentas} = require('../controllers/venta')
const { validarJWT } = require('../middlewares/validar-jwt');
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

//router.use(validarJWT);

router.get('/',getVentas);

router.post(
    '/',
    [
        check('valor_total','El valor total es obligatorio').not().isEmpty(),
        check('cliente','El cliente es obligatorio').not().isEmpty(),
        check('vendedor','El vendedor es obligatorio').not().isEmpty(),
        validarCampos
    ],
    setVenta);



//router.delete('/:id', deleteProduct);

//router.get('/categories',getCategories);

module.exports = router;
