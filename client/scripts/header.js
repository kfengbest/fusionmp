/**
 * Header
 * @constructor
 */
function Header(){
   this._$ = null;
   this._$userInfo = null;
   this._$userName = null;
   this._$userAvatar = null;
   this._$login = null;
   this._$progress = null;
   this._$addProject = null;
}

/**
 * Initialize
 */
Header.prototype.initialize = function(){
   this._construct();
   this._connectEvents();
};

/**
 * Construct HTML DOM
 * @private
 */
Header.prototype._construct = function(){
   this._$ = $('<div id="header" class="notSelectable"></div>');

   // title
   var $title = $('<div class="title">Header</div>');
   this._$.append($title);

   // user info
   this._$userInfo = $('<div class="userInfo"></div>');
   this._$userAvatar = $('<div class="avatar"></div>');
   this._$userName = $('<div class="name"></div>');
   this._$userInfo.append(this._$userAvatar);
   this._$userInfo.append(this._$userName);
   this._$.append(this._$userInfo);

   // login
   this._$login = $('<div class="login">Login</div>');
   this._$.append(this._$login);

   // progress
   this._$progress = $('<div class="progress">progress...</div>');
   this._$.append(this._$progress);

   // add project
   this._$addProject = $('<div class="add">+</div>');
   this._$.append(this._$addProject);

   $('body').append(this._$)
};

/**
 * Connect events related to HTML DOM
 * @private
 */
Header.prototype._connectEvents = function(){
   var self = this;

   if(this._$login !== null){
      this._$login.bind('click', function() { self._onLogin(); });
   }
   if(this._$addProject !== null){
      this._$addProject.bind('click', function() { self._onAddProject(); });
   }
   if(this._$userInfo !== null){
      this._$userInfo.bind('click', function() { self._onUserInfo(); });
   }
};

/**
 * Display login button
 */
Header.prototype.showLogin = function(){
   if(this._$userInfo !== null){
      this._$userInfo.removeClass('visible');
   }
   if(this._$progress !== null){
      this._$progress.removeClass('visible');
   }
   if(this._$login !== null){
      this._$login.addClass('visible');
   }
};

/**
 * Display user info
 */
Header.prototype.showUserInfo = function(){
   if(this._$login !== null){
      this._$login.removeClass('visible');
   }
   if(this._$progress !== null){
      this._$progress.removeClass('visible');
   }
   if(this._$userInfo !== null){
      this._$userInfo.addClass('visible');
   }
};

/**
 * Display progress
 */
Header.prototype.showProgress = function(){
   if(this._$login !== null){
      this._$login.removeClass('visible');
   }
   if(this._$userInfo !== null){
      this._$userInfo.removeClass('visible');
   }
   if(this._$progress !== null){
      this._$progress.addClass('visible');
   }
};

/**
 * Display add project button
 */
Header.prototype.showAddProject = function(){
   if(this._$addProject !== null){
      this._$addProject.addClass('visible');
   }
};

/**
 * Hide add project button
 */
Header.prototype.hideAddProject = function(){
   if(this._$addProject !== null){
      this._$addProject.removeClass('visible');
   }
};

/**
 * Set user info
 * @param {string} name
 * @param {string} avatarUrl
 */
Header.prototype.setUserInfo = function(name, avatarUrl){
   if(this._$userAvatar !== null){
      this._$userAvatar.css('backgroundImage', 'url("' + avatarUrl + '")');
   }
   if(this._$userName !== null){
      this._$userName.html(name);
   }
};

/**
 * Check if user is signed-in in in background
 */
Header.prototype.checkLoginInImmediateMode = function(){
   this.showProgress();

   Oxygen.checkImmediate();

   //setTimeout(function(){
   //   g_app.onLoginSuccessful({
   //      "id": "ernest",
   //      "name": "Ernest Toth",
   //      "avatar": "http://www.ironmanmag.com.au/images/editorial/Back-muscles-neveux.jpg"
   //   });
   //}, 3000);
};

/**
 * Handle click on login button
 * @private
 */
Header.prototype._onLogin = function(){
   this.checkLoginInImmediateMode();
};

/**
 * Handle click on AddProject button
 * @private
 */
Header.prototype._onAddProject = function(){
   var popup = new Popup_AddProject();
   popup.show();
};

/**
 * Handle click on User info
 * @private
 */
Header.prototype._onUserInfo = function(){
   g_app.onLogout();
};