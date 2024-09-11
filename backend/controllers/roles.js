// //const { response, request } = require('express');
// //const bcryptjs = require('bcryptjs');

const Role = require('../models/role');

const rolesPath = (req, res = response) => {
    res.json({
        msg: 'patch API - rolesPath'
    });
}
const roleGet = async (req, res) => {
    try {
      const listRol = await Role.findAll();
  
      res.json({
        "ok": true,
        "roles":listRol
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Hubo un error al obtener la lista de roles' });
    }
};

// const createRole = async (req, res) => {
//     const { name } = req.body;
  
//     try {
//       const newRole = await Roless.create({ name });
//       res.status(201).json({ message: 'Role creado exitosamente', role: newRole });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: 'Hubo un error al crear el role' });
//     }
// }

// const editarPut = async (req, res) => {
//     const { id } = req.params;
//     const { name } = req.body;
  
//     try {
//       await Roless.update({ name }, { where: { id } });
//       const updatedRole = await Roless.findOne({ where: { id } });
//       res.json(updatedRole);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: 'Hubo un error al actualizar el role' });
//     }
// }

// const deleteRole = async (req, res) => {
//     const { id } = req.params;
  
//     try {
//       const role = await Roless.findByPk(id);
  
//       if (!role) {
//         return res.status(404).json({ message: 'Role no encontrado' });
//       }
  
//       await role.destroy();
//       res.json({ message: 'Role eliminado exitosamente' });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: 'Hubo un error al eliminar el role' });
//     }
// }

module.exports = {
  // createRole,
  // editarPut,
  roleGet,
  //deleteRole,
  
  rolesPath
  // usuariosGet,
  // usuariosPost,
  // usuariosPut,
  // usuariosPatch,
  // usuariosDelete,
}
//---CONSULTA PARA INSER◘4AR DATOS--
// INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) 
// VALUES (NULL, 'ADMINISTRADOR', '2024-07-09 20:38:34.000000', '2024-07-09 20:38:34.000000'), 
//       (NULL, 'USER', '2024-07-09 20:38:34.000000', '2024-07-09 20:38:34.000000');