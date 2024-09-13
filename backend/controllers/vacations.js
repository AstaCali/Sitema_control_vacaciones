const { Model, where, Op } = require('sequelize');
const Person = require('../models/person');
const User = require('../models/user');
const Vacation = require('../models/vacation');
const moment = require('moment'); // Importa moment.js para el cálculo de fechas
const dbConnection = require('../database/config');

//--FORMATEAR LA FECHA Y LA HORA--
const formatDate = (date) => {
    if (!date) return null; // Maneja el caso cuando la fecha es nula o indefinida
    return date.toISOString().split('T')[0]; // Extrae solo la parte de la fecha
};

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
    console.log('start_date',start_date);
    console.log('end_date',end_date);

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

const getVacation = async (req, res = response) => {
    try {
      const desde = Number(req.query.desde) || 0;
      const limite = Number(req.query.limite) || 6;
      const { search } = req.query;
      let whereCondition = {};
  
      // Condición de búsqueda
      if (search) {
        whereCondition = {
          [Op.or]: [
            { '$User.Person.name$': { [Op.like]: `%${search}%` } },
            { '$User.Person.last_name$': { [Op.like]: `%${search}%` } }
          ]
        };
      }
  
      // Realiza el conteo de todas las vacaciones que coincidan con la condición
      const total = await Vacation.count({
        include: [{
          model: User,
          include: [{ model: Person }]
        }],
        where: whereCondition
      });
  
      // Obtén las vacaciones con las mismas condiciones
      const vacations = await Vacation.findAll({
        include: [{
          model: User,
          include: [{ model: Person }]
        }],
        offset: desde,
        limit: limite,
        where: whereCondition
      });
  
      // Formatear los datos para enviar al cliente
      const vacationsToSend = vacations.map(vacation => {
        return {
            id: vacation.id,
        //   start_date: vacation.start_date,
        //   end_date: vacation.end_date,
            start_date: formatDate(vacation.start_date),
            end_date: formatDate(vacation.end_date),
            total_day: vacation.total_day,
            reason: vacation.reason,
            observations: vacation.observations,
          
            // Información del usuario asociado
            user_id: vacation.User.id,
            name: vacation.User.Person.name,
            last_name: vacation.User.Person.last_name,
            ci: vacation.User.Person.ci,
            cellphone: vacation.User.Person.cellphone,
            gender: vacation.User.Person.gender,
            entry_date: vacation.User.entry_date,
            email: vacation.User.email
        };
      });
  
      // Responder con el total y la lista de vacaciones
      res.status(200).json({
        ok: true,
        total, // Incluye el total en la respuesta
        vacations: vacationsToSend
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
};

//--- Listar persona de vacaciones--

const getVacationUser = async (req, res) => {
    try {
        // Obtener las vacaciones incluyendo los detalles de User y Person
        const users  = await User.findAll(
            {
            include: [
                {
                    model: Person,
                    attributes: ['name', 'last_name'] // Solo devuelve 'name' y 'last_name' de Person
                }
            ]
        });

        const userToSend = users.map(user => {
            return {
              id: user.id,
              full_name: `${user.Person.name} ${user.Person.last_name}`,
              entry_date: user.entry_date
            //   name: user.Person.name,
            };
        });

        return res.status(200).json({uservacation:userToSend});
    } catch (error) {
        console.error('Error al obtener las vacaciones con detalles:', error);
        return res.status(500).json({ message: 'Error al obtener las vacaciones' });
    }
};
//--GedByID para recuperaqr datos
const getByIDVacations = async(req, res)=>{

    try {
        const { id } = req.params;
        const vacation = await Vacation.findByPk(id, {
            include: [ 
                { model: User }
            ]
        });

        if (!vacation) {
            return res.status(404).json({ msg: 'El user no existe' });
        }

        const vacationToSend = {
            id: vacation.id,
            user_id: vacation.user_id,
            start_date: formatDate(vacation.start_date),
            end_date: formatDate(vacation.end_date),
            // start_date: vacation.start_date,
            // end_date: vacation.end_date,
            reason: vacation.reason,
            observations: vacation.observations,
            entry_date: vacation.User.entry_date,
        };

        res.json({ 
            "ok": true,
            "vacation":vacationToSend
        });
        } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor' });
        }

};

//--EDITAR USUARIO--

// const putVacations = async (req, res) => {
//     const {id} = req.params;
//     const { user_id, start_date, end_date, reason, observations } = req.body;
//     const iduser = req.id;  // id del usuario que está registrando la modificación

//     try {
//         // Verificar que la fecha de inicio y fin estén presentes
//         if (!start_date || !end_date) {
//             return res.status(400).json({ message: 'Proporciona start_date y end_date' });
//         }

//         const startDate = moment(start_date, 'YYYY-MM-DD');
//         const endDate = moment(end_date, 'YYYY-MM-DD');

//         if (startDate.isAfter(endDate)) {
//             return res.status(400).json({ message: 'start_date no puede ser posterior a end_date' });
//         }

//         const totalDays = calcularDiasLaborables(startDate, endDate);

//         // Buscar las vacaciones que se están editando
//         const vacation = await Vacation.findByPk(id);
//         if (!vacation) {
//             return res.status(404).json({ message: 'Vacaciones no encontradas' });
//         }

//         // Obtener el usuario relacionado con las vacaciones
//         const user = await User.findByPk(user_id);
//         if (!user) {
//             return res.status(404).json({ message: 'Usuario no encontrado' });
//         }

//         // 1. Recuperar los días originales del usuario
//         user.entry_date += vacation.total_day;  // Devolver los días que se descontaron originalmente
//         await user.save();  // Guardar los días restaurados

//         // 2. Verificar si el usuario tiene suficientes días de vacaciones disponibles para las nuevas fechas
//         if (user.entry_date < totalDays) {
//             return res.status(400).json({ message: 'No tienes suficientes días de vacaciones' });
//         }

//         // 3. Actualizar las vacaciones con las nuevas fechas y razón
//         vacation.user_id = user_id;
//         vacation.registration_userid = iduser
//         vacation.start_date = start_date;
//         vacation.end_date = end_date;
//         vacation.reason = reason;
//         vacation.observations = observations;

//         vacation.total_day = totalDays;
//         await vacation.save();

//         // 4. Descontar los días de vacaciones nuevamente
//         user.entry_date -= totalDays;
//         await user.save();

//         return res.status(200).json({ message: 'Vacaciones actualizadas', vacation });
//     } catch (error) {
//         console.error('Error al actualizar las vacaciones:', error);
//         return res.status(500).json({ message: 'Error al actualizar las vacaciones' });
//     }
// };

const putVacations = async (req, res) => {
    const { id } = req.params;
    const { user_id, start_date, end_date, reason, observations } = req.body;
    const iduser = req.id;  // ID del usuario que está registrando la modificación

    // Iniciar una transacción
    const t = await dbConnection.transaction();

    try {
        // Verificar que la fecha de inicio y fin estén presentes
        if (!start_date || !end_date) {
            return res.status(400).json({ message: 'Proporciona start_date y end_date' });
        }

        const startDate = moment(start_date, 'YYYY-MM-DD');
        const endDate = moment(end_date, 'YYYY-MM-DD');

        if (startDate.isAfter(endDate)) {
            return res.status(400).json({ message: 'start_date no puede ser posterior a end_date' });
        }

        const totalDays = calcularDiasLaborables(startDate, endDate);

        // Buscar las vacaciones que se están editando
        const vacation = await Vacation.findByPk(id, { transaction: t });
        if (!vacation) {
            await t.rollback();
            return res.status(404).json({ message: 'Vacaciones no encontradas' });
        }

        // Obtener el usuario relacionado con las vacaciones
        const user = await User.findByPk(user_id, { transaction: t });
        if (!user) {
            await t.rollback();
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Recuperar los días originales del usuario
        user.entry_date += vacation.total_day;  // Devolver los días descontados originalmente
        await user.save({ transaction: t });

        // Verificar si el usuario tiene suficientes días de vacaciones disponibles
        if (user.entry_date < totalDays) {
            await t.rollback();
            return res.status(400).json({ message: 'No tienes suficientes días de vacaciones' });
        }

        // Actualizar las vacaciones con las nuevas fechas y razón
        vacation.user_id = user_id;
        vacation.registration_userid = iduser;
        vacation.start_date = start_date;
        vacation.end_date = end_date;
        vacation.reason = reason;
        vacation.observations = observations;
        vacation.total_day = totalDays;
        await vacation.save({ transaction: t });

        // Descontar los días de vacaciones nuevamente
        user.entry_date -= totalDays;
        await user.save({ transaction: t });

        // Confirmar la transacción
        await t.commit();

        return res.status(200).json({ message: 'Vacaciones actualizadas', vacation });
    } catch (error) {
        // Revertir la transacción en caso de error
        await t.rollback();
        console.error('Error al actualizar las vacaciones:', error);
        return res.status(500).json({ message: 'Error al actualizar las vacaciones' });
    }
};

const deleteVacation = async(req,res)=>
{
    const { id } = req.params;  // ID de la vacación a eliminar

    // Iniciar una transacción
    const t = await dbConnection.transaction();

    try {
        // Buscar la vacación que se va a eliminar
        const vacation = await Vacation.findByPk(id);
        if (!vacation) {
            return res.status(404).json({ message: 'Vacación no encontrada' });
        }

        // Obtener el usuario relacionado con la vacación
        const user = await User.findByPk(vacation.user_id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Devolver los días de vacaciones al usuario
        user.entry_date += vacation.total_day;
        await user.save({ transaction: t });

        // Eliminar la vacación
        await vacation.destroy({ transaction: t });

        // Confirmar la transacción
        await t.commit();

        return res.status(200).json({ message: 'Vacación eliminada y días devueltos al usuario' });
    } catch (error) {
        // Revertir la transacción en caso de error
        await t.rollback();
        console.error('Error al eliminar la vacación:', error);
        return res.status(500).json({ message: 'Error al eliminar la vacación' });
    }
};

// const getVacation = async (req, res) => {
//     try {
//         // Obtener las vacaciones incluyendo los detalles de User y Person
//         const vacations = await Vacation.findAll(
//             {
//             include: [
//                 {
//                     model: User,
//                     attributes: ['end_date', 'entry_date'], // Campos de User que quieres obtener
//                     include: {
//                         model: Person,
//                         attributes: ['name', 'last_name'], // Campos de Person que quieres obtener
//                     }
//                 }
//             ]
//         }
//         );

//         return res.status(200).json(vacations);
//     } catch (error) {
//         console.error('Error al obtener las vacaciones con detalles:', error);
//         return res.status(500).json({ message: 'Error al obtener las vacaciones' });
//     }
// };

const vacationPath = (req, res = response) => {
    res.json({
        msg: 'patch API - vacationPath'
    });
};

module.exports = {
    postVacation,
    getVacation,
    getVacationUser,
    getByIDVacations,
    putVacations,
    deleteVacation,
    vacationPath
}