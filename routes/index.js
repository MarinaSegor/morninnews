var express = require('express');
var router = express.Router();
var uid2 = require("uid2");
var bcrypt= require("bcrypt");
var usersModel = require('../models/users')


// POST sign up
router.post('/sign-up', async function(req, res, next){

  var error = []
  var result = false
  var userSave = null
  //  générez le hash via bcrypt:
  var hashPass = bcrypt.hashSync(req.body.passwordFromFront, 10);
console.log("HASH====>>", hashPass)
  const email = await usersModel.findOne({
    email: req.body.emailFromFront
  })
  
  if(email != null){
    error.push('Utilisateur déjà existant')
  }

  if(req.body.usernameFromFront == ''
  || req.body.emailFromFront == ''
  || req.body.passwordFromFront == ''
  ){
    error.push('Veuillez renseigner les informations demandées')
  }

  if(error.length == 0){

console.log("req", req.body)
  var newUser = new usersModel({
    username: req.body.usernameFromFront,
    email: req.body.emailFromFront,
    // Modifiez la requête pour prendre en compte l’enregistrement du mot de passe désormais chiffré:
    password: hashPass,
    // 2.token: Positionnez-vous sur route du Signup et modifiez la requête pour ajouter la nouvelle propriété qui sera initialisée avec un id généré grâce au module uid2
    token: uid2(32),
  })
  userSave = await newUser.save()
}
  

  if(userSave){
    result = true
  }

  // modifiez la réponse de la route signup pour envoyer la valeur du token
  res.json({result, userSave, error, token})
})

router.post('/sign-in', async function(req,res){
  
  var result = false
  var error = []
  var user = null

  if(req.body.emailFromFront == ''
  || req.body.passwordFromFront == ''
  ){
    error.push('Veuillez renseigner les informations demandées')
  }

  if(error.length == 0){

  
    const user = await usersModel.findOne({
      email: req.body.emailFromFront,
      
    })

    if(user){
      if(bcrypt.compareSync(req.body.passwordFromFront, user.password)){
        result = true
        token = user.token;
      } else {
        result = false
        error.push('mot de passe incorrect')
      }
     } else {
      error.push('email incorrect')
     }

  }

  res.json({result, user, error, token})
})


module.exports = router;
