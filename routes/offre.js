var express = require('express');
var router = express.Router();
var Offre = require('../models/offer');







// Affichage de la liste des offre dans un tableau Offre vers la vue offre.pug
router.get('/', function(req, res, next) {
  Offre.find((err, listOffre) => {    
    if (err) return res.status(500).send(err)
    res.render('offre', { title: 'Liste des offres', Offre: listOffre });
  });
});



//Simple rendue vers la vue ajoutOffre.pug contentant le formulaire d'ajout d'offre
router.get('/formAjoutOffre', function(req, res, next) {
  res.render('ajoutOffre', { title: 'Liste des Offres' });
}); 


//Création d'un nouvelle objet du modele offer (utilisation du modele offer par la variable Offre) en lui passant les donnés du formulaire d'ajout récuperer par post
router.post('/ajoutOffre', function(req, res, next) {
var newOffre = new Offre(req.body);  
  newOffre.nameEvenement = req.body.nameEvenement;
  newOffre.type = req.body.type;
  newOffre.dateBegin = req.body.dateBegin;
  newOffre.numberDay = req.body.numberDay;
  newOffre.numberExtra = req.body.numberExtra;
  newOffre.role = req.body.role;

newOffre.save(err => {  
      if (err) return res.status(500).send(err);
      res.redirect('/offre')
});
});


// Suppresion d'une candidature selon son id passer en paramettre
router.get('/delete/:id', function(req, res, next) {
  Offre.findByIdAndRemove(req.params.id,(err, offer) => {
      if (err) return res.status(500).send(err);
      res.redirect('/candidacy/delete/'+req.params.id)
  }
)
});


module.exports = router;
