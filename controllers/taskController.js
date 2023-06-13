const tasks = require('../models/taskSchema')
const Users = require('../models/userSchema')


exports.getallTask = async (req, res) => {
    const { email } = req.params

    try {
        const allTasks = await tasks.find({ email })
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


exports.addTask = async (req, res) => {
    const { id, email, title, description, due_date } = req.body
    try {
        const user = await Users.findOne({ email })
        if (user) {
            const taskid = await tasks.findOne({ id })
            if (taskid) {
                res.status(401).json("Task id must be unique")
            }
            else {
                const currentDate = new Date()
                const dateString = currentDate.toLocaleDateString();
                const dateComponents = dateString.split('/');
                const formattedDate=`${dateComponents[2]}-0${dateComponents[1]}-${dateComponents[0]}`
                if (formattedDate >= due_date) {
                    res.status(401).json("please select a proper date")
                }
                else {
                    const newTask = new tasks({
                        id,
                        email,
                        title,
                        description,
                        status: 'pending',
                        due_date
                    })
                    await newTask.save()
                    res.status(200).json("Task added successsfully")
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


exports.gettask = async (req, res) => {
    const { id, email } = req.params
    try {
        const task = await tasks.findOne({ id, email })
        if (task) {
            res.status(200).json(task)
        }
        else {
            res.status(404).json("Task not found")
        }
    }
    catch (error) {
        res.status(401).json(error)
    }
}


exports.edittask = async (req, res) => {
    const { title, description, due_date } = req.body
    const { id, email } = req.params
    try {
        const task = await tasks.findOne({ id, email })
        if (task) {
            const currentDate = new Date()
            const dateString = currentDate.toLocaleDateString();
            const dateComponents = dateString.split('/');
            const formattedDate=`${dateComponents[2]}-0${dateComponents[1]}-${dateComponents[0]}`
            if (formattedDate >= due_date) {
                res.status(401).json("please select a proper date")
            }
            else{
                task.title = title
                task.description = description
                task.due_date = due_date
    
                await task.save()
                res.status(200).json("Task edited successfully")
            }
            
        }
        else {
            res.status(404).json("Task not found")
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
        const task = await tasks.findOne({ id, email })
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

exports.deletetask = async (req, res) => {
    const { id, email } = req.params
    try {
        const removedtask = await tasks.deleteOne({ id, email })
        if (removedtask.deleteCount != 0) {
            const alltasks = await tasks.find({ email })
            res.status(200).json(alltasks)
        }
        else {
            res.status(404).json("Task not present")
        }
    }
    catch (error) {
        res.status(401).json(error)
    }

}