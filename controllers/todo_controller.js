const Todo = require('../models/todo');

module.exports.createTodo = async (req, res) => {

    //Destructure
    const { name,  description, status } = req.body;
     try{
        if(!name || !description || !status){
            return res.status(401).json({
                success: false,
                message: 'Please enter correct data!'
            })
        }

        console.log(`name : ${name}, category :${description}, status : ${status}`);
        let task = await Todo.findOne({name: name});
        if(task) {
            return res.status(401).json({
                success: false,
                message: 'Task is already exists!'
            })
        }
        
        let data = await Todo.create(req.body);
        return res.status(200).json({
            success: true,
            data: data,
            message: 'Task Added successfuly!'
        })
               
    } catch (error) {
        let errMssg = error.message;
        if(process.env.environment == 'production'){
            errMssg= 'Internal Server error!!'
        }
        return res.status(500).json({
            success: false,
            message: errMssg
        })
    }
}

// API for getting TODOs
module.exports.getTodo = async (req, res) => {
    try {

        let todos = await Todo.find({});
        return res.status(200).json({
            success: true,
            data: todos
        })

    } catch (error) {

        let errMssg = error.message;
        if(process.env.environment == 'production'){
            errMssg= 'Internal Server error!!'
        }
        return res.status(500).json({
            success: false,
            message: errMssg
        })
    }
}

// API for UPDATE TODO status
module.exports.updateTodoStatus = async (req, res) => {
    try {
        const { id, status_id } = req.params;

        if(!(status_id == 0 || status_id == 1)) {
            return res.status(402).json({
                success: false,
                message: "Invalid ID/Status_ID!"
            })
        }
        if(!id) {
            return res.status(402).json({
                success: false,
                message: "Invalid ID!"
            })
        }
        let task =await Todo.findById(id);
        if(!task){
            return res.status(402).json({
                success: false,
                message: "Task not found!"
            })
        }
        if(status_id == 1) {
            task.status = 1;
        } else {
            task.status = 0;
        }
        await task.save();

        return res.status(200).json({
            success: true,
            data: task,
            message:"Status Updated Successfuly!"
        })
        
    } catch (error) {

        let errMssg = error.message;
        if(process.env.environment == 'production'){
            errMssg = 'Internal Server error!!'
        }
        return res.status(500).json({
            success: false,
            message: errMssg
        })

    }
}

//  API for updating data of taks
module.exports.updateTodoData = async (req, res) => {
    try {

        let updatedTask =  await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });

            return res.status(200).json({
              success: true,
              data: updatedTask,
              message: 'Task Updated Successfuly!'
            })

    } catch (error) {
        
        let errMssg=error.message;
        if(process.env.environment == 'production'){
            errMssg = 'Internal Server error!!'
        }
        return res.status(500).json({
            success: false,
            message: errMssg
        })

    }
}

//  API for DELETE task 
module.exports.deleteTodo = async (req, res) => {
    try {

        const { id } = req.params;
        
        if(!id) {

            return res.status(402).json({
                success: false,
                message: "Invalid Id!"
            })

        }

        let deletedItem = await Todo.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            data: deletedItem,
            message: 'Task deleted successfuly!'
        })
        
    } catch (error) {
         
        let errMssg = error.message;
        if(process.env.environment == 'production'){
            errMssg = 'Internal Server error!!'
        }
        return res.status(500).json({
            success: false,
            message: errMssg
        })

    }
}

// API for FILTER task based on STATUS
module.exports.filterTodo = async (req, res) => {
    try {

        const {status} = req.params;

        let data = await Todo.find({});

        const filteredTask = data.filter((task) => {
           return task.status == status;
        })

        return res.status(200).json({
            success: true,
            data: filteredTask,
            message: `All tasks whose Status is : ${status}`
        })

        
    } catch (error) {
           
        let errMssg = error.message;
        if(process.env.environment == 'production'){
            errMssg = 'Internal Server error!!'
        }
        return res.status(500).json({
            success: false,
            message: errMssg
        })

    }
}