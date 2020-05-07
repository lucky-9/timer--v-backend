const { check } = require('express-validator');
const express = require("express");
const router = express.Router();




const {getProjectById, getProject, getProjects, removeProject, createProject, updateProject} = require("../controller/project");
const {isAuthenticated, isSignedin} = require('../controller/auth');
const {getUserById} = require('../controller/user');

//MiddleWares
router.param("userId", getUserById);
router.param("projectId", getProjectById);

//Read Routes
router.get("/project/:projectId", getProject);
router.get('/projects', getProjects);




//Post Routes
router.post("/create/project/:userId",[
    // ...some other validations...
  check("title").isLength({min:3}).withMessage("Title should be atleast 3 characters"),
  ],isSignedin, isAuthenticated, createProject);


  //Update routes
  router.put("/project/:projectId/:userId",isSignedin, isAuthenticated, updateProject);

  //Delete Routes
  router.delete('/project/:projectId/:userId', isSignedin, isAuthenticated, removeProject);



  module.exports = router;