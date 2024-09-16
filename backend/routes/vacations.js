const { Router } = require('express');

const { 
    postVacation,
    getVacation,
    getVacationUser,
    getByIDVacations,
    vacationPath,
    putVacations,
    deleteVacation
} = require('../controllers/vacations');
const { validarJWT } = require('../middlewares');

const router = Router();

router.get('/', getVacation );

router.post('/',[validarJWT], postVacation );

//--PARRA HACER EL BUSCADOR DE FLKTRO EN VACACIONES
router.get('/filtraruser', getVacationUser );
// getByID
router.get('/:id', getByIDVacations );

router.put('/:id', [
    validarJWT
], putVacations);

router.delete('/:id', deleteVacation);

router.patch('/', vacationPath );


module.exports = router;