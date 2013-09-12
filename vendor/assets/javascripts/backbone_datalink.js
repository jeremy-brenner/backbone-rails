(function($) {
  return $.extend($.fn, {
    backboneLink: function(model) {
      return $(this).find(":input").each(function() {
        var el, name;
        el = $(this);
        name = el.attr("name");
        model.bind("change:" + name, function() {
          if( el.attr('type') != 'file' ){
            return el.val(model.get(name));
          }
        });
        return $(this).bind("change", function() {
          var attrs;
          el = $(this);
          if( el.attr('type') != 'file' ){
            attrs = {};
            attrs[el.attr("name")] = el.val();
            return model.set(attrs);
          }else{
            var file_reader = new FileReader();
            file_reader.onload = function(e){ 
              attrs = {};
              attrs[el.attr("name")] = e.currentTarget.result;
              return model.set(attrs);
            }
            return file_reader.readAsDataURL( this.files[0] );
          }
        });
      });
    }
  });
})(jQuery);

