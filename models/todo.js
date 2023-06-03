const mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description: {
        type:String,
        required:true,
    },
    status:{
        type:Number,
        enum:[0,1],    // Here 0 = PENDING and 1 = COMPLETED
        default:0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `User`
    },
},
{
    timestamps:true
 }
);

var Todo = mongoose.model('todo', TodoSchema);

module.exports= Todo;