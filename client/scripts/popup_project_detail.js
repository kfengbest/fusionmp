/**
 * @Inheritance
 */
Popup_ProjectDetail.prototype = Object.create(Popup.prototype);
Popup_ProjectDetail.prototype.constructor = Popup_ProjectDetail;



/**
 * Project detail popup
 * @constructor
 */
function Popup_ProjectDetail(){
   Popup.call(this);

   this._$photoInput = null;
   this._$uploadBtn = null;
   this._$submitBtn = null;

   this._projectData = null;
}

/**
 * Show popup
 */
Popup_ProjectDetail.prototype.show = function(projectData){
   this._projectData = projectData;

   Popup.prototype.show.call(this);
};

/**
 * Construct HTML DOM
 * @private
 */
Popup_ProjectDetail.prototype._construct = function(){
   Popup.prototype._construct.call(this);

   this._$.addClass('projectDetail');

   // title
   var $titleRow = $('<div class="row"</div>');
   var $title = $('<div class="title notSelectable">Project detail</div>');
   $titleRow.append($title);
   this._$content.append($titleRow);

   // project name
   var $projectNameRow = $('<div class="row"</div>');
   var $projectName = $('<input type="text" placeholder="project name" />');
   $projectName.val(this._projectData.name);
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
   $projectBudget.val(this._projectData.budget);
   $projectBudgetRow.append($projectBudget);
   this._$content.append($projectBudgetRow);

   // project date
   var $projectDateRow = $('<div class="row"</div>');
   var $projectDate = $('<input type="text" placeholder="date" />');
   $projectDate.val(this._projectData.date);
   $projectDateRow.append($projectDate);
   this._$content.append($projectDateRow);

   // upload btn
   var $uploadBtnRow = $('<div class="row"</div>');
   this._$uploadBtn = $('<div class="btnLikeInput upload notSelectable">&nbsp;</div>');
   this._$uploadBtn.css('backgroundImage', 'url("' + this._projectData.imageUrl + '")');
   $uploadBtnRow.append(this._$uploadBtn);
   this._$content.append($uploadBtnRow);
};

/**
 * Connect events related to HTML DOM
 * @private
 */
Popup_ProjectDetail.prototype._connectEvents = function(){
   Popup.prototype._connectEvents.call(this);

   var self = this;
};