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
          req.navProject = project;
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
    var body = req.body;
    console.log(body);

    var createProject = Q.nbind(Project.create, Project);
    var newProject = {
      name : body.name,
      description: body.description,
      imgUrl:body.imgUrl,
      owner: null,
      budget: 0,
      status: 'wip',
      designers:[{fusionfile:'fileurl1', designer: null}, {fusionfile:'fileurl2', designer: null}]
    };
    createProject(newProject)
    .then(function (createdProject) {
        if (createdProject) {
          res.json(createdProject);
        }
      })
      .fail(function (error) {
        next(error);
      });

    // var findUser = Q.nbind(User.findOne, User);
    // findUser({username: "bb"})
    //   .then(function (user) {
    //     if (user) {


    //     }
    //   })

  },

  update: function(req, res, next){
    var project = req.navProject;
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
    res.json(req.navProject);
  }  

};
