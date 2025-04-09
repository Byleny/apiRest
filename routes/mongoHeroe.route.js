const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { existeHeroePorId } = require('../helpers/db-validators');

const {
    heroesGet,
    heroeGetById,
    heroePost,
    heroePut,
    heroeDelete
} = require('../controllers/mongoHeroe.controller');

const router = Router();

// Obtener todos los héroes
router.get('/', [
    validarJWT,
    validarCampos
], heroesGet);

// Obtener un héroe por ID
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeHeroePorId),
    validarCampos
], heroeGetById);

// Crear un nuevo héroe
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('bio', 'La biografía es obligatoria').not().isEmpty(),
    check('img', 'La imagen es obligatoria').not().isEmpty(),
    check('aparicion', 'La fecha de aparición es obligatoria').not().isEmpty(),
    check('rol', 'El rol es obligatorio').not().isEmpty(),
    check('casa', 'La casa es obligatoria').not().isEmpty(),
    validarCampos
], heroePost);

// Actualizar un héroe
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeHeroePorId),
    validarCampos
], heroePut);

// Eliminar un héroe
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeHeroePorId),
    validarCampos
], heroeDelete);

module.exports = router;
