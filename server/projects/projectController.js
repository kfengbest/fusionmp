var Project    = require('./projectModel.js'),
    Q       = require('q'),
    util    = require('../config/utils.js');
var _ = require("underscore");

var User = require('../users/userModel.js');

var filesMap = {

"BBQGrillBest" : {
  fusionfilepreview: "images/BBQGrillBest.png",
//  fusionopenlink: "fusion360://userId=smoghe%40autodesk.com&permalinkId=https%3A%2F%2Fmyhub.autodesk360.com%2Fu05%2Fxdio%2Fpermalink%2FXD56a43QTfd62c1cd96839722df360bd3ec6&hubId=u05&documentName=BBQGrillBest"
  fusionopenlink: "fusion360://userId=smoghe%40autodesk.com&permalinkId=https%3A%2F%2Fmyhub.autodesk360.com%2Fu05%2Fxdio%2Fpermalink%2FXD56a43QTfd62c1cd96839722df360bd3ec6&hubId=u05&documentName=BBQGrillBest"

},

"CymbalStandOK" : {
  fusionfilepreview: "images/CymbalStandOk.png",
  fusionopenlink: "fusion360://userId=smoghe%40autodesk.com&permalinkId=https%3A%2F%2Fmyhub.autodesk360.com%2Fu05%2Fxdio%2Fpermalink%2FXD56a43QTfd62c1cd9681cfe6fef7efa10fd&hubId=u05&documentName=CymbalStandOK"
},

"CymbalStandBest" : {
  fusionfilepreview: "images/CymbalStandBest.png",
  fusionopenlink: "fusion360://userId=smoghe%40autodesk.com&permalinkId=https%3A%2F%2Fmyhub.autodesk360.com%2Fu05%2Fxdio%2Fpermalink%2FXD56a43QTfd62c1cd9683e62c2131ff83a95&hubId=u05&documentName=CymbalStandBest"
},

"GuitarOk" : {
  fusionfilepreview: "images/GuitarOk.png",
  fusionopenlink: "fusion360://userId=smoghe%40autodesk.com&permalinkId=https%3A%2F%2Fmyhub.autodesk360.com%2Fu05%2Fxdio%2Fpermalink%2FXD56a43QTfd62c1cd9681f29793be870b823&hubId=u05&documentName=GuitarOk"
},

"GuitarBest" : {
  fusionfilepreview: "images/GuitarBest.png",
  fusionopenlink: "fusion360://userId=smoghe%40autodesk.com&permalinkId=https%3A%2F%2Fmyhub.autodesk360.com%2Fu05%2Fxdio%2Fpermalink%2FXD56a43QTfd62c1cd9685896f9888c1f7ea2&hubId=u05&documentName=GuitarBest"
}

}

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

    Project.find(cond).sort([['_id', -1]]).exec(function(err, projects) { 
      if (!err) {
        res.json(projects);
      }else{
        next(error);
      }
    });

  },

  create: function (req, res, next) {
    var newProject = req.body;
    console.log("newProject");

    var user = {
      username: req.session.userName || "kaven",
      userid: req.session.user_id || "oxygenid",
      userimage: req.session.userImage || "xxx.jgp"
    };
    
    //console.log("createProject", newProject.owner);

    if (!newProject.owner)
      newProject.owner = user;

    //newProject.owner = newProject.owner || user;
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

  delete: function(req, res, next) {
    var project = req.project ;

    project.remove(function(err) {
      if (err) {
        next(err);
      } else {
        res.json(project);
      }
    });
  },

  acceptProject: function(req, res, next){
    var project = req.project;

    var user = {
      username: req.session.userName || "kaven",
      userid: req.session.user_id || "oxygenid",
      userimage: req.session.userImage || "xxx.jgp"
    };
    var fusionfile = "";
    var fusionopenlink = "";
    project.addDesigner(user, fusionfile, fusionopenlink, function(err){
      if (err) {
        next(err);
      }else{
        res.json(project);
      }
    });

  },

  fakeSubmit: function(req, res, next) {
    console.log('fakeSubmit start');
    var fusionfile = req.query.name;
    var values = filesMap[fusionfile];
    if (!values) {
      res.json({ok: false});
      return;
    }
    var fusionopenlink = values["fusionopenlink"];
    var fusionfilepreview = values["fusionfilepreview"];
    var userid = req.query.userid;

    console.log("submit", fusionfile, fusionfilepreview, fusionopenlink);

    var filter = {$and:[{"status":"wip"},{"designers.designer.userid":userid}]};

    search(filter, true)
      .then(function(projects){
        if (projects.length === 0) {
          res.json({ok: false});
          return;
        }
        _.each(projects, function(project){
          if (project.designers) {
            _.each(project.designers, function(e){
              if (e.designer.userid === userid) {
                e.fusionfile = fusionfile;
                e.fusionopenlink = fusionopenlink;
                e.fusionfilepreview = fusionfilepreview;
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
      })
      .fail(function(){
        //console.log('cant find project');
        res.json({ok: false});
      });
  },


  fakeApprove: function(req, res, next) {
    console.log('Fake Approve: ' + req.query.name);
    var fusionfile = req.query.name;

    var filter = {$and:[{"status":"wip"},{"designers.fusionfile":fusionfile}]};

    search(filter, false)
      .then(function(project){
        console.log(project.title);
        if (project.designers) {
          _.each(project.designers, function(e){
            if (e.fusionfile === fusionfile) {
              e.status = "approved";
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
