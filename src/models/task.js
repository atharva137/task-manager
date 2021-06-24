const mongoose = require('mongoose');
const tasks = mongoose.model('Task',{
    description:{
        type:String,
        required:true,
        trim:true,
    },
    completed:{
      type :Boolean,
      required: false,
      default:false,
    }
})

module.exports =tasks;