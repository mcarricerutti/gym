const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
    },
  telefono: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  membresia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  },
);

module.exports = User;

User.sync({ force: false }) // If force is true, each time the app runs it will drop the table and recreate it. Be careful with this in production!
  .then(() => {
    console.log('User table created successfully.');
  })
  .catch(error => {
    console.error('An error occurred while creating the table:', error);
  });