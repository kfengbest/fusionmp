/**
 * Popup base class
 * @constructor
 */
function Popup(){
   this._$ = null;
   this._$closeBtn = null;
   this._$content = null;
}

/**
 * Show popup
 */
Popup.prototype.show = function(){
   if(this._$ !== null){
      console.warn('popup is already visible');
      return;
   }

   this._construct();
   this._connectEvents();

   $('body').append(this._$);
   this._$.addClass('show');
};

/**
 * Hide popup
 */
Popup.prototype.hide = function(){
   if(this._$ === null){
      console.warn('popup is already hidden');
      return;
   }

   this._$.removeClass('show');
   this._$.addClass('hide');
   var self = this;
   setTimeout(function() {
      self._$.remove();
      self._$ = null;
   }, 300);
};

/**
 * Construct HTML DOM
 * @private
 */
Popup.prototype._construct = function(){
   this._$ = $('<div id="popup"></div>');

   this._$closeBtn = $(' <div class="close notSelectable"></div>');
   this._$.append(this._$closeBtn);

   this._$content = $(' <div class="popupContent"></div>');
   this._$.append(this._$content);
};

/**
 * Connect events related to HTML DOM
 * @private
 */
Popup.prototype._connectEvents = function(){
   var self = this;

   if(this._$closeBtn !== null){
      this._$closeBtn.bind('click', function(e) { self._onClose(e); });
   }
};

/**
 * Handle click on close button
 * @param {object} e
 * @private
 */
Popup.prototype._onClose = function(e){
   this.hide();
};

