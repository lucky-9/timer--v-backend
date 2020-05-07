const Project = require("../models/project");
const User = require("../models/user");
const { check, validationResult } = require('express-validator');


exports.getProjectById = (req, res, next, id) => {
    Project.findById(id)
      .exec((err, project) => {
        if (err) {
          return res.status(400).json({
            "error": "Project not found"
          });
        }
        req.project = project;
        next();
      });
  };


  exports.createProject = (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            error:errors.array()[0].msg
        })
    }
    const project = new Project(req.body);
    project.save((err, proj) =>{ 
        if(err){
            return res.status(400).json({
                "error":"error saving project"
            })
        }
        const use = req.profile;
        console.log(use.userProjects);
        console.log("Poject id; ", proj._id);
        use.userProjects.push(proj._id);
        use.save();
        res.send(proj)
     });  

  }




  exports.getProject = (req, res) =>{
    return res.json(req.project);
}



exports.getProjects = (req, res) =>{
 Project.find()
  .exec((err, projects) =>{
      if(err){
          return res.status(400).json({
              "error":"projects not found"
          })
      }
      return res.json(projects);
  })
}


exports.updateProject = (req, res) =>{
          let project =  req.project;
          //console.log(blog);
          project.save((err, project) =>{
              if(err){
                  return res.status(400).json({
                      "error":"updation of project failed in DB"
                  })
              }
              res.json(project);
          })
      
  
}

// exports.incrementBlogLikeCount = (req, res) =>{
//     let blog= req.blog;
//     let user = req.profile;
//     let userLikedBlogs = user.likedBlogs;
//     console.log("before pushing ", userLikedBlogs);
//     let blogIsLiked = userLikedBlogs.includes(blog._id);
//     if(blogIsLiked){
//       return  res.send("Blog is alreaady liked");
//     }

//     console.log(user);
//     blog.likes = blog.likes+1;
//     user.likedBlogs.push(blog._id);
//     user.save();
//     console.log("after pushing ", userLikedBlogs);
//     blog.save((err, blog) =>{
//         if(err){
//             return res.status(400).json({
//                 "error":"updation of Blog Like Count failed in DB"
//             })
//         }
//         res.json(blog);
//     })   
// }

exports.removeProject = (req, res) =>{
  const project = req.project;

  project.remove((err, project) =>{
      if(err){
          return res.status(400).json({
              "error":"failed to delete project"
          })
      }
      res.json({
          message:`${project.title} succesfully deleted`
      });
  })
}