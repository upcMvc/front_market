function hasClass(elem, cls) {
  cls = cls || '';
  if (cls.replace(/\s/g, '').length == 0) return false;
  var ret = new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
  return ret;
}
document.getElementByClassName = function (className, index) {
  var nodes = document.getElementsByTagName("*");//获取页面里所有元素，因为他会匹配全页面元素，所以性能上有缺陷，但是可以约束他的搜索范围；
  var arr = [];
  for (var i = 0; i < nodes.length; i++) {
    if (hasClass(nodes[i], className)) arr.push(nodes[i]);
  }
  if (!index) index = 0;
  return index == -1 ? arr : arr[index];
}
function addClass(elements, cName) {
  if (!hasClass(elements, cName)) {
    elements.className += " " + cName;
  }

}
function removeClass(elements, cName) {
  if (hasClass(elements, cName)) {
    elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " "); // replace方法是替换
  }
}

var _ajax = function () {
};
_ajax.prototype = {
  request: function (method, url, callback, postVars) {
    var xhr = this.createXhrObject()();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      (xhr.status === 200) ?
        callback.success(xhr.responseText, xhr.responseXML) :
        callback.failure(xhr, status);
    };
    if (method !== "POST" && postVars) {
      url += "?" + this.JSONStringify(postVars);
      postVars = null;
    }
    xhr.open(method, url, true);
    xhr.send(postVars);
  },
  createXhrObject: function () {
    var methods = [
        function () {
          return new XMLHttpRequest();
        },
        function () {
          return new ActiveXObject("Msxml2.XMLHTTP");
        },
        function () {
          return new ActiveXObject("Microsoft.XMLHTTP");
        }
      ],
      i = 0,
      len = methods.length;
    for (; i < len; i++) {
      try {
        methods[i];
      } catch (e) {
        continue;
      }
      this.createXhrObject = methods[i];
      return methods[i];
    }
    throw new Error("ajax created failure");
  },
  JSONStringify: function (obj) {
    return JSON.stringify(obj).replace(/"|{|}/g, "")
      .replace(/b:b/g, "=")
      .replace(/b,b/g, "&");
  }
};


