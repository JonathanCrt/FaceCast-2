var express = require('express');
var router = express.Router();
var Extra = require('../models/extra');







// Affichage de la liste des figurant dans un tableau Extra vers la vue extra.pug
router.get('/', function(req, res, next) {
    Extra.find((err, listExtra) => {    
    if (err) return res.status(500).send(err)
    res.render('extra', { title: 'Liste des figurant', Extra: listExtra });
    });
});


module.exports = router;
