const mongoose =require('mongoose')


const assignedTaskSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    fromemail:{
        type:String,
        required:true
    },
    toemail:{
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

const assignedtasks=new mongoose.model("assignedtasks",assignedTaskSchema)
module.exports=assignedtasks