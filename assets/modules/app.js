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
    },

    btnClose: function(e){
      var it = this;
      it.$el.find('#mask').fadeOut();
      it.$el.find('.ui-dialog.on').removeClass('on');
    },

    btnProductClose: function(e){
      var it = this;
      if(it.$el.find('#img-video .content').has('iframe').length) {
        this.startMP3();
      }

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
        $("#img-video .content").html('<embed src="http://player.youku.com/player.php/Type/Folder/Fid/19188186/Ob/1/sid/XNTQ4MTI1NjYw/v.swf" quality="high" width="800" height="500" align="middle" allowScriptAccess="always" allowFullScreen="true" mode="transparent" type="application/x-shockwave-flash"></embed>');
      }


      $('#mask-dialog').show();
      $('#img-video').show();
    },

    btnShowVideo: function(e) {
      this.stopMP3();

      $(e.currentTarget).parent().find('>img').click();
    },

    startMP3: function() {
      var _html = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="1" height="1">'+
                  '  <param name="movie" value="assets/player.swf?soundFile=assets/ok.mp3&bg=0xCDDFF3&leftbg=0x357DCE&lefticon=0xF2F2F2&rightbg=0x357DCE&rightbghover=0x4499EE&righticon=0xF2F2F2&righticonhover=0xFFFFFF&text=0x357DCE&slider=0x357DCE&track=0xFFFFFF&border=0xFFFFFF&loader=0x8EC2F4&autostart=yes&loop=yes" />'+
                  '  <param name="quality" value="high" />'+
                  '  <param value="transparent" name="wmode" />'+
                  '  <embed src="assets/player.swf?soundFile=assets/ok.mp3&bg=0xCDDFF3&leftbg=0x357DCE&lefticon=0xF2F2F2&rightbg=0x357DCE&rightbghover=0x4499EE&righticon=0xF2F2F2&righticonhover=0xFFFFFF&text=0x357DCE&slider=0x357DCE&track=0xFFFFFF&border=0xFFFFFF&loader=0x8EC2F4&autostart=yes&loop=yes" width="1" height="1" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"></embed>'+
                  '</object>';
      $("body").prepend(_html);
    },

    stopMP3: function() {
      $('object').remove();
    }

  });

  new AppView();
});