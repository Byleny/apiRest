const { response, request } = require('express');
const { Protagonistas } = require('../models/mySqlProtagonistas');
const { Heroes } = require('../models/mySqlHeroes');
const { Peliculas } = require('../models/mySqlPeliculas');
const { bdmysql } = require('../database/MySqlConnection');

const protagonistasGet = async (req, res = response) => {
    try {
        const protagonistas = await Protagonistas.findAll({
            attributes: ['id', 'rol', 'anio', 'actor', 'escenas_destacadas'], 
            include: [
                { 
                    model: Heroes, 
                    as: 'heroe', 
                    attributes: ['nombre', 'bio', 'casa']
                },
                { 
                    model: Peliculas, 
                    as: 'pelicula', 
                    attributes: ['nombre', 'anio']
                }
            ]
        });

        res.json({
            ok: true,
            data: protagonistas
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Error al obtener protagonistas', err: error });
    }
};



const protagonistaIdGet = async (req, res = response) => {
    const { id } = req.params;

    try {
        const protagonista = await Protagonistas.findByPk(id, {
            include: [
                { model: Heroes, attributes: ['id', 'nombre'] },
                { model: Peliculas, attributes: ['id', 'nombre'] }
            ]
        });

        if (!protagonista) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un protagonista con el id: ' + id
            });
        }

        res.json({
            ok: true,
            data: protagonista
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        });
    }
};

const protagonistasPost = async (req, res = response) => {
    try {
        console.log(req.body);
        const { idheroe, idpelicula } = req.body;

        // Validar que el héroe exista
        const heroe = await Heroes.findByPk(idheroe);
        if (!heroe) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un héroe con ID: ' + idheroe
            });
        }

        // Validar que la película exista
        const pelicula = await Peliculas.findByPk(idpelicula);
        if (!pelicula) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe una película con ID: ' + idpelicula
            });
        }

        //Verificar si la relación ya existe
        const existeRelacion = await Protagonistas.findOne({
            where: { idheroe, idpelicula }
        });

        if (existeRelacion) {
            return res.status(400).json({
                ok: false,
                msg: 'Este héroe ya es protagonista de esta película'
            });
        }

        //  Crear la relación en `protagonistas`
        const nuevoProtagonista = await Protagonistas.create({ idheroe, idpelicula });

        res.json({
            ok: true,
            mensaje: 'Protagonista Creado',
            data: nuevoProtagonista
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        });
    }
};

const protagonistaPut = async (req, res = response) => {
    const { id } = req.params;
    const { idheroe, idpelicula } = req.body;

    try {
        const protagonista = await Protagonistas.findByPk(id);

        if (!protagonista) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un protagonista con el id: ' + id
            });
        }

        // Validar que el nuevo héroe exista
        if (idheroe) {
            const heroe = await Heroes.findByPk(idheroe);
            if (!heroe) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No existe un héroe con ID: ' + idheroe
                });
            }
        }

        //  Validar que la nueva película exista
        if (idpelicula) {
            const pelicula = await Peliculas.findByPk(idpelicula);
            if (!pelicula) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No existe una película con ID: ' + idpelicula
                });
            }
        }

        // Actualizar los datos del protagonista
        await protagonista.update({ idheroe, idpelicula });

        res.json({
            ok: true,
            msg: 'Protagonista actualizado',
            data: protagonista
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        });
    }
};

const protagonistaDelete = async (req, res = response) => {
    const { id } = req.params;

    try {
        const protagonista = await Protagonistas.findByPk(id);

        if (!protagonista) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un protagonista con el id: ' + id
            });
        }

        await protagonista.destroy();

        res.json({
            ok: true,
            msj: "Protagonista Borrado..",
            data: protagonista
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        });
    }
};

module.exports = {
    protagonistasGet,
    protagonistaIdGet,
    protagonistasPost,
    protagonistaPut,
    protagonistaDelete
};
