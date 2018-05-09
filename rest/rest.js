
//Call the depedencies: modules, models and other
var express = require('express');
var router = express.Router();

var Candidacy = require('../models/candidacy');
var Extra = require('../models/extra');
var Offer = require('../models/offer');
var objectId = require('mongoose').Types.ObjectId;

router.get('/', function (req, res, next) {
    res.send('Hi ApiRest , Choose roads : /offer or  /extra or /candidacy');
});



router.get('/checking/:email', function (req, res, next) {
    Extra.find({}, { key: 1 }, function (err, extras) {
        if (err) throw err;
        res.json(extras);
    });
});


//Return email
router.get('email/:email', function (req, res, next) {
    Extra.find(
        { email: req.params.email },
        function (err, extras) {
            if (err) throw err;
            liste1 = res.json(extras);
            

        });
});



//Get road to return all Json file (offer & extras with agregation)
router.get('/key/:key', function (req, res, next) {

    Offer.aggregate([
        {
            $lookup: {
                from: "extras",
                localField: "_id",
                foreignField: "key",
                as: "offers"
            }
        }
    ]).exec(function (err, currentextras) {
        if (err) throw err;
    });
    Offer.find({}, function (err, currentoffers) {
        if (err) {
            throw err;
        }
        liste = res.json(currentoffers);

    });
});



// 1: Return the collection offer in a  Json format
router.get('/offer/', function (req, res, next) {
    Offer.find({}, function (err, offers) {
        if (err) throw err;
        res.json(offers);
    });
});


//Return the number of offers in a Json format
router.get('/offer/:number', function (req, res, next) {

    Offer.find({}, function (err, offers) {
        if (err) throw err;
        if (req.params.number == 0) {
            res.json(offers[0]);
        }
        else {
            res.json(offers.splice(0, req.params.number));
        }
    });
});

// 2 : Return the collection extra in a  Json format
router.get('/extra/', function (req, res, next) {
    Extra.find({}, function (err, extras) {
        if (err) throw err;
        res.json(extras);
    })
});

//1 + 2 :  Return the collection candidacy which is the result of aggregations between the two collections (extra +offer)
router.get('/candidacy', function (req, res, next) {
    Candidacy.find({}, function (err, candidacys) {
        if (err) throw err;
        res.json(candidacys);
    });
});

//Save a new candidacy and return this in a json format
router.post('/candidacy', function (req, res, next) {
    var candidacy = new Candidacy({
        etat: req.body.etat,
        idOffer: req.body.idOffer,
        idExtra: req.body.idExtra
    });
    candidacy.save(function (err) {
        if (err) throw err;
        res.json(candidacy);
    });
});

// Return on candidacy with the ID an extra in parameter
router.get('/candidacy/:idExtra', function (req, res, next) {
    Candidacy.findById({idExtra }, function (err, listCandidacy) {});
    if (err) return res.status(500).send(err)
    return res.status(500).send(listCandidacy)

    });
module.exports = router;