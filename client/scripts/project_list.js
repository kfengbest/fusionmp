/**
 * ProjectList
 * @constructor
 */
function ProjectList(){
   this._$ = null;
   this._htmlNodesList = {};
}

/**
 * Initialize
 */
ProjectList.prototype.initialize = function(){
   this._$ = $('#projectList');
};

/**
 * Render list of projects
 */
ProjectList.prototype.renderList = function(){
   var time = 200;
   for(var i = 0; i < g_projects.length; ++i){
      var projectData = g_projects[i];

      var projectId = projectData._id;
      if(this._htmlNodesList[projectId] == null){
         var $p = this._constructProject(projectData);
         this._displayNewProject($p, time, i);
         this._htmlNodesList[projectId] = $p;

         time += 200;
      }
   }
};

/**
 * Use animation to show new project
 * @param {HTMLElement} $p
 * @param {number} time
 * @param {number} idx
 * @private
 */
ProjectList.prototype._displayNewProject = function($p, time, idx){
   var self = this;
   setTimeout(function() {
      if(idx === 0){
         if(self._$.find('.project').length === 0){
            self._$.append($p);
         }
         else{
            self._$.prepend($p);
         }
      }
      else{
         $p.insertAfter(self._$.find('.project:eq(' + (idx - 1) + ')'));
      }
      $p.fadeIn(350);
   }, time);
};

/**
 * Construct HTML DOM for one proejct
 * @param {object} projectData
 * @returns {*|jQuery|HTMLElement}
 * @private
 */
ProjectList.prototype._constructProject = function(projectData){
   var statusStr = 'New';
   if(projectData.status === 'wip'){
      statusStr = 'In Progress';
   }
   else if(projectData.status === 'closed'){
      statusStr = 'Closed';
   }

   var $project = $('<div class="project notSelectable"></div>');

   $project.append('<div class="projectInfo"><div class="name">' + projectData.title + '</div><div class="text">' + projectData.description + '</div></div>');
   $project.append('<div class="photo" style="background-image: url(\'' + projectData.imgUrl + '\')"></div>');
   $project.append('<div class="projectDetail"><div class="budget"><b>Budget:</b> $' + projectData.budget + '</div><div class="deadline"><b>Deadline:</b> ' + projectData.deadline + '</div><div class="status roundBnt dark">' + statusStr + '</div></div>');

   var self = this;
   $project.bind('click', function() { self._onProjectClick(projectData) });

   return $project;
};

/**
 * Handle click on project
 * @param {object} projectData
 * @private
 */
ProjectList.prototype._onProjectClick = function(projectData){
   console.log('Click on project ', projectData);

   var popup = new Popup_ProjectDetail();
   popup.show(projectData._id);
};

