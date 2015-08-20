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
 * @param {object} userData
 */
App.prototype.onLoginSuccessful = function(userData){
   if(userData == null){
      console.error('User data is not defined');
      return;
   }

   this.userData = userData;

   this._header.setUserInfo(this.userData.name, this.userData.avatar);
   this._header.showUserInfo();
   this._header.showAddProject();
};

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