const express = require('express');
const router = express.Router();
const ctrlCats = require('../controllers/cats');
var passport = require('passport');

let auth = passport.authenticate('jwt', {
  session: false
});

router.get('/', auth, ctrlCats.getCats);

router.get('/:id', auth, ctrlCats.getCat);

router.post('/', auth, ctrlCats.addCat);

router.put('/:id', auth, ctrlCats.editCat);

router.delete('/:id', auth, ctrlCats.deleteCat);

module.exports = router;