var projectsController = require('./projectController.js');

module.exports = function (app) {

  app.param('projectId', projectsController.findProjectById);

  app.route('/')
    .get(projectsController.list)
    .post(projectsController.create);

  app.route('/:projectId')
    .get(projectsController.read)
    .post(projectsController.update);

  app.route('/:projectId/designers')
  	.post(projectsController.createDesigner);
  	
};
