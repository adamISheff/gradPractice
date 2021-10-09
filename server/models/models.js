const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://AdamiSheff:notcodesmith@cluster0.6koln.mongodb.net/vanillaDOMsucks?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'vanillaDOMsucks'
})
  .then(() => console.log('Connected to the vanillaDOMsucks Mongo DB...'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

// Setup user schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }]
});

// For comments set the default date on creation to be the current date
const commentSchema = new Schema({
  text: { type: String, required: true },
  date: { type: Date, default: ()=> Date.now() },
  user: { type: Schema.Types.ObjectId, ref: 'user'}
})

const sessionSchema = new Schema({
  username: { type: String, required: true },
  expires: { type: Date, required: true},
  user: { type: Schema.Types.ObjectId, ref: 'user' }
})

const User = mongoose.model('user', userSchema);
const Comment = mongoose.model('comment', commentSchema);
const Session = mongoose.model('session', sessionSchema);

module.exports = {
  User,
  Comment,
  Session
}