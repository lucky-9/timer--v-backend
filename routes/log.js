const { check } = require('express-validator');
const express = require("express");
const router = express.Router();


const {getLogById, getLog, getLogs, removeLog, createLog, updateLog} = require("../controller/log");
const {isAuthenticated, isSignedin} = require('../controller/auth');
const {getUserById} = require('../controller/user');

//MiddleWares
router.param("userId", getUserById);
router.param("logId", getLogById);

//Read Routes
router.get("/log/:logId", getLog);
router.get('/logs', getLogs);




//Post Routes
router.post("/create/log/:userId",[
    // ...some other validations...
  check("task").isLength({min:3}).withMessage("Task Name should be atleast 3 characters"),
  ],isSignedin, isAuthenticated, createLog);


  //Update routes
  router.put("/log/:logId/:userId",isSignedin, isAuthenticated, updateLog);

  //Delete Routes
  router.delete('/log/:logId/:userId', isSignedin, isAuthenticated, removeLog);



  module.exports = router;