/**
 * MyProjectList
 * @constructor
 */
function MyProjectList(){
   this._$ = null;

   this._list = [];
}

/**
 * Initialize
 */
MyProjectList.prototype.initialize = function(){
   this._$ = $('#myProjects');
};

/**
 * Download list of projects
 */
MyProjectList.prototype.downloadList = function(){
   // TEMP
   var data = [
      {
         "_id": {
            "$oid": "55d6204ee4b0ffba89aafd17"
         },
         "title": "Headphones",
         "imgUrl": "images/sketch_02.jpg"
      },
      {
         "_id": {
            "$oid": "55d6204ee4b0ffba89aafd17"
         },
         "title": "Super bike",
         "imgUrl": "images/sketch_03.jpg"
      },
      {
         "_id": {
            "$oid": "55d6204ee4b0ffba89aafd17"
         },
         "title": "Helmet",
         "imgUrl": "images/sketch_04.jpg"
      },
      {
         "_id": {
            "$oid": "55d6204ee4b0ffba89aafd17"
         },
         "title": "Who know",
         "imgUrl": "images/sketch_05.png"
      },
      {
         "_id": {
            "$oid": "55d6204ee4b0ffba89aafd17"
         },
         "title": "Machine",
         "imgUrl": "images/sketch_06.jpg"
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
MyProjectList.prototype._renderList = function(){
   this._$.css('display', 'block');

   var $container = this._$.find('.container');

   $container.append(this._constructProject({ "title": "Create Project" }, true));

   for(var i = 0; i < this._list.length; ++i){
      $container.append(this._constructProject(this._list[i]));
   }
};

/**
 * Construct HTML DOM for one proejct
 * @param {object} projectData
 * @returns {*|jQuery|HTMLElement}
 * @private
 */
MyProjectList.prototype._constructProject = function(projectData, newProject){
   var $project = $('<div class="project"></div>');
   if(newProject === true){
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
};

