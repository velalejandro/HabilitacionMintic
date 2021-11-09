const { Router } = require('express');
const router = Router();

const {getUsers,setUser,updateUser,deleteUser} = require('../controllers/user');

/** define routes */
router.get( '/list', getUsers );

router.post( '/create', setUser );

router.put( '/update/:id', updateUser );

router.delete( '/delete/:id', deleteUser );

module.exports = router;
