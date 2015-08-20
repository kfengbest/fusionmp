/**
 * ProjectList
 * @constructor
 */
function ProjectList(){
   this._$ = null;

   this._list = [];
}

/**
 * Initialize
 */
ProjectList.prototype.initialize = function(){
   this._$ = $('#projectList');
};

/**
 * Download list of projects
 */
ProjectList.prototype.downloadList = function(){
   // TEMP
   var data = [
      {
         "_id": {
            "$oid": "55d6204ee4b0ffba89aafd17"
         },
         "title": "Project Super Chair",
         "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure...",
         "imgUrl": "images/sketch_01.jpg",
         "budget": 1000,
         "deadline": "02/12/2025",
         "status": "wip"
      },
      {
         "_id": {
            "$oid": "55d6204ee4b0ffba89aafd17"
         },
         "title": "Project Super Chair",
         "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure...",
         "imgUrl": "images/sketch_07.jpg",
         "budget": 1200,
         "deadline": "10/05/2020",
         "status": "wip"
      }
   ];

   var self = this;
   setTimeout(function() {
      self._list = data;
      self._renderList();
   }, 1500);
};

/**
 * Render list of projects
 * @private
 */
ProjectList.prototype._renderList = function(){
   for(var i = 0; i < this._list.length; ++i){
      var projectData = this._list[i];
      this._$.append(this._constructProject(projectData));
   }
};

/**
 * Construct HTML DOM for one proejct
 * @param {object} projectData
 * @returns {*|jQuery|HTMLElement}
 * @private
 */
ProjectList.prototype._constructProject = function(projectData){
   var $project = $('<div class="project notSelectable"></div>');

   $project.append('<div class="projectInfo"><div class="name">' + projectData.title + '</div><div class="text">' + projectData.description + '</div></div>');
   $project.append('<div class="photo" style="background-image: url(\'' + projectData.imgUrl + '\')"></div>');
   $project.append('<div class="projectDetail"><div class="budget"><b>Budget:</b> $' + projectData.budget + '</div><div class="deadline"><b>Deadline:</b> ' + projectData.deadline + '</div><div class="status roundBnt dark">New</div></div>');

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
};

