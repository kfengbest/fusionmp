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
   // TODO
   var data = [
      {
         "_id": {
            "$oid": "55d6204ee4b0ffba89aafd171"
         },
         "title": "Headphones",
         "imgUrl": "images/sketch_02.jpg"
      },
      {
         "_id": {
            "$oid": "55d6204ee4b0ffba89aafd172"
         },
         "title": "Super bike",
         "imgUrl": "images/sketch_03.jpg"
      },
      {
         "_id": {
            "$oid": "55d6204ee4b0ffba89aafd173"
         },
         "title": "Helmet",
         "imgUrl": "images/sketch_04.jpg"
      },
      {
         "_id": {
            "$oid": "55d6204ee4b0ffba89aafd174"
         },
         "title": "Who know",
         "imgUrl": "images/sketch_05.png"
      },
      {
         "_id": {
            "$oid": "55d6204ee4b0ffba89aafd175"
         },
         "title": "Machine",
         "imgUrl": "images/sketch_06.jpg"
      }
   ];

   this._$.slideDown(350);

   // new
   var time = 200;
   if(this._htmlNodesList['new'] == null){
      var $newProject = this._constructProject({ "_id": { "$oid": "new" }, "title": "Create Project", "imgUrl": "" });
      this._displayNewProject($newProject, time);
      time += 200;
      this._htmlNodesList['new'] = $newProject;
   }

   for(var i = 0; i < data.length; ++i){
      var projectData = data[i];

      var projectId = projectData._id.$oid;
      if(this._htmlNodesList[projectId] == null){
         var $p = this._constructProject(projectData);
         this._displayNewProject($p, time);
         this._htmlNodesList[projectId] = $p;

         time += 200;
      }
   }
};

/**
 * Use animation to show new project
 * @param {HTMLElement} $p
 * @param {number} time
 * @private
 */
MyProjectList.prototype._displayNewProject = function($p, time){
   var self = this;
   setTimeout(function() {
      self._$.find('.container').append($p);
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
   if(projectData._id.$oid === 'new'){
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

   // new
   if(projectData._id.$oid === 'new'){
      var popup = new Popup_CreateProject();
      popup.show();
   }
};

