var express = require('express');
var router = express.Router();
var Candidacy = require('../models/candidacy');





// récupération des paramettre passer a la méthode et renvoyer vers  la vue du formulaire de modification  updateCandidacy.pug
router.get('/formUpdate/:id/:etat', function(req, res, next) {
    res.render('updateCandidacy', {id: req.params.id, etat: req.params.etat});
  }); 




// Modification de l'état d'une candidature selon son id passer par la méthode GET 
router.get('/update/', function(req, res, next) {
  Candidacy.findByIdAndUpdate(req.query.id,{etat : req.query.etat},
  (err, candidacy) => {
      if (err) return res.status(500).send(err);
      res.redirect('/candidacy')
  }
)
});


// Suppresion d'une candidature selon l'id de l'offre passer en paramettre
router.get('/delete/:id', function(req, res, next) {
  Candidacy.deleteMany({idOffer: req.params.id }, function (err) {});
      res.redirect('/candidacy')
});






// Liasion entre les modeles candidacy et offer / candidacy et extra   (objet extra et offer dans l'objet candicacy)
router.get('/', function(req, res, next) {
  Candidacy.aggregate([
    {
      $lookup: {
        from: "offers",
        localField: "idOffer",
        foreignField: "_id",
        as: "offer"
      }
    },
    {
      $lookup: {
        from: "extras",
        localField: "idExtra",
        foreignField: "_id",
        as: "extra"
      }
    }
  ]).exec(function (err, listCandidacy) {
    if (err) throw err;
    res.render('candidacy', { Candidacy: listCandidacy });
  });
});


module.exports = router;
