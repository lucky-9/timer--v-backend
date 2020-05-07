const Log = require("../models/log");
const User = require("../models/user");
const { check, validationResult } = require('express-validator');


exports.getLogById = (req, res, next, id) => {
    Log.findById(id)
    .populate('project')
      .exec((err, log) => {
        if (err) {
          return res.status(400).json({
            "error": "Log not found"
          });
        }
        req.log = log;
        next();
      });
  };


  exports.createLog = (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            error:errors.array()[0].msg
        })
    }
    const log = new Log(req.body);
    log.save((err, log) =>{ 
        if(err){
            console.log(err)
            return res.status(400).json({
                "error":"error saving log"
            })
        }
        const user = req.profile;
        console.log("Poject id; ", log._id);
        user.userLogs.push(log._id);
        user.save();
        res.send(log)
     });  

  }




  exports.getLog = (req, res) =>{
      console.log("inside get log")
    return res.json(req.log);
}



exports.getLogs= (req, res) =>{
 Log.find()
 .populate('project')
  .exec((err, logs) =>{
      if(err){
          return res.status(400).json({
              "error":"Logs not found"
          })
      }
      return res.json(logs);
  })
}


exports.updateLog = (req, res) =>{
    Log.findByIdAndUpdate(
        {_id:req.log._id},
        {$set: req.body},
        {new:true},
        ).exec((err, log) =>{
            if(err){
                res.json({
                   "error":"log cannot be updated"
                })
            }
            res.json(log)
    });
      
  
}


exports.removeLog = (req, res) =>{
  const log = req.log;

  log.remove((err, log) =>{
      if(err){
          return res.status(400).json({
              "error":"failed to delete log"
          })
      }
      res.json({
          message:`log succesfully deleted`
      });
  })
}