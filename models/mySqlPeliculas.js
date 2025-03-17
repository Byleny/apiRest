const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MySqlConnection');

const Peliculas = bdmysql.define('peliculas', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(250),
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = { Peliculas };
