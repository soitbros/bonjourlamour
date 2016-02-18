var express = require('express');
var router = express.Router();
var moment = require('moment');
var jwt = require('jwt-simple');

var config = require('../../_config');
var User = require('../models/user.js');
var Message = require('../models/message.js');


function ensureAuthenticated(req, res, next) {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).send({
      message: 'You did not provide a JSON Web Token in the authorization header.'
    });
  }

  var header = req.headers.authorization.split(' ');
  var token = header[1];
  var payload = jwt.decode(token, config.TOKEN_SECRET);
  var now = moment().unix();

  if (now > payload.exp) {
    return res.status(401).send({
      message: 'Token has expired. '
    });
  }

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

function createToken(user) {
  var payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user._id
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

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

router.put('/update', ensureAuthenticated, function(req, res) {
  User.findOne({_id: req.user.id}, function(err, user) {
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
    user.looking = req.body.looking;
    user.pronoun_obj = req.body.pronoun_obj;
    user.pronoun_sub = req.body.pronoun_sub;
    user.pronoun_self = req.body.pronoun_self;
    user.bio = req.body.bio;
    user.movie = req.body.movie;
    user.book = req.body.book;
    user.music = req.body.music;
    user.tv = req.body.tv;
    user.game = req.body.game;
    user.height = req.body.height;
    user.build = req.body.build;
    user.ethnicity = req.body.ethnicity;
    user.astrology = req.body.astrology;
    user.religion = req.body.religion;
    user.income = req.body.income;
    user.save(function() {
      res.send(user);
    });
  });
});

router.get('/users', ensureAuthenticated, function(req, res){ //pass through restrictions here...can use req.user to do filtering as defined in this
  User.find({}, function(err, users){
    res.json({ users: users })
  });
});

router.put('/messages', ensureAuthenticated, function(req, res) {
  req.body.messageFrom = req.user.id;
  Message.create(req.body, function(err, user) {
    if (!user) {
      return res.status(401).send({
        message: {
          email: 'Incorrect email'
        }
      });
    }
  });
});

router.get('/messages', ensureAuthenticated, function(req, res){
  console.log(req);
  Message.find( {$or : [{'messageFrom': req.user.id},{'messageTo': req.user.id}]}, function(err, messages){
    res.json({ messages: messages })
  });
});

router.get('/users/:id/messages', ensureAuthenticated, function(req, res){
  console.log(req);
  Message.find( {$or : [{'messageFrom': req.user.id,'messageTo': req.params.id},{'messageFrom': req.params.id,'messageTo': req.user.id}]}, function(err, messages){
    res.json({ messages: messages })
  });
});

module.exports = router;
