const { Usuario} = require("../models");
const { Heroe } = require('../models');

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
      throw new Error(`El id no existe ${id}`);
    }
  };

  const existeHeroePorId = async (id = '') => {
    const existe = await Heroe.findById(id);
    if (!existe) {
        throw new Error(`El id ${id} no existe`);
    }
};

  module.exports = {
    existeUsuarioPorId,
    existeHeroePorId
   };
  