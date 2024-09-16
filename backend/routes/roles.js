const { Router } = require('express');
const { check } = require('express-validator');

//const {
    // validarJWT,
//} = require('../middlewares');

const { 
    roleGet,
     rolesPath, 
     roleGetTotal
} = require('../controllers/roles');

const router = Router();

router.get('/', roleGet );

router.get('/totalgetrole', roleGetTotal );

// router.post('/',[
//     check('name', 'El nombre rol es obligatorio').not().isEmpty()
// ], createRole );

// router.put('/:id', [
// //router.put('/:id', [
//     check('name', 'El nombre del rol es obligatorio').not().isEmpty()
// ], editarPut);

// router.delete('/:id', deleteRole );

router.patch('/', rolesPath );


module.exports = router;