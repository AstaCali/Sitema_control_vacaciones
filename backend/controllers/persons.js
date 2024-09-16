// const { Sequelize } = require('sequelize');
const { Op } = require("sequelize");
const Person = require('../models/person');
const User = require("../models/user");
const Role = require("../models/role");
//const Usuario = require('../models/usuario');
// const Propietario = require('../models/propietario');

const personGetById = async(req, res) => {
    try {
        const { id } = req.params;
        const person = await Person.findByPk(id);

        if (!person) {
            return res.status(404).json({ msg: 'Persona no existe' });
        }

        res.json({
            //total: usuarios.count,
            //usuarios: usuarios.rows
            "ok": true,
            person
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
}
// const personGet = async(req, res) => {
//     try {
//         //const { id } = req.params;
//         const person = await Person.findAll();

//         res.json({
//             "ok": true,
//             person
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             msg: "Error en el servidor"
//         });
//     }
// }
// const personGet = async (req, res) => {
//     try {
//         // Buscar usuarios con el rol de 'PACIENTE'
//         const users = await User.findAll({
//             include: [
//                 {
//                     model: Person,
//                 },
//                 {
//                     model: Role,
//                     where: { name: 'EMPLEADO' } // Filtrar por rol 'PACIENTE'
//                 }
//             ]
//         });

//         // Mapear los datos obtenidos para enviar la respuesta
//         const personsToSend = users.map(user => {
//             const personData = user.Person;
//             return {
//                 id: personData.id,
//                 name: personData.name,
//                 last_name: personData.last_name
//             };
//         });

//         res.json({
//             ok: true,
//             person: personsToSend
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             msg: "Error en el servidor"
//         });
//     }
// };
//----Crear persona----
const personPost  = async (req, res) => {
    const { name, last_name, ci, celular, gender } = req.body;
  
    try {
      // Crear la persona
      const person = await Person.create({ name, last_name, ci, celular, gender });
  
      res.json({
        "ok": true,
        person
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al crear el usuario" });
    }
};
//-----2024 ---CONtINUA BUSQUEDA DE PERSONA PARA LA COTIZACION--

const personTodo = async (req, res) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    try {
        //const busqueda = req.params.busqueda;
        const persons = await Person.findAll({
            // where: {
            //     name: {
            //         [Sequelize.Op.iLike]: `%${busqueda}%` // Utilizamos Sequelize.Op.iLike para realizar una búsqueda insensible a mayúsculas y minúsculas
            //     }
            // }
            where: {
                name: {
                    [Op.like]: `%${busqueda}%` // Utilizamos Sequelize.Op.iLike para realizar una búsqueda insensible a mayúsculas y minúsculas
                }
            }
        });
        res.json({
            ok: true,
            personas: persons
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

const personGet = async (req, res) => {
    try {
        // Contar usuarios con el rol de 'EMPLEADO'
        const totalEmpleados = await User.count({
            include: [
                {
                    model: Role,
                    where: { name: 'EMPLEADO' } // Filtrar por rol 'EMPLEADO'
                }
            ]
        });

        res.json({
            ok: true,
            totalEmpleados
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
};

const personPath = (req, res = response) => {
    res.json({
        msg: 'patch API - PersonPatch'
    });
}

module.exports = {
    personPath,
    personGetById,
    personGet,
    personPost,
    personTodo

}