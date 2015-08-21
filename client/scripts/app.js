/**
 * Application
 * @constructor
 */
function App(){
   this._projectList = new ProjectList();
   this._myProjectList = new MyProjectList();
}

/**
 * Initialize
 */
App.prototype.initialize = function(){
   var self = this;

   $('#userInfo .loginBtn').bind('click', function() { self._onLoginClick(); });

   this._projectList.initialize();
   this._myProjectList.initialize();

   this._showIntro();

   setTimeout(function(){
      self._hideIntro();
   }, 1500);
};

/**
 * Show intro
 * @private
 */
App.prototype._showIntro = function(){
   var $logo = $('.logo');
   $logo.addClass('introMode');
};

/**
 * Hide intro
 * @private
 */
App.prototype._hideIntro = function(){
   var self = this;
   var $logo = $('.logo');
   $logo.animate({ 'height': 160 }, 350, function() {
      $logo.removeClass('introMode');
      $logo.addClass('standardMode');
      $('#intro').fadeOut('350');
      self._downloadProjects(function() {
         setTimeout(function() { Oxygen.checkImmediate(); }, 300);
      });
   });
};

/**
 * Download all projects
 * @private
 */
App.prototype._downloadProjects = function(callback) {
   var self = this;
   $.ajax({
      url:         '/api/projects',
      type:        'GET',
      contentType: 'application/json',
      success:function (data) {
         console.log('GET - /api/projects - success', data);
         g_projects = data;
         self.updateProjects();
         if(callback != null){
            callback.call(self);
         }
      },
      error:function (error) {
         console.log('GET - /api/projects - error', error);
      }
   });
};

/**
 * Update all projects
 */
App.prototype.updateProjects = function(){
   this._projectList.renderList();
   if(g_userData !== null){
      this._myProjectList.renderList();
   }
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
         self._myProjectList.renderList();
      },
      error: function (error) {
         self._onUserInfoFailed();
      }
   });
};

/**
 * Update data for one project
 * @param data
 */
App.prototype.updateProjectData = function(data){
   if(data == null || data._id == null){
      return;
   }

   var projectId = data._id;

   for(var i = 0; i < g_projects.length; ++i){
      if(g_projects[i]._id === projectId){
         g_projects[i] = data;
         break;
      }
   }
};

/**
 * Handle Fail login event
 */
App.prototype.onLoginFailed = function(){
   this._onUserInfoFailed();
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

   g_userData = userData;

   var $userInfo = $('#userInfo');
   $userInfo.removeClass('loginMode');
   $userInfo.addClass('userMode');
   $userInfo.find('.user .name').html(g_userData.name);
   $userInfo.find('.user .avatar').css("backgroundImage",  'url("' + g_userData.avatar + '")');
   $userInfo.css('display', 'block');
};

/**
 * Handle Failed login event
 * @private
 */
App.prototype._onUserInfoFailed = function(){
   g_userData = null;

   var $userInfo = $('#userInfo');
   $userInfo.removeClass('userMode');
   $userInfo.addClass('loginMode');
   $userInfo.css('display', 'block');
};

/**
 * Handle click on login button
 * @private
 */
App.prototype._onLoginClick = function(){
   alert('TODO ... login');
};



/**
 * The one and only application instance
 * @type {null}
 */
var g_app = null;
var g_userData = null;
var g_projects = null;
$(document).ready(function(){
   g_app = new App();
   g_app.initialize();
});