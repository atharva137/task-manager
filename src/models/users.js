const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator'); 

const userSchema = new  mongoose.Schema( {
  name: {
    type: String,
    required: true,
    trim: true
},
  email: {
     type: String,
     required: true,
     unique: true,
     trim: true,
     lowercase: true,
     validate(value){
          if(!validator.isEmail(value)){
              throw new Error('Invalid email')
          }
     }
  },

  age: {
    type: Number,

    validate(value){
        if(value<0){
           throw new Error('Age must be positive')
        }
    }
    
  },
  tokens:[{
     token:{type: String,
      requird: true} 
  }],
  password: {
    type:String,
    required: true,
    trim:true,
    minlength:7,
    validate:function(value){
      if(value.toLowerCase().includes('password')){
        throw new Error('passowrd conatians password');
      }
    }
  }
})

userSchema.methods.generateAuthToken = async function (){
 const user = this;
 const token = jwt.sign({_id: user._id.toString()},'thismyfirstapp')
  user.tokens = user.tokens.concat({token:token});
  await user.save();
 return token;
}

userSchema.statics.findByCredentials = async (email, password) =>{

  console.log('testing schema');
  const user = await User.findOne({email:email});
  
   if(!user){
    throw new Error('unable to login');
  }
   const isMatch =  await  bcrypt.compare(password,user.password);
   if(!isMatch){
      throw new Error('unalbe to login');
   }
   return user;
}

userSchema.pre('save', async function (next){
   const user = this;
     if(user.isModified('password')){
       user.password = await bcrypt.hash(user.password,8);
     }
   next();
})

//setting up a model || adding a collection name User
const User = mongoose.model("User",userSchema);




module.exports = User;