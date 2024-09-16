
const Person = require("../models/person");
const Role = require("../models/role");
const User = require("../models/user");

const insertDefaultUser = async () => {
    try {
        // Verificar si el rol "ADMIN" ya existe
        let adminRole = await Role.findOne({ where: { name: 'ADMIN' } });
        if (!adminRole) {
            // Crear el rol 'ADMIN' si no existe
            adminRole = await Role.create({ name: 'ADMIN' });
            console.log('Rol ADMIN creado.');
        }

        let empleadoRole = await Role.findOne({ where: { name: 'EMPLEADO' } });
        if (!empleadoRole) {

            empleadoRole = await Role.create({ name: 'EMPLEADO' });
            console.log('Rol EMPLEADO creado.');
        }

        // Verificar si ya existe un usuario con el correo admin@example.com
        const adminUser = await User.findOne({ where: { email: 'admin@gmail.com' } });
        if (!adminUser) {
            // Si no existe, crear un usuario 'admin' por defecto
            const person = await Person.create({
                name: 'Admin',
                last_name: 'admin',
                ci: '1234568',
                cellphone: '785632656',
                gender: 'M'
            });

            await User.create({
                role_id: adminRole.id, 
                person_id: person.id,
                end_date: '2020-09-10',
                entry_date: 15,
                email: 'admin@gmail.com',
                password: '$2a$10$pulWXSuXgl9qHtF7fa1qN.YHOQTeaoxiQEKickAgph3wZIiB6CO/S',
                state: true
            });

            console.log('Usuario admin creado exitosamente.');
        } else {
            console.log('El usuario admin ya existe.');
        }
    } catch (error) {
        console.error('Error al insertar datos por defecto:', error);
    }
};

module.exports = {
    insertDefaultUser
}
