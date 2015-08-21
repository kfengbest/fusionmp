/**
 * Popup base class
 * @constructor
 */
function Popup(){
   this._$ = null;
   this._$closeBtn = null;
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
   this._$ = $('<div class="popup"></div>');

   this._$.append('<div class="darkMode logo"><div class="line notSelectable"><div class="text"><div class="bigTitle">MARKETPLACE</div><div class="smallTitle">for Fusion</div></div></div></div>');

   this._$closeBtn = $(' <div class="closeBtn"></div>');
   this._$.append(this._$closeBtn);
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

