!function (e) {
  e.fn.feedify = function () {
    var i = this;
    e(window).bind("scroll touchmove", function (d) {
      i.children(".feedify-item").each(function () {
        var d = e(this),
          t = i.width(),
          s = e(this).height(),
          h = e(this).children(".feedify-item-header").outerHeight(),
          f = d.offset(),
          o = f.top - e(window).scrollTop(),
          c = "-" + (s - h);
        o > c && 0 > o ? (e(this).addClass("fixed").removeClass("bottom").children(".feedify-item-header").css("width", t),
          e(this).children(".feedify-item-body").css("paddingTop", h),
          e(this).children(".feedify-item-header").css("width", t)) : c >= o ? (e(this).removeClass("fixed").addClass("bottom"),
          e(this).children(".feedify-item-body").css("paddingTop", h),
          e(this).children(".feedify-item-header").css("width", t)) : (e(this).removeClass("fixed").removeClass("bottom").children(".feedify-item-header").css("width", "auto"),
          e(this).children(".feedify-item-body").css("paddingTop", "0"),
          e(this).children(".feedify-item-header").css("width", "auto"))
      })
    })
  }
}(jQuery);
