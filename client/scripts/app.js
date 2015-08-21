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
      self._downloadProjects();

      setTimeout(function() { Oxygen.checkImmediate(); }, 1000);
   });
};

/**
 * Download all projects
 * @private
 */
App.prototype._downloadProjects = function(){
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
            "$oid": "55d6204ee4b0ffba89aafccd17"
         },
         "title": "Project Chair",
         "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
         "imgUrl": "images/sketch_06.jpg",
         "budget": 1200,
         "deadline": "10/05/2020",
         "status": "done"
      },
      {
         "_id": {
            "$oid": "55d6204ee4b0ffba89aafd1dsd7"
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
      g_projects = data;
      self._projectList.renderList();
   }, 500);
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