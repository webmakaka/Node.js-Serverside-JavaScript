const express = require('express');
const router = express.Router();
const ctrlCats = require('../controllers/cats');

router.get('/', ctrlCats.getCats);

router.get('/:id', ctrlCats.getCat);

router.post('/', ctrlCats.addCat);

router.put('/:id', ctrlCats.editCat);

router.delete('/:id', ctrlCats.deleteCat);

module.exports = router;