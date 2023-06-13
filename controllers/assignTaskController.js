const assignedtasks = require('../models/assignedTaskSchema')
const Users=require('../models/userSchema')

exports.assigntask = async (req, res) => {
    const { id, fromemail, toemail, title, description, due_date } = req.body

    try {
        const user = await Users.findOne({ email:toemail })
        if (user) {
            const taskid = await assignedtasks.findOne({ id:id })
            if (taskid) { 
                res.status(401).json("Task id must be unique")
            }
            else {
                const currentDate = new Date()
                const dateString = currentDate.toLocaleDateString();
                const dateComponents = dateString.split('/');
                const formattedDate = `${dateComponents[2]}-0${dateComponents[1]}-${dateComponents[0]}`
                if (formattedDate >= due_date) {
                    res.status(401).json("please select a proper date")
                }
                else {
                    const newTask = new assignedtasks({
                        id,
                        fromemail,
                        toemail,
                        title,
                        description,
                        status: 'pending',
                        due_date
                    })
                    await newTask.save()
                    res.status(200).json("Task assigned successsfully")
                }
            }
        }
        else {
            res.status(404).json("User not found")
        }
    }
    catch (error) {
        res.status(401).json(error)
    }
}


exports.getassignedtask=async(req,res)=>{
    const { email } = req.params
    try{
        const allTasks = await assignedtasks.find({ toemail:email })
        if (allTasks) {
            res.status(200).json(allTasks)
        }
        else {
            res.status(404).json("Empty task")
        }
    }
    catch (error) {
        res.status(401).json(error)
    }
}

exports.markComplete = async (req, res) => {
    // const {status}=req.body
    const { id, email } = req.params
    try {
        const task = await assignedtasks.findOne({ id:id, toemail:email })
        if (task) {
            task.status = 'completed'
            await task.save()
            res.status(200).json("Task status changed to completed")
        }
        else {
            res.status(404).json("Task not found")
        }

    }
    catch (error) {
        res.status(401).json(error)
    }
}