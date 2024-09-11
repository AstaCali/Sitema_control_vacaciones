const { DataTypes } = require('sequelize');
const dbConnection = require('../database/config');
const User = require('./user'); // Importa el modelo User

const Vacation = dbConnection.define(
    "Vacation", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User, // Referencia al modelo User
                key: 'id'
            }
        },
        registration_userid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        total_day: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: false
        },
        observations: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }
);

// Define the association after both models are defined
Vacation.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Vacation;