var Project    = require('./projectModel.js'),
    Q       = require('q'),
    util    = require('../config/utils.js');
var _ = require("underscore");

var User = require('../users/userModel.js');


module.exports = {
  findProject: function (req, res, next, projectId) {
    var findProject = Q.nbind(Project.findOne, Project);
    findProject({_id:projectId})
      .then(function (project) {
        if (project) {
          req.project = project;
          next();
        } else {
          next(new Error('Project not added yet'));
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  list: function (req, res, next) {
  console.log(req.session);

  var findAll = Q.nbind(Project.find, Project);

  findAll({})
    .then(function (projects) {
      res.json(projects);
    })
    .fail(function (error) {
      next(error);
    });
  },

  create: function (req, res, next) {
    var newProject = req.body;
    console.log(req.session);

    var user = {
      username: req.session.username || "kaven",
      userid: req.session.user_id || "oxygenid",
      userimage: req.session.userImage || "xxx.jgp"
    };

    newProject.owner = user;

    var createProject = Q.nbind(Project.create, Project);
    
    createProject(newProject)
    .then(function (createdProject) {
        if (createdProject) {
          res.json(createdProject);
        }
      })
      .fail(function (error) {
        next(error);
      });

  },

  update: function(req, res, next){
    var project = req.project;
    project = _.extend(project, req.body);
    project.save(function (err, project) {
      if (err) {
        next(err);
      } else {
        res.json(project);
      }
    });

  },

  read: function (req, res, next) {
    res.json(req.project);
  },

  createDesigner: function(req, res, next){

    console.log(req.session);

    var project = req.project;
    var user = {
      username: req.session.username || "kaven",
      userid: req.session.user_id || "oxygenid",
      userimage: req.session.userImage || "xxx.jgp"
    };
    var fusionfile = req.body.fusionfile || "";
    var fusionopenlink = req.body.fusionopenlink || "";
    project.addDesigner(user, fusionfile, fusionopenlink, function(err){
      if (err) {
        next(err);
      }else{
        res.json(req.body);
      }
    });

  }  

};