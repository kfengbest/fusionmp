/**
 * @Inheritance
 */
Popup_ProjectDetail.prototype = Object.create(Popup.prototype);
Popup_ProjectDetail.prototype.constructor = Popup_ProjectDetail;



/**
 * Add project popup
 * @constructor
 */
function Popup_ProjectDetail(){
   this._projectId = null;
   this._projectData = null;

   Popup.call(this);
}

/**
 * Show popup
 */
Popup_ProjectDetail.prototype.show = function(projectId){
   this._projectId = projectId;

   Popup.prototype.show.call(this);

   this._downloadProject();
};

/**
 * Construct HTML DOM
 * @private
 */
Popup_ProjectDetail.prototype._construct = function(){
   Popup.prototype._construct.call(this);

   this._$.attr('id', 'projectDetail');

   var $project = $('<div class="project notSelectable"></div>');

   $project.append('<div class="projectInfo"><div class="name"></div><div class="text"></div></div>');

   $project.append('<div class="photo"></div>');

   $project.append('<div class="projectDetail"><div class="budget"><b>Budget:</b> <span></span></div><div class="deadline"><b>Deadline:</b> <span></span></div></div>');

   // TODO

   this._$.append($project);
};

/**
 * Connect events related to HTML DOM
 * @private
 */
Popup_ProjectDetail.prototype._connectEvents = function(){
   Popup.prototype._connectEvents.call(this);

   var self = this;
};

Popup_ProjectDetail.prototype._downloadProject = function(){
   // TODO

   var self = this;
   setTimeout(function() {
      // find project
      for(var i = 0; i < g_projects.length; ++i){
         if(g_projects[i]._id.$oid === self._projectId){
            self._projectData = g_projects[i];
            break;
         }
      }

      self._showProjectData();

   }, 1000);
};

/**
 * Show project data
 * @private
 */
Popup_ProjectDetail.prototype._showProjectData = function(){
   this._$.find('.projectInfo .name').html(this._projectData.title);
   this._$.find('.projectInfo .text').html(this._projectData.description);

   this._$.find('.photo').css('backgroundImage','url("' + this._projectData.imgUrl + '")');

   this._$.find('.projectDetail .budget span').html('$ ' + this._projectData.budget);
   this._$.find('.projectDetail .deadline span').html(this._projectData.deadline);

   // TODO
};