const { Schema, model } = require('mongoose');

const HeroeSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true,
    trim: true
  },
  bio: {
    type: String,
    required: [true, 'La biografía es obligatoria']
  },
  img: {
    type: String,
    required: [true, 'La URL de la imagen es obligatoria']
  },
  aparicion: {
    type: Date,
    required: [true, 'La fecha de aparición es obligatoria']
  },
  rol: {
    type: String,
    required: [true, 'El rol es obligatorio']
  },
  casa: {
    type: String,
    required: [true, 'La casa es obligatoria'],
    enum: ['Marvel', 'DC']
  },
  fecha_creacion: {
    type: Date,
    default: Date.now
  },
  fecha_actualizacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = model('Heroe', HeroeSchema);
