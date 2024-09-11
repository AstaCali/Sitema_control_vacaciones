const { Model, where } = require('sequelize');
const Person = require('../models/person');
const User = require('../models/user');
const Vacation = require('../models/vacation');
const moment = require('moment'); // Importa moment.js para el cálculo de fechas


// Lista de días festivos (en formato 'YYYY-MM-DD')
const diasFestivos = [
    '2024-12-25', // Navidad
    '2024-01-01', // Año Nuevo
    '2024-05-01', // Día del Trabajador
];

// Función para contar días laborables excluyendo fines de semana y festivos
const calcularDiasLaborables = (startDate, endDate) => {
    let count = 0;
    let currentDate = startDate.clone();

    while (currentDate.isSameOrBefore(endDate)) {
        const dayOfWeek = currentDate.day();
        const currentDateString = currentDate.format('YYYY-MM-DD');

        if (dayOfWeek !== 0 && dayOfWeek !== 6 && !diasFestivos.includes(currentDateString)) {
        count++;
        }
        currentDate.add(1, 'days');
    }

    return count;
};

const postVacation = async (req, res) => {
    const { user_id, start_date, end_date, reason, observations } = req.body;
    const id = req.id;
    console.log('LLEGA_ID_USER',id);

    try {
        if (!start_date || !end_date) {
        return res.status(400).json({ message: 'Proporciona start_date y end_date' });
        }

        const startDate = moment(start_date, 'YYYY-MM-DD');
        const endDate = moment(end_date, 'YYYY-MM-DD');

        if (startDate.isAfter(endDate)) {
        return res.status(400).json({ message: 'start_date no puede ser posterior a end_date' });
        }

        const totalDays = calcularDiasLaborables(startDate, endDate);

        // Obtener el usuario
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si el usuario tiene suficientes días de vacaciones disponibles
        if (user.entry_date < totalDays) {
            return res.status(400).json({ message: 'No tienes suficientes días de vacaciones' });
        }

        const newVacation = await Vacation.create({
            user_id,
            registration_userid: id,
            start_date,
            end_date,
            total_day: totalDays,
            reason,
            observations
        });

        // Descontar los días de vacaciones
        user.entry_date -= totalDays;
        await user.save();  // Guardar los cambios en la base de datos

        return res.status(201).json({ message: 'Vacaciones creadas', vacation: newVacation });

    } catch (error) {
        console.error('Error al crear las vacaciones:', error);
        return res.status(500).json({ message: 'Error al crear las vacaciones' });
    }
};

//---BACACIONES---
// const vacatioGet = async (req, res = response) => {
//     try {

//       const desde = Number(req.query.desde) || 0;
//       const limite = Number(req.query.limite) || 6;
//       const { search } = req.query;
//       let whereCondition = {};

//       if (search) {
//         whereCondition = {
//           [Op.or]: [
//             { '$Person.name$': { [Op.like]: `%${search}%` } },
//             { '$Person.last_name$': { [Op.like]: `%${search}%` } }
//           ]
//         };
//       }

//       // Realiza el conteo de todos los usuarios que coincidan con la condición
//       const total = await Vacation.count({
//         include: [{ model: Person }],
//         where: whereCondition
//       });

//       // Obtén los usuarios con las mismas condiciones
//       const users = await User.findAll({
//         include: [{ model: Role }, { model: Person }],
//         offset: desde,
//         limit: limite,
//         where: whereCondition
//       });

//       const userToSend = users.map(user => {
//         return {
//           name: user.Person.name,
//           last_name: user.Person.last_name,
//           ci: user.Person.ci,
//           cellphone: user.Person.cellphone,
//           gender: user.Person.gender,

//           id: user.id,
//           name_role: user.Role.name,
//           end_date: user.end_date,// fecha inicio
//           entry_date: user.entry_date, // dia que tiene de vacaciones para tomar
//           email: user.email,
//           //role_id: user.Role.id,
//           state: user.state,
//         };
//       });

//       res.status(200).json({
//         ok: true,
//         total, // Incluye el total en la respuesta
//         users: userToSend
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal server error');
//     }
// };

const getVacation = async (req, res) => {
    try {
        // Obtener las vacaciones incluyendo los detalles de User y Person
        const vacations = await Vacation.findAll(
            {
            include: [
                {
                    model: User,
                    attributes: ['end_date', 'entry_date'], // Campos de User que quieres obtener
                    include: {
                        model: Person,
                        attributes: ['name', 'last_name'], // Campos de Person que quieres obtener
                    }
                }
            ]
        }
        );

        return res.status(200).json(vacations);
    } catch (error) {
        console.error('Error al obtener las vacaciones con detalles:', error);
        return res.status(500).json({ message: 'Error al obtener las vacaciones' });
    }
};

const vacationPath = (req, res = response) => {
    res.json({
        msg: 'patch API - vacationPath'
    });
};

module.exports = {
    postVacation,
    getVacation,
    vacationPath
}