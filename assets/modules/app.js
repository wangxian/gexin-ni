define(function(require) {
  var _ = require('gallery/underscore/1.4.4/underscore.js');
  var backbone = require('gallery/backbone/1.0.0/backbone.js');

  var AppView = backbone.View.extend({
    el: 'body',
    events: {
      'click .container img': "btnImg",
      'click .ui-dialog-close': "btnClose",
      'mouseenter .box-product li': 'mouseEnter',
      'mouseleave .box-product li': 'mouseLeave',
      'click .box-product li>img' : 'btnShow',
      'click #img-video .close'   :  "btnProductClose"
    },
    initialize: function(){
      this.offset = $(".container").offset();
      // alert( this.offset.left +','+ this.offset.top);
    },
    btnImg: function(e){
      var _e = this.$(e.currentTarget);
      var className = _e.attr('class');
      var it = this;

      if(className === 'etdream'){
        e.preventDefault();
        return false;
      }

      var _style  = $(".container").offset();
      var _offset = _e.attr('data-offset');
      var offsetAP;
      if(_offset) {
        offsetAP = _offset.split(',');
        _style.left = _style.left + offsetAP[0]*1;
        _style.top  = _style.top  + offsetAP[1]*1;
      }
      console.log(this.offset, _style);

      it.$el.find('#mask').fadeIn(300, function(){
        it.$el.find('.ui-dialog').filter('.'+ className).css(_style).addClass('on');
      });
    },

    btnClose: function(e){
      var it = this;
      it.$el.find('#mask').fadeOut();
      it.$el.find('.ui-dialog.on').removeClass('on');
    },

    btnProductClose: function(e){
      var it = this;
      it.$el.find('#mask-dialog').fadeOut();
      it.$el.find('#img-video .content').empty();
      it.$el.find('#img-video').hide();
    },

    mouseEnter: function(e) {
      var _e = $(e.currentTarget);
      _e.find('.tip').addClass('off');
      // console.log('enter');
    },

    mouseLeave: function(e) {
      var _e = $(e.currentTarget);
      _e.find('.tip').removeClass('off');
      // console.log('leave');
    },

    btnShow: function(e) {
      var _e = $(e.currentTarget);
      var _type = _e.data('type');

      $("#img-video .content").html('<iframe height=498 width=510 src="http://player.youku.com/embed/XNTQ1MTIyMTc2" frameborder=0 allowfullscreen></iframe>');
      $('#mask-dialog').show();
      $('#img-video').show();
    }




  });

  new AppView();
});