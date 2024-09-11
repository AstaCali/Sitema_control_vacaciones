const express = require('express');
const cors = require('cors');

const dbConnection  = require('../database/config');
const User = require('./user');
const Role = require('./role');

//-------------TratamienPo--
const Person = require('./person');
const Vacation = require('./vacation');
// const Treatment = require('./treatment');

const newUser = {
    email: 'admin@example.com',
    password: 'admin123',
    role_id: 1,// La ID del rol correspondiente
    //name: 'admin',
    person_id: 1,
    state: true
};
const newRol = {
    name: 'admin',
};
const newPerson = {
    name: 'Ronal',
    last_name: 'Calisaya',
    ci: 2589634,
    celular: 78945618,
    gender: 'M',
};
class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/users';
        this.authPath     = '/api/auth';
        this.rolesPath     = '/api/roles';
        this.personPath     = '/api/persons';
        this.vacationPath  = '/api/vacations';
        // this.treatmentPath = '/api/treatments';

        //----------------------------------------

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();
        this.app.use('/img', express.static('img'));
        // Rutas de mi aplicación
        this.routes();
    }

    // async conectarDB() {
    //     await dbConnection();
    // }

    async conectarDB(){
        try {
            await dbConnection.authenticate();
            // await dbConnection.sync();// para crear nuevos tablas general
            //await dbConnection.sync(Vacation);// para crear nuevos tablas solas
            //await Role.create(TipoCita);
            console.log("conectado a la base de datos");
        } catch (error) {
            throw new Error(error);
        }
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // this.app.use(cors({
        // origin: 'http://localhost:4200'
        // }));
        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        
        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.usuariosPath, require('../routes/users'));
        this.app.use( this.rolesPath, require('../routes/roles'));
        this.app.use( this.personPath, require('../routes/persons'));
        this.app.use( this.vacationPath, require('../routes/vacations'));
        // this.app.use( this.dentistPath, require('../routes/dentists'));
        //-----------------------------------------------------------
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;
