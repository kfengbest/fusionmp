/**
 * Application
 * @constructor
 */
function App(){
   this._userData = null;

   this._projectList = new ProjectList();
   this._myProjectList = new MyProjectList();
}

/**
 * Initialize
 */
App.prototype.initialize = function(){
   this._projectList.initialize();
   this._myProjectList.initialize();

   this._showIntro();

   // TEMP
   var self = this;
   setTimeout(function() {
      self._showProjectsList();
   }, 2000);
   // TEMP

   // TEMP
   // TODO ... check login immediate
   // Oxygen.checkImmediate();
   setTimeout(function() {
      self._onUserInfoArrived({ "userid": "123", "name": "Kamil Ignac", "avatar": "http://imc.ulximg.com/image/src/cover/1408934009_e593df5f275bf603715b3306d1cca4b5.jpg/b994a2997abd48fdd5c67359cb5373e0/1408934009_usher12_21.jpg" });
      self._showMyProjects();
   }, 5000);
   // TEMP
};

/**
 * Show page intro
 * @private
 */
App.prototype._showIntro = function(){
   $('.logo').addClass('introMode');
};

/**
 * Show list of project
 * @private
 */
App.prototype._showProjectsList = function(){
   // TODO ... animation
   // logo
   var $logo = $('.logo');
   $logo.removeClass('introMode');
   $logo.addClass('standardMode');

   // intro
   $('#intro').fadeOut('350');

   // list
   this._projectList.downloadList();
};

/**
 * Show list of my projects
 * @private
 */
App.prototype._showMyProjects = function(){
   this._myProjectList.downloadList();
};

/**
 * Handle Successful login event
 */
App.prototype.onLoginSuccessful = function(){
   var self = this;
   $.ajax({
      url: '/userinfo',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
         self._onUserInfoArrived(data);
      },
      error: function (data) {
      }
   });
};

/**
 * Handle Successful download of userInfo
 * @param {object} userData
 * @private
 */
App.prototype._onUserInfoArrived = function(userData){
   if(userData == null){
      console.error('User data is not defined');
      return;
   }

   this._userData = userData;

   var $userInfo = $('#userInfo');
   $userInfo.find('.user .name').html(userData.name);
   $userInfo.find('.user .avatar').css("backgroundImage",  'url("' + userData.avatar + '")');
   $userInfo.css('display', 'block');
};

/**
 * Handle Failed login event
 *

App.prototype.onLoginFailed = function() {

}
 */



/**
 * The one and only application instance
 * @type {null}
 */
var g_app = null;
$(document).ready(function(){
   g_app = new App();
   g_app.initialize();
});