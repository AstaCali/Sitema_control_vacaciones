const { Router } = require('express');
const { check } = require('express-validator');

const { 
    postVacation,
    getVacation,
    vacationPath
} = require('../controllers/vacations');
const { validarJWT } = require('../middlewares');

const router = Router();

router.get('/', getVacation );

router.post('/',[validarJWT], postVacation );

// router.put('/:id', [
// //router.put('/:id', [
//     check('name', 'El nombre del rol es obligatorio').not().isEmpty()
// ], editarPut);

// router.delete('/:id', deleteRole );

router.patch('/', vacationPath );


module.exports = router;