var tncode = {
  _x: 0,
  _obj: null,
  _tncode: null,
  _img: null,
  _is_draw_bg: false,
  _block_start_x: 0,
  _block_start_y: 0,
  _doing: false,
  _mark_w: 50,
  _mark_h: 50,
  _mark_offset: 0,
  _img_w: 240,
  _img_h: 150,
  _result: false,
  _onsuccess: null,
  _bind: function (elm, evType, fn) {
    if (elm.addEventListener) {
      elm.addEventListener(evType, fn);//DOM2.0
      return true;
    } else if (elm.attachEvent) {
      var r = elm.attachEvent(evType, fn);//IE5+
      return r;
    }
  },
  _block_start_move: function (e) {
    e.preventDefault();
    var theEvent = window.event || e;
    if (theEvent.touches) {
      theEvent = theEvent.touches[0];
    }

    console.log("_block_start_move");

    var obj = document.getElementByClassName('slide_block_text');
    obj.style.display = "none";
    tncode._draw_bg();
    tncode._block_start_x = theEvent.clientX;
    tncode._block_start_y = theEvent.clientY;
    tncode._doing = true;
  },

  _block_on_move: function (e) {
    e.preventDefault();
    var theEvent = window.event || e;
    if (theEvent.touches) {
      theEvent = theEvent.touches[0];
    }

    if (!tncode._doing)return true;
    console.log("_block_on_move");
    var offset = theEvent.clientX - tncode._block_start_x;
    if (offset < 0) {
      offset = 0;
    }
    var max_off = tncode._img_w - tncode._mark_w;
    if (offset > max_off) {
      offset = max_off;
    }
    var obj = document.getElementByClassName('slide_block');
    obj.style.cssText = "transform: translate(" + offset + "px, 0px)";
    tncode._mark_offset = offset / max_off * (tncode._img_w - tncode._mark_w);
    tncode._draw_bg();
    tncode._draw_mark();
  },

  _block_on_end: function (e) {
    e.preventDefault();
    var theEvent = window.event || e;
    if (theEvent.touches) {
      theEvent = theEvent.touches[0];
    }

    if (!tncode._doing)return true;
    tncode._doing = false;
    console.log("_block_on_end");

    tncode._send_result();
  },
  _send_result: function () {

    var re = (Math.abs(tncode._x - tncode._mark_offset) <= 3);
    console.log(re);

    if (re == true) {
      tncode._tncode.innerHTML = '√验证成功';
      tncode._showmsg('√验证成功', 1);
      tncode._result = true;
      document.getElementByClassName('hgroup').style.display = "block";

      var tn_input = document.getElementById('tncode');
      tn_input.value = '验证成功';

      setTimeout(tncode.hide, 3000);
      if (tncode._onsuccess) {
        tncode._onsuccess();
      }
    } else {
      var obj = document.getElementById('tncode_div');
      addClass(obj, 'dd');
      setTimeout(function () {
        removeClass(obj, 'dd');
      }, 200);
      tncode._result = false;
      tncode._showmsg('验证失败');
    }

  },
  _send_result_success: function (responseText, responseXML) {
    console.log(responseText);
    if (responseText == 'ok') {
      tncode._tncode.innerHTML = '√验证成功';
      tncode._showmsg('√验证成功', 1);
      tncode._result = true;
      document.getElementByClassName('hgroup').style.display = "block";
      setTimeout(tncode.hide, 3000);
      if (tncode._onsuccess) {
        tncode._onsuccess();
      }
    } else {
      var obj = document.getElementById('tncode_div');
      addClass(obj, 'dd');
      setTimeout(function () {
        removeClass(obj, 'dd');
      }, 200);
      tncode._result = false;
      tncode._showmsg('验证失败');
    }
  },

  _get_code: function (responseText, responseXML) {
    var result = JSON.parse(responseText);
    tncode._img.crossOrigin = "Anonymous";
    tncode._img.src = result.url;
    tncode._x = result.x;
    tncode._img.onload = function () {
      tncode._draw_fullbg();
      var canvas_mark = document.getElementByClassName('tncode_canvas_mark');
      var ctx_mark = canvas_mark.getContext('2d');
      ctx_mark.clearRect(0, 0, canvas_mark.width, canvas_mark.height);
    };
    var obj = document.getElementByClassName('slide_block');
    obj.style.cssText = "transform: translate(0px, 0px)";
    obj = document.getElementByClassName('slide_block_text');
    obj.style.display = "block";
  },
  _send_result_failure: function (xhr, status) {

  },
  _draw_fullbg: function () {
    var canvas_bg = document.getElementByClassName('tncode_canvas_bg');
    var ctx_bg = canvas_bg.getContext('2d');
    ctx_bg.drawImage(tncode._img, 0, tncode._img_h * 2, tncode._img_w, tncode._img_h, 0, 0, tncode._img_w, tncode._img_h);
  },
  _draw_bg: function () {
    if (tncode._is_draw_bg) {
      return;
    }
    tncode._is_draw_bg = true;
    var canvas_bg = document.getElementByClassName('tncode_canvas_bg');
    var ctx_bg = canvas_bg.getContext('2d');
    ctx_bg.drawImage(tncode._img, 0, 0, tncode._img_w, tncode._img_h, 0, 0, tncode._img_w, tncode._img_h);
  },
  _draw_mark: function () {
    var canvas_mark = document.getElementByClassName('tncode_canvas_mark');
    var ctx_mark = canvas_mark.getContext('2d');
    ctx_mark.clearRect(0, 0, canvas_mark.width, canvas_mark.height);
    ctx_mark.drawImage(tncode._img, 0, tncode._img_h, tncode._mark_w, tncode._img_h, tncode._mark_offset, 0, tncode._mark_w, tncode._img_h);

    var imageData = ctx_mark.getImageData(0, 0, tncode._img_w, tncode._img_h);

    var data = imageData.data;
    var x = tncode._img_h, y = tncode._img_w;
    for (var j = 0; j < x; j++) {
      var ii = 1, k1 = -1;
      for (var k = 0; k < y && k >= 0 && k > k1;) {
        var i = (j * y + k) * 4;
        k += ii;
        var r = data[i]
          , g = data[i + 1]
          , b = data[i + 2];
        if (r + g + b < 200) data[i + 3] = 0;
        else {
          var arr_pix = [1, -5];
          var arr_op = [250, 0];
          for (var i = 1; i < arr_pix[0] - arr_pix[1]; i++) {
            var iiii = arr_pix[0] - 1 * i;
            var op = parseInt(arr_op[0] - (arr_op[0] - arr_op[1]) / (arr_pix[0] - arr_pix[1]) * i);
            var iii = (j * y + k + iiii * ii) * 4;
            data[iii + 3] = op;
          }
          if (ii == -1) {
            break;
          }
          k1 = k;
          k = y - 1;
          ii = -1;
        }
        ;
      }
    }
    ctx_mark.putImageData(imageData, 0, 0);
  },
  _reset: function () {
    tncode._mark_offset = 0;
    tncode._draw_bg();
    tncode._draw_mark();
    var obj = document.getElementByClassName('slide_block');
    obj.style.cssText = "transform: translate(0px, 0px)";
  },
  show: function () {
    var obj = document.getElementByClassName('hgroup');
    if (obj) {
      obj.style.display = "none";
    }
    tncode.refresh();
    tncode._tncode = this;
    document.getElementById('tncode_div_bg').style.display = "block";
    document.getElementById('tncode_div').style.display = "block";
  },
  hide: function () {
    document.getElementById('tncode_div_bg').style.display = "none";
    document.getElementById('tncode_div').style.display = "none";
  },
  _showmsg: function (msg, status) {
    if (!status) {
      status = 0;
      var obj = document.getElementByClassName('tncode_msg_error');
    } else {
      var obj = document.getElementByClassName('tncode_msg_ok');
    }
    obj.innerHTML = msg;
    var setOpacity = function (ele, opacity) {
      if (ele.style.opacity != undefined) {
        ele.style.opacity = opacity / 100;
      } else {
        ele.style.filter = "alpha(opacity=" + opacity + ")";
      }
    };

    function fadeout(ele, opacity, speed) {
      if (ele) {
        var v = ele.style.filter.replace("alpha(opacity=", "").replace(")", "") || ele.style.opacity || 100;
        v < 1 && (v = v * 100);
        var count = speed / 1000;
        var avg = (100 - opacity) / count;
        var timer = null;
        timer = setInterval(function () {
          if (v - avg > opacity) {
            v -= avg;
            setOpacity(ele, v);
          } else {
            setOpacity(ele, 0);
            if (status == 0) {
              tncode._reset();
            }
            clearInterval(timer);
          }
        }, 100);
      }
    }

    function fadein(ele, opacity, speed) {
      if (ele) {
        var v = ele.style.filter.replace("alpha(opacity=", "").replace(")", "") || ele.style.opacity;
        v < 1 && (v = v * 100);
        var count = speed / 1000;
        var avg = count < 2 ? (opacity / count) : (opacity / count - 1);
        var timer = null;
        timer = setInterval(function () {
          if (v < opacity) {
            v += avg;
            setOpacity(ele, v);
          } else {
            clearInterval(timer);
            setTimeout(function () {
              fadeout(obj, 0, 6000);
            }, 1000);
          }
        }, 100);
      }
    }

    fadein(obj, 80, 4000);
  },
  _html: function () {
    var d = document.getElementById('tncode_div_bg');
    if (d)return;
    var html = '<div class="tncode_div_bg" id="tncode_div_bg"></div><div class="tncode_div" id="tncode_div"><canvas class="tncode_canvas_bg"></canvas><canvas class="tncode_canvas_mark"></canvas><div class="hgroup"></div><div class="tncode_msg_error"></div><div class="tncode_msg_ok"></div><div class="slide"><div class="slide_block"></div><div class="slide_block_text">拖动左边滑块完成上方拼图</div></div><div class="tools"><div class="tncode_close"></div><div class="tncode_refresh"></div><div class="tncode_tips"></div></div></div>';
    var bo = document.getElementsByTagName('body');

    var divTemp = document.createElement("div"), nodes = null
      , fragment = document.createDocumentFragment();
    divTemp.innerHTML = html;
    nodes = divTemp.childNodes;
    for (var i = 0, length = nodes.length; i < length; i += 1) {
      fragment.appendChild(nodes[i].cloneNode(true));
    }
    bo[0].appendChild(fragment);
    nodes = null;
    fragment = null;
  },
  refresh: function () {
    var isSupportWebp = !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
    var _this = this;
    tncode._is_draw_bg = false;
    tncode._result = false;
    tncode._img = new Image();
    var haddle = {success: tncode._get_code, failure: tncode._send_result_failure};
    var re = new _ajax();
    console.log(tncode._mark_offset);
    re.request('get', 'http://123.207.144.29/tncode.php', haddle);


  },
  init: function () {
    var _this = this;
    if (!tncode._img) {
      tncode._html();
      var obj = document.getElementByClassName('slide_block');
      tncode._bind(obj, 'mousedown', _this._block_start_move);
      tncode._bind(document, 'mousemove', _this._block_on_move);
      tncode._bind(document, 'mouseup', _this._block_on_end);

      tncode._bind(obj, 'touchstart', _this._block_start_move);
      tncode._bind(document, 'touchmove', _this._block_on_move);
      tncode._bind(document, 'touchend', _this._block_on_end);

      var obj = document.getElementByClassName('tncode_close');
      tncode._bind(obj, 'touchstart', _this.hide);
      tncode._bind(obj, 'click', _this.hide);
      var obj = document.getElementByClassName('tncode_refresh');
      tncode._bind(obj, 'touchstart', _this.refresh);
      tncode._bind(obj, 'click', _this.refresh);
      var objs = document.getElementByClassName('tncode', -1);
      for (var i in objs) {
        var o = objs[i];
        o.innerHTML = '点击按钮进行验证';
        tncode._bind(o, 'touchstart', _this.show);
        tncode._bind(o, 'click', _this.show);
      }
    }
  },
  onsuccess: function (fn) {
    tncode._onsuccess = fn;
  }
};
export default tncode;


