/**
 * @Inheritance
 */
Popup_AddProject.prototype = Object.create(Popup.prototype);
Popup_AddProject.prototype.constructor = Popup_AddProject;



/**
 * Add project popup
 * @constructor
 */
function Popup_AddProject(){
   Popup.call(this);

   this._$photoInput = null;
   this._$uploadBtn = null;
   this._$submitBtn = null;
}

/**
 * Construct HTML DOM
 * @private
 */
Popup_AddProject.prototype._construct = function(){
   Popup.prototype._construct.call(this);

   this._$.addClass('addProject');

   // title
   var $titleRow = $('<div class="row"</div>');
   var $title = $('<div class="title notSelectable">Add new project</div>');
   $titleRow.append($title);
   this._$content.append($titleRow);

   // project name
   var $projectNameRow = $('<div class="row"</div>');
   var $projectName = $('<input type="text" placeholder="project name" />');
   $projectNameRow.append($projectName);
   this._$content.append($projectNameRow);

   // project description
   var $projectDescriptionRow = $('<div class="row"</div>');
   var $projectDescription = $('<textarea></textarea>');
   $projectDescriptionRow.append($projectDescription);
   this._$content.append($projectDescriptionRow);

   // project budget
   var $projectBudgetRow = $('<div class="row"</div>');
   var $projectBudget = $('<input type="text" placeholder="$" />');
   $projectBudgetRow.append($projectBudget);
   this._$content.append($projectBudgetRow);

   // project date
   var $projectDateRow = $('<div class="row"</div>');
   var $projectDate = $('<input type="text" placeholder="date" />');
   $projectDateRow.append($projectDate);
   this._$content.append($projectDateRow);

   // upload btn
   var $uploadBtnRow = $('<div class="row"</div>');
   this._$uploadBtn = $('<div class="btnLikeInput upload notSelectable">Upload image</div>');
   $uploadBtnRow.append(this._$uploadBtn);
   this._$content.append($uploadBtnRow);

   // photo input
   this._$photoInput = $('<input type="file" />');

   // submit button
   var $submitBtnRow = $('<div class="row bigger"</div>');
   this._$submitBtn = $('<div class="btn submit notSelectable">Submit</div>');
   $submitBtnRow.append(this._$submitBtn);
   this._$content.append($submitBtnRow);
};

/**
 * Connect events related to HTML DOM
 * @private
 */
Popup_AddProject.prototype._connectEvents = function(){
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
Popup_AddProject.prototype._onUpload = function(){
   this._$photoInput.trigger('click');
};

/**
 * Handle click on submit button
 * @private
 */
Popup_AddProject.prototype._onSubmit = function(){
   alert('submit');
   // TODO ... create AJAX call
};

/**
 * Handle change photo input
 * @param {object} e
 * @private
 */
Popup_AddProject.prototype._onPhotoChange = function(e){
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
         //theFile.name
         self._$uploadBtn.css('backgroundImage', 'url(' + e.target.result + ')');
      };
   })(file);

   reader.readAsDataURL(file);
};