var mongoose = require('mongoose')

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser: true
}

mongoose.connect('mongodb+srv://marina:nini@cluster0.iaqfd.mongodb.net/morningnews?retryWrites=true&w=majority',
options,
function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info(' Chui connectée bébew (งツ)ว  ');
    }
   }
)

module.exports = mongoose