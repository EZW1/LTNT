const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const MONGO_URI = 'mongodb+srv://ericCodesmith:CL082I9tVMkU5bY5@cluster0.grozs.mongodb.net/LTNT?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'LTNT'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

// sets a schema for the 'users' collection
const userSchema = new Schema({
  username: {type: String, require: true, unique: true},
  password: {type: String, require: true},
  friends: [{
    name: String
  }]
});

userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  })
})

userSchema.methods.comparePassword = function(candidatePassword, next) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return next(err);
    next(null, isMatch);
  });
};

// creats a model for the 'species' collection that will be part of the export
const User = mongoose.model('user', userSchema);

// exports all the models in an object to be used in the controller
module.exports = {
  User,
};

// sets a schema for the 'people' collection
// const personSchema = new Schema({
  // name: {type: String, required: true},
  // mass: String,
  // hair_color: String,
  // skin_color: String,
  // eye_color: String,
  // birth_year: String,
  // gender: String,
  // species: String,
  // species_id: {
  //   // type of ObjectId makes this behave like a foreign key referencing the 'species' collection
  //   type: Schema.Types.ObjectId,
  //   ref: 'species'
  // },
  // homeworld: String,
  // homeworld_id: {
  //   // type of ObjectId makes this behave like a foreign key referencing the 'planet' collection
  //   type: Schema.Types.ObjectId,
  //   ref: 'planet'
  // },
  // height: Number,
  // films: [{title: String, id: { 
  //   type: Schema.Types.ObjectId, 
  //   ref: 'film'
  // }}]
// });


