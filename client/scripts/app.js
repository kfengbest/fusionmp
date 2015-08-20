/**
 * Application
 * @constructor
 */
function App(){
   /*
    {
       "id": {string},
       "name": {string},
       "avatar": {string}
    }
    */
   this.userData = null;

   this._header = new Header();
   this._list = new ProjectList();
}

/**
 * Initialize
 */
App.prototype.initialize = function(){
   this._header.initialize();
   this._header.checkLoginInImmediateMode();

   this._list.initialize();
   this._list.downloadList();
};

/**
 * Handle Successful login event
 *
 */
App.prototype.onLoginSuccessful = function(){
   var self = this;
   $.ajax({
      url: '/userinfo',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
         self.userInfoArrived(data);
      },
      error: function (data) {
      }
   });
};

/**
 * Handle Successful download of userInfo
 * @param userData
 *
 */
App.prototype.userInfoArrived = function(userData){
   if(userData == null){
      console.error('User data is not defined');
      return;
   }

   this.userData = userData;

   this._header.setUserInfo(this.userData.name, this.userData.avatar);
   this._header.showUserInfo();
   this._header.showAddProject();
}

/**
 * Handle Failed login event
 *
 */
App.prototype.onLoginFailed = function() {

}

/**
 * Handle Successful logout event
 */
App.prototype.onLogout = function(){
   this._header.hideAddProject();
   this._header.showLogin();
};



/**
 * The one and only application instance
 * @type {null}
 */
var g_app = null;
$(document).ready(function(){
   g_app = new App();
   g_app.initialize();
});