var express = require('express');
var router = express.Router();
var moment = require('moment');
var jwt = require('jwt-simple');

var config = require('../../_config');
var User = require('../models/user.js');
var Message = require('../models/message.js');


// *** login required *** //
function ensureAuthenticated(req, res, next) {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).send({
      message: 'You did not provide a JSON Web Token in the authorization header.'
    });
  }

  // decode the token
  var header = req.headers.authorization.split(' ');
  var token = header[1];
  var payload = jwt.decode(token, config.TOKEN_SECRET);
  var now = moment().unix();

  // check if the token has expired
  if (now > payload.exp) {
    return res.status(401).send({
      message: 'Token has expired. '
    });
  }

  // check if the user still exists in the db
  User.findById(payload.sub, function(err, user) {
    if (!user) {
      return res.status(400).send({
        message: 'User no longer exists.'
      });
    }
    req.user = user;
    next();
  });
}

// *** generate token *** //
function createToken(user) {
  var payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user._id
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

// *** register route *** //
router.post('/signup', function(req, res) {
  User.findOne({email: req.body.email}, function(err, existingUser) {
    if (existingUser) {
      return res.status(409).send({
        message: 'Email is already taken'
      });
    }
    var user = new User({
      email: req.body.email,
      password: req.body.password
    });
    user.save(function() {
      var token = createToken(user);
      res.send({
        token: token,
        user: user
      });
    });
  });
});

// *** login route *** //
router.post('/login', function(req, res) {
  User.findOne({email: req.body.email}, '+password', function(err, user) {
    if (!user) {
      return res.status(401).send({
        message: {
          email: 'Incorrect email'
        }
      });
    }
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({
          message: 'Wrong email address and/or password'
        });
      }
      user = user.toObject();
      delete user.password;
      var token = createToken(user);
      res.send({
        token: token,
        user: user
      });
    });
  });
});

// *** update user route *** //
router.put('/update', ensureAuthenticated, function(req, res) {
  User.findOne({_id: req.user.id}, function(err, user) { //req.user.id pulls from the token rather than the request
    if (!user) {
      return res.status(401).send({
        message: {
          email: 'Incorrect email'
        }
      });
    }
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.email = req.body.email;
    user.username = req.body.username;
    user.sexuality = req.body.sexuality;
    user.gender = req.body.gender;
    user.image = req.body.image;
    user.age = req.body.age;
    user.image = req.body.image;
    user.pronoun_obj = req.body.pronoun_obj;
    user.pronoun_sub = req.body.pronoun_sub;
    user.pronoun_self = req.body.pronoun_self;
    user.movie = req.body.movie;
    user.book = req.body.book;
    user.music = req.body.music;
    user.tv = req.body.tv;
    user.game = req.body.game;
    user.bio = req.body.bio;
    user.height = req.body.height;
    user.build = req.body.build;
    user.ethnicity = req.body.ethnicity;
    user.astrology = req.body.astrology;
    user.religion = req.body.religion;
    user.income = req.body.income;
    user.looking = req.body.looking;
    user.save(function() {
      res.send(user);
    });
  });
});

router.get('/users', ensureAuthenticated, function(req, res){ //pass through restrictions here to keep some straight dickhole from accessing my precious queer users...can use req.user to do filtering as defined in this
  User.find({}, function(err, users){
    res.json({ users: users })
  });
});

router.get('/users/:id/messages', ensureAuthenticated, function(req, res){
  Message.find( {$or : [{'messageFrom': req.user.id,'messageTo': req.params.id},{'messageFrom': req.params.id,'messageTo': req.user.id}]}, function(err, messages){
    res.json({ messages: messages })
  });
});

module.exports = router;
