
const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');


const { esRoleValido, emailExiste, existsUserById, esPersonValido } = require('../helpers/db-validators');

const { usersGet,
        usersGetById,
        updateUserState,
        usersPost,
        usuariosPatch,
        userPut,
        deleteUser,
        //-----
        //usersGetPerson
    } = require('../controllers/users');

const router = Router();

//--###########################--CRUD------#############################--

router.put('/:id', [
    validarJWT,
    check('id', 'El id debe ser un número entero válido').isInt(),
    check('id').custom(existsUserById),
    check('role_id').custom(esRoleValido),
    check('person_id').custom(esPersonValido),
    //check('state'),
    //check('state', 'El state de persona es obligatorio').not().isEmpty(),
    //esAdminRole,
    validarCampos
], userPut);

router.delete('/:id',[
    validarJWT,
  ],deleteUser );
//---------hasta aqui-----------

router.get('/',[validarJWT], usersGet );//se necesita token

router.get('/:id',[validarJWT], usersGetById ); 

router.post('/',[
    validarJWT,
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailExiste ),
], usersPost );

router.put('/state/:id', updateUserState );


router.patch('/', usuariosPatch );
//--###########################--HASTA AQUI------#############################--

module.exports = router;