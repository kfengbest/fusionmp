var Project    = require('./projectModel.js'),
    Q       = require('q'),
    util    = require('../config/utils.js');
var _ = require("underscore");

var User = require('../users/userModel.js');

var filesMap = {
  "GuitarBest": "fusion360//xxxx",
  "GuitarOk" : "xxxxx"
};


var search = function(condition, multiple) {
  var defer = Q.defer();

  var findProjects = multiple? Q.nbind(Project.find, Project) : Q.nbind(Project.findOne, Project);

  findProjects(condition)
    .then(function (projects) {
      if (projects) {
        defer.resolve(projects);
      } else {
        defer.reject({});
      }
    })
    .fail(function (error) {
      defer.reject({});
    });

  return defer.promise;
};

module.exports = {
  findProjectById: function (req, res, next, projectId) {
    var findProject = Q.nbind(Project.findOne, Project);

    console.log("findProjectById", projectId);

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

    var cond = {};
    if(req.query.userid){
      cond["owner.userid"] = req.query.userid;
    }
    var findAll = Q.nbind(Project.find, Project);

    console.log("list",cond);
    findAll(cond)
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

  acceptProject: function(req, res, next){
    var project = req.project;

    var user = {
      username: req.session.username || "kaven",
      userid: req.session.user_id || "oxygenid",
      userimage: req.session.userImage || "xxx.jgp"
    };
    var fusionfile = "";
    var fusionopenlink = "";
    project.addDesigner(user, fusionfile, fusionopenlink, function(err){
      if (err) {
        next(err);
      }else{
        res.json(req.body);
      }
    });

  },

  fakeSubmit: function(req, res, next) {
    var fusionfile = req.query.name;
    var fusionopenlink = filesMap[fusionfile];
    var userid = req.query.userid;

  },


  fakeApprove: function(req, res, next) {
    console.log('Fake Approve: ' + req.query.name);
    var fusionfile = req.query.name;
    var fusionopenlink = filesMap[fusionfile];
    var userid = req.query.userid;

    var filter = {$and:[{"status":"wip"},{"designers.designer.userid":userid}]};

    search(filter, false)
      .then(function(project){
        if (project.designers) {
          _.each(project.designers, function(e){
            if (e.designer.userid === userid) {
              e.fusionfile = fusionfile;
              e.fusionopenlink = filesMap[fusionfile];
              project.status = "closed";
            }
          })          
        };

        project.save(function (err, project) {
          if (err) {
            next(err);
          } else {
            res.json(project);
          }
        });

      });

  },

  getUserById: function(project, userid){

    var defer = Q.defer();
    if (project.owner && project.owner.userid === userid) {
      defer.resolve(project.owner);
    }else{
      if (project.designers) {
        var bs = _.find(project.designers, function(e){
          return (e.designer && e.designer.userid === userid) ? true : false;
        });

        if (bs){
          defer.resolve(bs.designer);
        }else{
          defer.reject({});
        }
      }
    }

    return defer.promise;
  }  

};
