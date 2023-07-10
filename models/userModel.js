const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//note: users have package they belong to,

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  wallet: {
    type: Number,
    default: 0
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    nullable: true
  }],
  level: {
    type: String,
    enum: ['free','level1', 'level2', 'level3', 'level4', 'level5'],
    default: 'free',
    required: true

  },
  //states
  location: {
    type: String,
    required: true
  },
  roles: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
},
  { timestamps: true }
);

// Hash the password before saving to the database
UserSchema.pre('save', async function(next){
  try{
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
  }catch(error){
      next(error);
  }
})
UserSchema.methods.isPasswordMatched = async function(password){
  try{
      return await bcrypt.compare(password, this.password);
  }catch(error){
      throw new Error(error);
  }
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
