define(function(require) {
  var _ = require('gallery/underscore/1.4.4/underscore.js');
  var backbone = require('gallery/backbone/1.0.0/backbone.js');

  var AppView = backbone.View.extend({
    el: 'body',
    events: {
      'click .container img': "btnImg",
      'click .ui-dialog-close': "btnClose"
    },
    initialize: function(){

    },
    btnImg: function(e){
      var _e = this.$(e.currentTarget);
      var className = _e.attr('class');
      var it = this;

      if(className === 'etdream'){
        e.preventDefault();
        return false;
      }

      var style = _e.position();
      // style.left = e.clientX;
      // style.top  = e.clientY;
      // console.log(_e.position());

      var offset = _e.attr('data-offset');
      var offsetAP;
      if(offset) {
        offsetAP = offset.split(',');
        style.left = style.left - offsetAP[0];
        style.top  = style.top - offsetAP[1];
      }
      // console.log(style);

      it.$el.find('#mask').fadeIn(300, function(){
        it.$el.find('.ui-dialog').filter('.'+ className).css(style).addClass('on');
      });
    },
    btnClose: function(e){
      var it = this;
      it.$el.find('#mask').fadeOut();
      it.$el.find('.ui-dialog.on').removeClass('on');
    }

  });

  new AppView();
});