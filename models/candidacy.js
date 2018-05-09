var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var candidacySchema = Schema ({
    etat : {type : String , default: 'en attente'},
    extra :{type:Schema.Types.ObjectId, ref : 'extras'},
    offer :{type:Schema.Types.ObjectId, ref : 'offers'}
});


var Candidacy = mongoose.model('Candidacy', candidacySchema,'candidacys');


// export le modèle
module.exports = Candidacy;

