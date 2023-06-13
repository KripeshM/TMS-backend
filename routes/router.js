const express=require('express')

const router=new express.Router()

const userController=require('../controllers/userController')

const taskController=require('../controllers/taskController')

const assignTaskController=require('../controllers/assignTaskController')

//register
router.post('/user/register',userController.register)

//login
router.post('/user/login',userController.login)

//get all Task
router.get('/task/gettask/:email',taskController.getallTask)

//add Task
router.post('/task/addtask',taskController.addTask)

//get task
router.get('/task/gettask/:id/:email',taskController.gettask)

//edit task
router.put('/task/edittask/:id/:email',taskController.edittask)

//task status completed
router.get('/task/mark-complete/:id/:email',taskController.markComplete)

//delete task
router.delete('/task/delete-task/:id/:email',taskController.deletetask)

//assign task
router.post('/task/assign-task',assignTaskController.assigntask)

//get assigned task
router.get('/task/get-assigned-task/:email',assignTaskController.getassignedtask)

//assigned task status completed
router.get('/task/assign-task-complete/:id/:email',assignTaskController.markComplete)


module.exports=router