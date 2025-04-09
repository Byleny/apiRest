const { response, request } = require("express");
const { isValidObjectId } = require("mongoose");
const { Heroe } = require("../models");

// Crear un nuevo héroe
const heroePost = async (req, res = response) => {
    const { nombre, bio, img, aparicion, rol, casa } = req.body;

    // Validación básica de campos obligatorios
    if (!nombre || !bio || !img || !aparicion || !rol || !casa) {
        return res.status(400).json({
            ok: false,
            msg: "Todos los campos son obligatorios: nombre, bio, img, aparicion, rol, casa"
        });
    }

    try {
        // Validación: verificar si ya existe un héroe con el mismo nombre
        const existeHeroe = await Heroe.findOne({ nombre });
        if (existeHeroe) {
            return res.status(400).json({
                ok: false,
                msg: `Ya existe un héroe con el nombre: ${nombre}`
            });
        }

        const heroe = new Heroe({ nombre, bio, img, aparicion, rol, casa });
        await heroe.save();

        res.status(201).json({
            ok: true,
            msg: "Héroe creado correctamente",
            heroe
        });
    } catch (error) {
        console.error("Error al crear héroe:", error);
        res.status(500).json({ ok: false, msg: "Error interno al crear héroe" });
    }
};

// Obtener todos los héroes
const heroesGet = async (req, res = response) => {
    try {
        const heroes = await Heroe.find();
        res.json({ ok: true, heroes });
    } catch (error) {
        console.error("Error al obtener los héroes:", error);
        res.status(500).json({ ok: false, msg: "Error interno al obtener los héroes" });
    }
};

// Obtener un héroe por ID
const heroeGetById = async (req, res = response) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ ok: false, msg: "ID de héroe inválido" });
    }

    try {
        const heroe = await Heroe.findById(id);
        if (!heroe) {
            return res.status(404).json({ ok: false, msg: "Héroe no encontrado" });
        }

        res.json({ ok: true, heroe });
    } catch (error) {
        console.error("Error al obtener héroe:", error);
        res.status(500).json({ ok: false, msg: "Error interno al obtener héroe" });
    }
};

// Actualizar héroe
const heroePut = async (req, res = response) => {
    const { id } = req.params;
    const datos = req.body;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ ok: false, msg: "ID de héroe inválido" });
    }

    try {
        const heroe = await Heroe.findById(id);
        if (!heroe) {
            return res.status(404).json({ ok: false, msg: "Héroe no encontrado" });
        }

        const actualizado = await Heroe.findByIdAndUpdate(id, datos, { new: true });
        res.json({ ok: true, msg: "Héroe actualizado", heroe: actualizado });
    } catch (error) {
        console.error("Error al actualizar héroe:", error);
        res.status(500).json({ ok: false, msg: "Error interno al actualizar héroe" });
    }
};

// Eliminar héroe
const heroeDelete = async (req, res = response) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ ok: false, msg: "ID de héroe inválido" });
    }

    try {
        const heroe = await Heroe.findById(id);
        if (!heroe) {
            return res.status(404).json({ ok: false, msg: "Héroe no encontrado" });
        }

        await Heroe.findByIdAndDelete(id);
        res.json({ ok: true, msg: "Héroe eliminado correctamente", heroe });
    } catch (error) {
        console.error("Error al eliminar héroe:", error);
        res.status(500).json({ ok: false, msg: "Error interno al eliminar héroe" });
    }
};

module.exports = {
    heroePost,
    heroesGet,
    heroeGetById,
    heroePut,
    heroeDelete
};
