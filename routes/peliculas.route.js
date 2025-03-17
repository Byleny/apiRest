const { Router } = require('express');
const {
    peliculasGet,
    peliculaIdGet,
    peliculasPost,
    peliculaPut,
    peliculaDelete
} = require('../controllers/peliculas.controller');

const router = Router();

router.get('/', peliculasGet);
router.get('/:id', peliculaIdGet);
router.post('/', peliculasPost);
router.put('/:id', peliculaPut);
router.delete('/:id', peliculaDelete);

module.exports = router;
