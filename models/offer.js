var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var offerSchema = Schema({
    nameEvenement: String,
    type : String,
    dateBegin: String,
    numberDay: Number,
    numberExtra: Number,
    role: String,

});

var Offer = mongoose.model('Offer', offerSchema,'offers');

// export le modèle
module.exports = Offer;



