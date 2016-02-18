var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var config = require('../../_config');


var User = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  username: { type: String, unique: true, lowercase: true, default: '' },
  sexuality: { type: String, lowercase: true },
  gender: { type: String, lowercase: true },
  pronoun_obj: { type: String, lowercase: true },
  pronoun_sub: { type: String, lowercase: true },
  pronoun_self: { type: String, lowercase: true },
  movie: { type: String },
  book: { type: String },
  music: { type: String },
  tv: { type: String },
  game: { type: String },
  bio: { type: String },
  image: { type: String },
  height: { type: Number },
  build: { type: String },
  ethnicity: { type: String},
  age: { type: String },
  astrology: { type: String },
  religion: { type: String },
  income: { type: String },
  looking: { type: String }
}, {timestamps: true });


User.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(config.SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

User.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('users', User);
