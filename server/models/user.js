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


// hash before saving to database
User.pre('save', function(next) {
  var user = this;

  // only hash if the password is new or modified
  if (!user.isModified('password')) return next();

  // generate salt
  bcrypt.genSalt(config.SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password along with the salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // overwrite the plain-text password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// verify for plain-text and hashed passwords
User.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('users', User);
