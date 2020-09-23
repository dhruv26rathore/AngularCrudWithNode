var express = require("express")
var router = express.Router();
var mongojs = require("mongojs")
var db= mongojs(
    "meantask",
    ["tasks"]
)

//get all the tasks
router.get("/tasks", function(req, res, next){
    db.tasks.find(function(err, tasks){
     if(err){
         res.send(err)
     }
     res.json(tasks)   
    })
})

//save the tasks
router.post("/tasks",function(req,res,next){
    var task = req.body
    console.log(task)
    if(!task.title){
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    }else{
        db.tasks.save(task, function(err, task){
            if(err){
                res.send(err)
            }
            else{
                db.tasks.save(task, function(err, task){
                    if(err){
                        res.send(err)
                    }
                    res.json(task)
                })
            }
        })
    }
})

//Delete the Tasks
router.delete("/tasks/:id",function(req,res){
    db.tasks.remove({_id:mongojs.ObjectId(req.params.id)},function(err,task){
        if(err){
            res.send(err)   
            }
            res.json(task)
        })
    })

//Update the Tasks
router.put("/tasks/:id", function(req, res){

    var task = req.body
    var updTask = {}

    if(task.title){
        updTask.title = task.title

    }
    if(!updTask){
        res.status(400)
        res.json({
            error:"Bad Data"
        })

    }
    else{

        db.tasks.update(
            {_id: mongojs.ObjectId(req.params.id)},
            updTask,
            {},
            function(err,task){
                if(err){
                    res.send(err)

                }
                res.json(task)
            }
        )
    }
})  
module.exports = router