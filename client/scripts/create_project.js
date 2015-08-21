/**
 * @Inheritance
 */
Popup_CreateProject.prototype = Object.create(Popup.prototype);
Popup_CreateProject.prototype.constructor = Popup_CreateProject;



/**
 * Add project popup
 * @constructor
 */
function Popup_CreateProject(){
   Popup.call(this);

   this._$photoInput = null;
   this._$submitBtn = null;
   this._$uploadImg = "";
}

/**
 * Construct HTML DOM
 * @private
 */
Popup_CreateProject.prototype._construct = function(){
   Popup.prototype._construct.call(this);

   this._$.attr('id', 'createProject');

   var $project = $('<div class="project notSelectable"></div>');

   $project.append('<div class="projectInfo"><div class="name"><input type="text" name="name" placeholder="Project Name"></div><div class="text"><textarea name="description" placeholder="Project Description"></textarea></div></div>');

   $project.append('<div class="photo empty"><div class="emptyPhotoTitle">Upload photo</div></div>');

   $project.append('<div class="projectDetail"><div class="budget"><input type="text" name="budget" placeholder="Budget"></div><div class="deadline"><input type="text" name="deadline" placeholder="Deadline Date"></div></div>');

   this._$.append($project);

   this._$.append('<div class="buttonContainer"><div class="roundBnt light">Create</div></div>');

   this._$uploadBtn = $project.find('.photo');

   // photo input
   this._$photoInput = $('<input type="file" />');

   // submit button
   this._$submitBtn = this._$.find('.buttonContainer .roundBnt');
};

/**
 * Connect events related to HTML DOM
 * @private
 */
Popup_CreateProject.prototype._connectEvents = function(){
   Popup.prototype._connectEvents.call(this);

   var self = this;

   if(this._$photoInput !== null){
      this._$photoInput.bind('change', function(e) { self._onPhotoChange(e); });
   }
   if(this._$uploadBtn !== null){
      this._$uploadBtn.bind('click', function() { self._onUpload(); });
   }
   if(this._$submitBtn !== null){
      this._$submitBtn.bind('click', function() { self._onSubmit(); });
   }
};

/**
 * Handle click on upload button
 * @private
 */
Popup_CreateProject.prototype._onUpload = function(){
   this._$photoInput.trigger('click');
};

/**
 * Handle click on submit button
 * @private
 */
Popup_CreateProject.prototype._onSubmit = function(){
   var name        = this._$.find('input[name="name"]').val();
   var description = this._$.find('textarea[name="description"]').val();
   var budget      = this._$.find('input[name="budget"]').val();
   var deadline    = this._$.find('input[name="deadline"]').val();

   var self = this;
   $.ajax({
      url: '/api/projects',
      type: 'POST',
      data: JSON.stringify({
         "title": name,
         "description": description,
         "budget": budget,
         "deadline": deadline,
         "imgUrl": self._$uploadImg
      }),
      contentType: 'application/json',
      success: function(data){
         console.log('POST - /api/projects - success: ', data);
         g_projects.unshift(data);
         self.hide();
         g_app.updateProjects();
      },
      error: function(error){
         console.log('POST - /api/projects - error: ', error);
      }
   });
};

/**
 * Handle change photo input
 * @param {object} e
 * @private
 */
Popup_CreateProject.prototype._onPhotoChange = function(e){
   var files = e.target.files;
   if(files.length == 0){
      console.warn('no file was selected');
      return;
   }

   var file = files[0];
   if (file.type.match('image.*') == false){
      console.warn('selected file is not image');
      return;
   }

   var self = this;
   var reader = new FileReader();
   reader.onload = (function(theFile) {
      return function(e) {
         self._$uploadImg = e.target.result;
         self._$uploadBtn.removeClass('empty');
         self._$uploadBtn.css('backgroundImage', 'url(' + self._$uploadImg + ')');
      };
   })(file);

   reader.readAsDataURL(file);
};