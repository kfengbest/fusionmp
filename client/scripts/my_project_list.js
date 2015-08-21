/**
 * MyProjectList
 * @constructor
 */
function MyProjectList(){
   this._$ = null;
   this._htmlNodesList = {};
}

/**
 * Initialize
 */
MyProjectList.prototype.initialize = function(){
   this._$ = $('#myProjects');
};

/**
 * Render list of my projects
 */
MyProjectList.prototype.renderList = function(){
   var data = this._filterMyProjects();
   if(data == null){
      return;
   }

   data.unshift({ "_id": "new", "title": "Create Project", "imgUrl": "" });

   var self = this;
   this._$.slideDown(350, function() {
      var time = 200;
      for(var i = 0; i < data.length; ++i){
         var projectData = data[i];

         var projectId = projectData._id;
         if(self._htmlNodesList[projectId] == null){
            var $p = self._constructProject(projectData);
            self._displayNewProject($p, time, i);
            self._htmlNodesList[projectId] = $p;

            time += 200;
         }
      }
   });
};

/**
 * Get list of projects for loginned user
 * @returns {Array}
 * @private
 */
MyProjectList.prototype._filterMyProjects = function(){
   if(g_userData == null){
      return null;
   }

   var result = [];

   for(var i = 0; i < g_projects.length; ++i){
      var projectData = g_projects[i];

      if(projectData != null && projectData.owner != null && projectData.owner.userid != null && projectData.owner.userid == g_userData.userid){
         result.push(projectData);
      }
      else if(projectData != null && projectData.designers != null && projectData.designers.length > 0){
         for(var j = 0; j < projectData.designers.length; ++j){
            if(projectData.designers[j].designer != null && projectData.designers[j].designer.userid == g_userData.userid){
               result.push(projectData);
            }
         }
      }
   }

   return result;
};

/**
 * Use animation to show new project
 * @param {HTMLElement} $p
 * @param {number} time
 * @param {number} idx
 * @private
 */
MyProjectList.prototype._displayNewProject = function($p, time, idx){
   var self = this;
   var container = self._$.find('.container');

   setTimeout(function() {
      if(idx === 0){
         if(container.find('.project').length === 0){
            container.append($p);
         }
         else{
            container.prepend($p);
         }
      }
      else{
         $p.insertAfter(container.find('.project:eq(' + (idx - 1) + ')'));
      }

      $p.animate({ 'opacity': 1 }, 350);
   }, time);
};

/**
 * Construct HTML DOM for one project
 * @param {object} projectData
 * @returns {*|jQuery|HTMLElement}
 * @private
 */
MyProjectList.prototype._constructProject = function(projectData){
   var $project = $('<div class="project"></div>');
   if(projectData._id === 'new'){
      $project.addClass('new');
   }

   $project.append('<div class="photo" style="background-image: url(\'' + projectData.imgUrl + '\')"></div>');
   $project.append('<div class="name">' + projectData.title + '</div>');

   var self = this;
   $project.bind('click', function() { self._onProjectClick(projectData) });

   return $project;
};

/**
 * Handle click on project
 * @param {object} projectData
 * @private
 */
MyProjectList.prototype._onProjectClick = function(projectData){
   console.log('Click on project ', projectData);

   var popup = null;

   // new
   if(projectData._id === 'new'){
      popup = new Popup_CreateProject();
      popup.show();
   }
   // detail
   else{
      popup = new Popup_ProjectDetail();
      popup.show(projectData._id);
   }
};

