var mongoose     = require('mongoose'),
    Schema       = mongoose.Schema,
    Fish         = require('./fish'),
    bcrypt       = require('bcrypt-nodejs');

//||||||||||||||||||||||||||--
// CREATE USER SCHEMA
//||||||||||||||||||||||||||--
var UserSchema   = new Schema({
  name:        { type: String, required: true },
  phoneNumber: {
                 type: String,
                 required: true,
                 index: { unique: true },
                 minlength: 7,
                 maxlength: 10
  },
  password:    { type: String, required: true, select: false }
});

// exclude password
UserSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    return ret;
  }
});

// hash the password before the user is saved
UserSchema.pre('save', function(next) {
  var user = this;

  // hash the password only if the password has been changed or user is new
  if (!user.isModified('password')) return next();

  // generate the hash
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err);

    // change the password to the hashed version
    user.password = hash;
    next();
  });
});

// method to compare a given password with the database hash
UserSchema.methods.comparePassword = function(password) {
  var user = this;

  return bcrypt.compareSync(password, user.password);
};

// Access user's fishes
UserSchema.methods.fishes = function(callback) {
  mongoose.model('Fish').find({user: this._id}, function(err, fishes) {
    callback(err, fishes);
  });
};

module.exports = mongoose.model('User', UserSchema);
