const mongoose =require('mongoose')


const taskSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    due_date:{
        type:String,
        required:true
    }

})

const tasks=new mongoose.model("tasks",taskSchema)
module.exports=tasks