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
   var self = this;
   $.ajax({
      url: '/api/projects/' + self._projectId,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
         console.log('GET - /api/projects/'+ self._projectId + ' - success', data);
         // TODO ... update g_projectList
         self._projectData = data;
         self._showProjectData();
      },
      error: function (error) {
         console.log('GET - /api/projects/'+ self._projectId + ' - error', error);
      }
   });
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

   // clean
   this._$.find('.projectDetail .roundBnt').remove();
   this._$.find('.projectDetail .designersList').html('');

   // I'm NOT logined-in
   if(g_userData == null){
      return;
   }

   var $container = this._$.find('.projectDetail');

   // I'm owner
   if(this._projectData.owner != null && this._projectData.owner.userid != null && this._projectData.owner.userid == g_userData.userid){
      var $designersList = $('<div class="designersList"></div>');
      $designersList.append('<div class="title">Designers list:</div>');

      // list of designers is empty
      if(this._projectData.designers != null && this._projectData.designers.length === 0){
         $designersList.append('<div class="roundBnt light disabled">No designers yet</div>');
      }
      // there are same designers
      else if(this._projectData.designers != null && this._projectData.designers.length > 0){
         for(var i = 0; i < this._projectData.designers.length; ++i){
            var designerData = this._projectData.designers[i];

            var $designer = $('<div class="designer ">');
            // not finished
            if(designerData.fusionfile == null || designerData.fusionfile.length === 0){
               $designer.addClass('notFinished');
            }
            $designer.append('<div class="avatar" style="background-image: url(\"' + designerData.fusionfilepreview + '\")"></div>');
            $designer.append('<div class="name">' + designerData.designer.username + '</div>');
            $designer.append('<div class="buttons"><div class="roundBnt ask light">Ask the question</div><div class="roundBnt buy light">Buy</div><div class="roundBnt open light">Open in Fusion</div></div>');

            $designersList.append($designer);
         }
      }

      $container.append($designersList);
   }
   // I'm designer
   else{
      var accepted = false;
      if(this._projectData.designers != null){
         for(var j = 0; j < this._projectData.designers.length; ++j){
            if(this._projectData.designers[j].designer != null && this._projectData.designers[j].designer.userid != null && this._projectData.designers[j].designer.userid == g_userData.userid){
               accepted = true;
               break;
            }
         }
      }

      // I already accept it
      if(accepted === true){
         this._$.find('.projectDetail').append('<div class="roundBnt light disabled">Already accepted</div>');
      }
      // I can accept it
      else{
         this._$.find('.projectDetail').append('<div class="roundBnt light accept">Accept</div>');
         var self = this;
         this._$.find('.projectDetail .roundBnt.accept').bind('click', function() {
            self._onAccept();
         });
      }
   }
};

/**
 * Handle click on accept
 * @private
 */
Popup_ProjectDetail.prototype._onAccept = function(){
   var self = this;
   $.ajax({
      url: '/api/projects/' + self._projectId + '/accept',
      type: 'POST',
      contentType: 'application/json',
      success: function (data) {
         console.log('GET - /api/projects/'+ self._projectId + '/accept - success', data);
         self._downloadProject();
      },
      error: function (error) {
         console.log('GET - /api/projects/'+ self._projectId + '/accept - error', error);
      }
   });
};