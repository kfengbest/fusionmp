/**
 * ProjectList
 * @constructor
 */
function ProjectList(){
   this._$ = null;
   this._userId = null;
   this._projectsHtmlNodes = {};
   this._projects = null;
}

/**
 * Initialize
 */
ProjectList.prototype.initialize = function(){
   this._construct();
};

/**
 * Construct HTML DOM
 * @private
 */
ProjectList.prototype._construct = function(){
   this._$ = $('<div id="projectsList"></div>');

   $('body').append(this._$)
};

ProjectList.prototype.downloadList = function(){
   // TEMP
   var data = [
      {
         "id": "1",
         "imageUrl": "http://www.chcaddoutsourcing.com/images/3d_solid_modeling_cad_solid_modeling_3d_solid_models_3d_cad_models.jpg",
         "name": "Project Name1",
         "budget": "$1000",
         "date": "date1",
         "owner": "ernest"
      },
      {
         "id": "2",
         "imageUrl": "https://33463d8ba37cd0a930f1-eb07ed6f28ab61e35047cec42359baf1.ssl.cf5.rackcdn.com/ugc/entry/z30TbGpnQXWH1hQEPhRR_CAD%20Model%201.jpg",
         "name": "Project Name2",
         "budget": "$1010",
         "date": "date2",
         "owner": "noernest"
      },
      {
         "id": "3",
         "imageUrl": "http://blog.grabcad.com/wp-content/uploads/2011/09/Kubota-engine-d1105-model.jpg",
         "name": "Project Name3",
         "budget": "$1020",
         "date": "date3",
         "owner": "ernest"
      }
   ];
   this._projects = data;

   this.renderProjects();
   // TEMP
};

ProjectList.prototype.renderProjects = function(){
   this._renderList(this._projects);
};

/**
 * Render list of data
 * @param {Array} data
 * @private
 */
ProjectList.prototype._renderList = function(data){
   if(this._$ === null){
      console.error('list HTML DOM is not defined');
      return;
   }

   for(var i = 0; i < data.length; ++i){
      var projectData = data[i];
      if(projectData == null || projectData.id == null){
         console.error('Can not render project in index ' + i);
         continue;
      }

      // project is not exist
      if(this._projectsHtmlNodes[projectData.id] == null){
         var $project = this._constructProject(projectData);
         this._$.append($project);
      }
      // project exists
      else{
         //
      }
   }
};

/**
 * Construct HTML DOM for on project
 * @param {object} data
 * @returns {*|jQuery|HTMLElement}
 * @private
 */
ProjectList.prototype._constructProject = function(data){
   var $project = $('<div class="project"></div>');

   // image
   var $image = $('<div class="image"></div>');
   $image.css('backgroundImage', 'url("' + data.imageUrl + '")');
   $project.append($image);

   // name
   var $name = $('<div class="name"></div>');
   $name.html(data.name);
   $project.append($name);

   // budget
   var $budget = $('<div class="budget"></div>');
   $budget.html(data.budget);
   $project.append($budget);

   // date
   var $date = $('<div class="date"></div>');
   $date.html(data.date);
   $project.append($date);

   var self = this;
   $project.bind('click', function() { self._onClickOnProject(data); });

   return $project;
};

/**
 * Handle click on project
 * @param {string} projectId // TODO
 * @private
 */
ProjectList.prototype._onClickOnProject = function(data){
   var popup = new Popup_ProjectDetail();
   popup.show(data);
};

