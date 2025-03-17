const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MySqlConnection');
const { Heroes } = require('./mySqlHeroes');
const { Peliculas } = require('./mySqlPeliculas');

const Protagonistas = bdmysql.define('protagonistas', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    rol: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    anio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    actor: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    escenas_destacadas: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});


Protagonistas.belongsTo(Heroes, { foreignKey: 'idheroe', as: 'heroe' });
Protagonistas.belongsTo(Peliculas, { foreignKey: 'idpelicula', as: 'pelicula' });

module.exports = { Protagonistas };
