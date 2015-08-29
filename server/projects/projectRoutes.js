var projectsController = require('./projectController.js');

module.exports = function (app) {

  app.param('projectId', projectsController.findProjectById);

  app.route('/')
    .get(projectsController.list)
    .post(projectsController.create);

  app.route('/fakesubmit')
      .get(projectsController.fakeSubmit);

  app.route('/fakeapprove')
      .get(projectsController.fakeApprove);

  app.route('/:projectId')
    .get(projectsController.read)
    .post(projectsController.update)
    .delete(projectsController.delete);

  app.route('/:projectId/accept')
  	.post(projectsController.acceptProject);

};
