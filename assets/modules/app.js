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
      'click .box-product li>img' : 'btnShowImg',
      'click .box-product .tip.off.video' : 'btnShowVideo',
      'click #img-video .close'   :  "btnProductClose"
    },
    initialize: function(){
      this.offset = $(".container").offset();
      // alert( this.offset.left +','+ this.offset.top);

      this.startMP3();
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
      // console.log(this.offset, _style);

      it.$el.find('#mask').fadeIn(300, function(){
        it.$el.find('.ui-dialog').filter('.'+ className).css(_style).addClass('on');
      });

      this.stopMP3();
    },

    btnClose: function(e){
      var it = this;
      it.$el.find('#mask').fadeOut();
      it.$el.find('.ui-dialog.on').removeClass('on');

      this.startMP3();
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

    btnShowImg: function(e) {
      // console.log(e);
      var _e = $(e.currentTarget);
      var _type = _e.data('type');
      if(_type === 'image'){
        var image = _e.attr('src').replace('_small', '');
        $("#img-video .content").html('<img src="'+ image +'" />');
      }
      else {
        var video = _e.data('url');
        $("#img-video .content").html('<iframe height="500px" width="800px" src="'+ video +'" frameborder="0" allowfullscreen></iframe>');
      }


      $('#mask-dialog').show();
      $('#img-video').show();

      this.stopMP3();
    },

    btnShowVideo: function(e) {
      $(e.currentTarget).parent().find('>img').click();
    },

    startMP3: function() {
      var _html = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="160" height="21">'+
                  '  <param name="movie" value="assets/player.swf?mp3=assets/ok.mp3&amp;autostart=1" />'+
                  '  <param name="quality" value="high" />'+
                  '  <param value="transparent" name="wmode" />'+
                  '  <embed src="assets/player.swf?mp3=assets/ok.mp3&amp;autostart=1" width="160" height="21" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"></embed>'+
                  '</object>';
      $("body").append(_html);
    },

    stopMP3: function() {
      $('object').remove();
    }

  });

  new AppView();
});