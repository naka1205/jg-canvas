/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.$A = function (iterable) {
    if (!iterable) return [];
    if (iterable.toArray) return iterable.toArray();
    var length = iterable.length || 0,
        results = new Array(length);
    while (length--) {
        results[length] = iterable[length];
    }return results;
};

var Class = {};

Class = {
    create: function create() {
        var parent = null,
            properties = $A(arguments);
        if (Object.isFunction(properties[0])) parent = properties.shift();
        function klass() {
            this.initialize.apply(this, arguments);
        }
        Object.extend(klass, Class.Methods);
        klass.superclass = parent;
        klass.subclasses = [];
        if (parent) {
            var subclass = function subclass() {};
            subclass.prototype = parent.prototype;
            klass.prototype = new subclass();
            parent.subclasses.push(klass);
        }
        for (var i = 0; i < properties.length; i++) {
            klass.addMethods(properties[i]);
        }if (!klass.prototype.initialize) klass.prototype.initialize = Prototype.emptyFunction;
        klass.prototype.constructor = klass;
        return klass;
    }
};
Class.Methods = {
    addMethods: function addMethods(source) {
        var ancestor = this.superclass && this.superclass.prototype;
        var properties = Object.keys(source);
        if (!Object.keys({ toString: true }).length) properties.push("toString", "valueOf");
        for (var i = 0, length = properties.length; i < length; i++) {
            var property = properties[i],
                value = source[property];
            if (ancestor && Object.isFunction(value) && value.argumentNames().first() == "$super") {
                var method = value;
                value = function (m) {
                    return function () {
                        return ancestor[m].apply(this, arguments);
                    };
                }(property).wrap(method);
                value.valueOf = method.valueOf.bind(method);
                value.toString = method.toString.bind(method);
            }
            this.prototype[property] = value;
        }
        return this;
    }
};

module.exports = Class;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Class = __webpack_require__(0);
var JObject = {};

JObject = Class.create({
    ID: null, //对象标识，需唯一
    position: null, //绝对位置{x:0,y:0}
    alpha: null, //透明度
    moveStep: null, //移动步伐{x:0,y:0}
    canMove: true, //是否可移动
    size: null, //对象长宽{width:0,height:0}
    blockAngle: null, //旋转角度
    rotationStep: null, //旋转步伐
    blockInvert: null, //是否反转
    BGColor: null, //背景颜色
    BGColorAlpha: null, //背景颜色透明度
    BGImage: null, //背景图片
    BGImageAlpha: null, //背景透明度
    BGImagePosition: null, //背景图片开始显示位置
    BGImageSize: null, //背景图片显示的长宽
    focus: null, //是否为焦点
    controls: null, //子对象数组
    parent: null, //父对象
    relativePosition: null, //与父对象的相对位置
    enabled: null, //是否为激活状态
    visible: null, //是否显示
    showImageData: null, //该对象以及其子对象的缓存图片数据
    isHighLight: null, //是否高亮
    onFocus: null, //自定义获取焦点事件
    onClick: null, //自定义点击事件
    onMouseDown: null, //自定义鼠标键按下事件
    onMouseUp: null, //自定义鼠标键弹起事件
    onKeyDown: null, //自定义键盘按下事件
    onKeyUp: null, //自定义键盘弹起事件
    keyCode: null,
    initialize: function initialize(argP, argWH) {
        //类构造函数，初始化数据
        this.ID = JMain.JID++;
        this.position = argP;
        if (argWH) {
            this.size = argWH;
        } else {
            this.size = { width: 0, height: 0 };
        }
        this.BGColorAlpha = 1.0;
        this.BGImageAlpha = 1.0;
        this.moveStep = { x: 0, y: 0 };
        this.fontColor = JColor.black;
        this.textPos = { x: 0, y: 0 };
        this.alpha = 1.0;
        if (argP) this.relativePosition = argP;else this.relativePosition = { x: 0, y: 0 };
        this.controls = [];
        this.parent = null;
        this.enabled = true;
        this.visible = true;
    },
    setSize: function setSize(size) {
        //设置宽高
        this.size = size;
        return this;
    },
    setBGColor: function setBGColor(bgColor) {
        //设置背景颜色
        this.BGColor = bgColor;
        return this;
    },
    setBGImage: function setBGImage(image) {
        //设置背景图片
        this.BGImage = image.data;
        this.BGImagePosition = { x: 0, y: 0 };
        this.BGImageSize = { width: image.cellSize.width, height: image.cellSize.height };
        // console.log(this.BGImageSize);
        return this;
    },
    setKeyCode: function setKeyCode(keyCode) {
        this.keyCode = keyCode;
        return this;
    },
    setRelativePosition: function setRelativePosition(relativePosition) {
        //设置与父对象的相对位置
        this.relativePosition = relativePosition;
        return this;
    },
    setFocus: function setFocus() {
        //获取焦点
        if (JMain.JFocusControl) JMain.JFocusControl.lostFocus();
        this.focus = true;
        JMain.JFocusControl = this;
        if (this.onFocus) this.onFocus();
    },
    lostFocus: function lostFocus() {
        //失去焦点
        this.focus = false;
        JMain.JFocusControl = null;
    },
    pointInBlock: function pointInBlock(e, _this) {
        //判断_this对象是否包含坐标e
        if (!_this) _this = this;
        if (e.x >= _this.position.x && e.x < _this.position.x + _this.size.width && e.y >= _this.position.y && e.y < _this.position.y + _this.size.height) return true;else return false;
    },
    onControlClick: function onControlClick() {
        //点击对象时，会调用该函数
        if (!this.visible || !this.enabled) return false;
        for (var i = this.controls.length - 1; i >= 0; i--) {
            if (this.controls[i].pointInBlock(JMain.JForm.mousePosition, this.controls[i]) && this.controls[i].onControlClick.call(this.controls[i])) return true;
        }
        if (this.onClick && this.onClick(JMain.JForm.mousePosition)) return true; //如果有自定义点击事件并且执行后返回true，则返回true停止递归，结束点击事件
        else return false; //返回false继续遍历
    },
    onControlMouseDown: function onControlMouseDown() {
        //点击对象时，鼠标键按下会调用该函数
        if (!this.visible || !this.enabled) return false;
        for (var i = this.controls.length - 1; i >= 0; i--) {
            if (this.controls[i].pointInBlock(JMain.JForm.mousePosition, this.controls[i]) && this.controls[i].onControlMouseDown.call(this.controls[i])) return true;
        }
        if (this.onMouseDown && this.onMouseDown()) return true;else return false;
    },
    onControlMouseUp: function onControlMouseUp() {
        //点击对象时，鼠标键弹起会调用该函数
        if (!this.visible || !this.enabled) return false;
        for (var i = this.controls.length - 1; i >= 0; i--) {
            if (this.controls[i].pointInBlock(JMain.JForm.mousePosition, this.controls[i]) && this.controls[i].onControlMouseUp.call(this.controls[i])) return true;
        }
        if (this.onMouseUp && this.onMouseUp()) return true;
        return false;
    },
    onControlKeyDown: function onControlKeyDown(keyCode) {
        //键盘按下时，会调用该函数
        if (!this.visible || !this.enabled) return false;
        for (var i = this.controls.length - 1; i >= 0; i--) {
            if (this.controls[i].onControlKeyDown.call(this.controls[i], keyCode)) return true;
        }
        if (this.onKeyDown && this.onKeyDown(keyCode)) return true;else return false;
    },
    onControlKeyUp: function onControlKeyUp(keyCode) {
        //键盘弹起时，会调用该函数
        if (!this.visible || !this.enabled) return false;
        for (var i = this.controls.length - 1; i >= 0; i--) {
            if (this.controls[i].onControlKeyUp.call(this.controls[i], keyCode)) return true;
        }
        if (this.onKeyUp && this.onKeyUp(keyCode)) return true;else return false;
    },
    addControlInLast: function addControlInLast(aObj) {
        //把对象数组aObj加在子对象数组后面
        for (var i = 0; i < aObj.length; i++) {
            if (aObj[i]) {
                var length = this.controls.length;
                this.controls[length] = aObj[i];
                this.controls[length].parent = this;
                if (this.position) {
                    this.controls[length].position = { x: this.position.x + this.controls[length].relativePosition.x,
                        y: this.position.y + this.controls[length].relativePosition.y };
                }
            }
        }
    },
    removeControl: function removeControl(objID) {
        //根据对象名称删除子对象数组中的对象
        for (var i = 0; i < this.controls.length; i++) {
            if (objID == this.controls[i].ID) {
                this.controls.splice(i, 1);
                break;
            }
        }
    },
    remove: function remove() {
        //删除当前对象
        if (this.parent) {
            this.parent.removeControl.call(this.parent, this.ID);
        } else {
            this.ID = null;
        }
    },
    clearControls: function clearControls() {
        //清空子对象数组
        this.controls = [];
    },
    saveShowImageData: function saveShowImageData() {
        //保存该对象以及其子对象的缓存图片数据
        var w = parseInt(this.size.width * JMain.JZoom.x),
            h = parseInt(this.size.height * JMain.JZoom.y);
        var relativePosition = this.relativePosition;
        var parent = this.parent;
        this.parent = null;
        this.relativePosition = { x: 0, y: 0 };
        JMain.JForm.canvas.width = w;
        JMain.JForm.canvas.height = h;
        this.showImageData = null;
        this.show();
        this.showImageData = JFunction.getImageData(JMain.JForm.context, this.relativePosition, { width: w, height: h });
        this.parent = parent;
        this.relativePosition = relativePosition;
        JMain.JForm.canvas.width = parseInt(JMain.JForm.size.width * JMain.JZoom.x);
        JMain.JForm.canvas.height = parseInt(JMain.JForm.size.height * JMain.JZoom.y);
    },
    beginShow: function beginShow() {
        //显示该对象前执行
        this.position.x = this.relativePosition.x;
        this.position.y = this.relativePosition.y;
        if (this.parent) {
            this.position.x += this.parent.position.x;
            this.position.y += this.parent.position.y;
        }
    },
    showing: function showing(x, y, w, h) {
        //显示该对象时执行
        for (var member = 0; member < this.controls.length; member++) {
            this.controls[member].show.call(this.controls[member]);
        }
        if (!this.enabled) {
            var imageData = JFunction.getImageData(JMain.JForm.context, { x: x, y: y }, { width: w, height: h });
            JFunction.drawImageData(JMain.JForm.context, JFunction.changeToGray(imageData), { x: x, y: y });
        }
    },
    endShow: function endShow() {
        //显示该对象后执行
        if (this.rotationStep) {
            this.blockAngle += this.rotationStep;
            this.blockAngle = this.blockAngle % 360;
        }
        if (this.canMove && this.moveStep) {
            this.relativePosition.x += this.moveStep.x;
            this.relativePosition.y += this.moveStep.y;
        }
    },
    show: function show() {
        //显示该对象
        this.beginShow();
        if (this.visible && this.size) {
            if (this.showImageData) {
                //如果有缓存数据，直接绘图
                JFunction.drawImageData(JMain.JForm.context, this.showImageData, { x: parseInt(this.position.x * JMain.JZoom.x), y: parseInt(this.position.y * JMain.JZoom.y) });
            } else {
                var _context = JMain.JForm.context;
                if (this.ID == null) return;
                var x = parseInt(this.position.x * JMain.JZoom.x);
                var y = parseInt(this.position.y * JMain.JZoom.y);
                var w = parseInt(this.size.width * JMain.JZoom.x);
                var h = parseInt(this.size.height * JMain.JZoom.y);
                if (_context) {
                    if (this.alpha < 1) {
                        //设置画布透明度
                        _context.save();
                        _context.globalAlpha = this.alpha;
                    }
                    if (this.blockInvert) {
                        //翻转画布
                        _context.save();
                        _context.translate(x + parseInt(w / 2), 0);
                        _context.scale(-1, 1);
                        _context.translate((x + parseInt(w / 2)) * -1, 0);
                    }
                    if (this.blockAngle) {
                        //旋转画布
                        _context.save();
                        _context.translate(x + parseInt(w / 2), y + parseInt(h / 2));
                        x = -parseInt(w / 2);
                        y = -parseInt(h / 2);
                        _context.rotate(this.blockAngle * Math.PI / 180);
                    }
                    if (this.BGColor) {
                        //绘制背景颜色
                        _context.save();
                        _context.globalAlpha = this.alpha * this.BGColorAlpha;
                        _context.fillStyle = this.BGColor.data;
                        _context.fillRect(x, y, w, h);
                        _context.restore();
                    }
                    if (this.BGImage) {
                        //绘制背景图片
                        _context.save();
                        _context.globalAlpha = this.alpha * this.BGImageAlpha;
                        _context.drawImage(this.BGImage, this.BGImagePosition.x, this.BGImagePosition.y, this.BGImageSize.width, this.BGImageSize.height, x, y, w, h);
                        _context.restore();
                    }
                    this.showing && this.showing(x, y, w, h); //如果有showing事件，则执行该事件
                    if (this.blockAngle) _context.restore(); //如果画布有旋转则恢复到旋转前状态
                    if (this.blockInvert) {
                        //如果画布有翻转则恢复到翻转前状态
                        _context.translate(JMain.JForm.size.width - x - parseInt(w / 2), 0);
                        _context.scale(-1, 1);
                        _context.translate((JMain.JForm.size.width - x - parseInt(w / 2)) * -1, 0);
                        _context.restore();
                    }
                    if (this.alpha < 1) _context.restore(); //恢复画布透明度
                }
            }
        }
        this.endShow();
    }
});

module.exports = JObject;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var JClass = {
    Class: __webpack_require__(0),
    Object: __webpack_require__(3),
    JObject: __webpack_require__(1),
    JPanel: __webpack_require__(4),
    JForm: __webpack_require__(5),
    JButton: __webpack_require__(6),
    JLabel: __webpack_require__(7),
    JTick: __webpack_require__(8),
    JAudio: __webpack_require__(9),
    JMessageBox: __webpack_require__(10),
    JAnimationBox: __webpack_require__(11),
    JPictureBox: __webpack_require__(12),
    JPreLoad: __webpack_require__(13),
    JBase64: __webpack_require__(14),
    JFunction: __webpack_require__(15),
    JColor: __webpack_require__(16),
    JMain: __webpack_require__(17)
};

module.exports = JClass;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.extend = function (destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }return destination;
};

Object.extend(Object, {
    keys: function keys(object) {
        var keys = [];
        for (var property in object) {
            keys.push(property);
        }return keys;
    },
    isFunction: function isFunction(object) {
        return typeof object == "function";
    },
    isUndefined: function isUndefined(object) {
        return typeof object == "undefined";
    }
});

Object.extend(Function.prototype, {
    argumentNames: function argumentNames() {
        var names = this.toString().match(/^[\s\(]*function[^(]*\(([^\)]*)\)/)[1].replace(/\s+/g, '').split(',');
        return names.length == 1 && !names[0] ? [] : names;
    },
    bind: function bind() {
        if (arguments.length < 2 && Object.isUndefined(arguments[0])) return this;
        var __method = this,
            args = $A(arguments),
            object = args.shift();
        return function () {
            return __method.apply(object, args.concat($A(arguments)));
        };
    },
    wrap: function wrap(wrapper) {
        var __method = this;
        return function () {
            return wrapper.apply(this, [__method.bind(this)].concat($A(arguments)));
        };
    }
});

Object.extend(Array.prototype, {
    first: function first() {
        return this[0];
    }
});

module.exports = Object;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Class = __webpack_require__(0);
var JObject = __webpack_require__(1);
var JPanel = {};

JPanel = Class.create(JObject, { //从父类继承
    closeButton: null, //关闭按钮
    title: null, //显示标题的控件
    isShowTitle: null, //是否显示标题栏
    titleHeight: 40, //标题栏高度
    initialize: function initialize($super, argP, argWH) {
        $super(argP, argWH);
        this.titleHeight = 40;
        this.initTitle();
        this.hideTitle();
    },
    initTitle: function initTitle() {
        this.isShowTitle = true;
        this.title = new JLabel({ x: 0, y: 0 }).setSize({ width: this.size.width, height: this.titleHeight }).setBGColor(JColor.blue).setFontSize(27).setTextBaseline("middle").setFontType("bold").setTextPos({ x: 20, y: 0 });
        this.closeButton = new JButton({ x: this.size.width - 60, y: 0 }, { width: 60, height: this.titleHeight }).setBGColor(JColor.white);
        this.closeButton.text.setText("关闭").setFontColor(JColor.red).setFontSize(22);
        this.closeButton.onClick = function () {
            this.parent.visible = false;
            this.parent.onCloseButtonClick && this.parent.onCloseButtonClick();
            return true;
        };
        this.addControlInLast([this.title, this.closeButton]);
    },
    hideTitle: function hideTitle() {
        if (this.isShowTitle) {
            this.isShowTitle = false;
            this.title.visible = false;
            this.closeButton.visible = false;
            for (var i = 0; i < this.controls.length; i++) {
                this.controls[i].relativePosition.y -= this.titleHeight;
            }
        }
    },
    showTitle: function showTitle(title) {
        this.title.setText(title);
        if (!this.isShowTitle) {
            for (var i = 0; i < this.controls.length; i++) {
                this.controls[i].relativePosition.y += this.titleHeight;
            }
            this.isShowTitle = true;
            this.title.visible = true;
            this.closeButton.visible = true;
        }
    },
    onCloseButtonClick: null,
    clearControls: function clearControls($super) {
        $super();
        this.initTitle();
        this.hideTitle();
    }

});

module.exports = JPanel;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Class = __webpack_require__(0);
var JObject = __webpack_require__(1);
var JForm = {};

JForm = Class.create(JObject, { //从父类继承
    context: null, //画布环境
    canvas: null, //画布
    webPosition: null, //主窗体在Web页面中得位置
    mousePosition: null, //鼠标在主窗体中得相对坐标
    initialize: function initialize($super, size) {
        $super({ x: 0, y: 0 }, size);
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        var _top = 0,
            _left = 0;
        var _op = this.canvas;
        while (_op != null) {
            _top += _op.offsetTop;
            _left += _op.offsetLeft;
            _op = _op.offsetParent;
        }
        this.webPosition = { x: _left, y: _top };
        this.setFocus(); //默认主窗体获得焦点
        //创建画布对象
        this.canvas.width = parseInt(this.size.width * JMain.JZoom.x);
        this.canvas.height = parseInt(this.size.height * JMain.JZoom.y);

        //为画布添加事件
        this.canvas.onclick = function (event) {
            JMain.JForm.mousePosition = { x: parseInt((event.pageX - JMain.JForm.webPosition.x) / JMain.JZoom.x), y: parseInt((event.pageY - JMain.JForm.webPosition.y) / JMain.JZoom.y) };
            JMain.JForm.onControlClick.call(JMain.JForm);
        };

        this.canvas.onmousedown = function (event) {
            JMain.JForm.mousePosition = { x: parseInt((event.pageX - JMain.JForm.webPosition.x) / JMain.JZoom.x), y: parseInt((event.pageY - JMain.JForm.webPosition.y) / JMain.JZoom.y) };
            JMain.JForm.onControlMouseDown.call(JMain.JForm);
        };

        this.canvas.onmouseup = function (event) {
            JMain.JForm.mousePosition = { x: parseInt((event.pageX - JMain.JForm.webPosition.x) / JMain.JZoom.x), y: parseInt((event.pageY - JMain.JForm.webPosition.y) / JMain.JZoom.y) };
            JMain.JForm.onControlMouseUp.call(JMain.JForm);
        };

        this.canvas.addEventListener('touchstart', function (event) {
            event.pageX = event.pageX || event.changedTouches[0].pageX;
            event.pageY = event.pageY || event.changedTouches[0].pageY;
            JMain.JForm.mousePosition = { x: parseInt((event.pageX - JMain.JForm.webPosition.x) / JMain.JZoom.x), y: parseInt((event.pageY - JMain.JForm.webPosition.y) / JMain.JZoom.y) };
            JMain.JForm.onControlMouseDown.call(JMain.JForm);
        });

        this.canvas.addEventListener('touchend', function (event) {
            event.pageX = event.pageX || event.changedTouches[0].pageX;
            event.pageY = event.pageY || event.changedTouches[0].pageY;
            JMain.JForm.mousePosition = { x: parseInt((event.pageX - JMain.JForm.webPosition.x) / JMain.JZoom.x), y: parseInt((event.pageY - JMain.JForm.webPosition.y) / JMain.JZoom.y) };
            JMain.JForm.onControlMouseUp.call(JMain.JForm);
        });

        document.onkeydown = function (event) {
            event = window.event || event;
            var keyCode = event.keyCode || event.which;
            JMain.JForm.onControlKeyDown(keyCode);
        };

        document.onkeyup = function (event) {
            event = window.event || event;
            var keyCode = event.keyCode || event.which;
            JMain.JForm.onControlKeyUp(keyCode);
        };
    }
});
module.exports = JForm;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Class = __webpack_require__(0);
var JObject = __webpack_require__(1);
var JButton = {};

JButton = Class.create(JObject, {

    text: null, //Label对象，用于显示按钮上的文字
    initialize: function initialize($super, argP, argWH) {
        $super(argP, argWH);
        //创建Label对象
        this.text = new JLabel({ x: 0, y: 0 }).setSize(argWH).setTextBaseline("middle").setTextAlign("center").setFontType("bold").setFontSize(20);
        this.addControlInLast([this.text]); //添加到当前按钮子对象数组中
    },
    setText: function setText(text) {
        this.text.setText(text);
        return this;
    },
    setSize: function setSize(size) {
        if (size) {
            this.size = size;
            this.text.setSize({ width: size.width, height: size.height });
        }
        return this;
    }
});

module.exports = JButton;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Class = __webpack_require__(0);
var JObject = __webpack_require__(1);
var JLabel = {};

JLabel = Class.create(JObject, { //从父类继承
    text: "", //显示文本
    textPos: null, //用于调整文字在Label中得位置
    fontType: "normal", //文字属性,如:"normal","bold"等
    fontColor: null, //字体颜色
    textAlign: "left", //水平对齐：left，center，right
    textBaseline: "top", //竖直对齐：top，middle，bottom
    fontSize: 10, //字体大小
    isSelect: false,
    initialize: function initialize($super, argP, argtext) {
        //覆盖父类中构造函数
        $super(argP, { width: 100, height: 20 }); //执行父类中构造函数
        this.text = argtext + "";
        this.textPos = { x: 2, y: 2 };
        this.fontSize = 15;
        this.fontColor = JColor.black;
    },
    setText: function setText(text) {
        this.text = text;
        return this;
    },
    setTextPos: function setTextPos(textPos) {
        this.textPos = textPos;
        return this;
    },
    setFontType: function setFontType(type) {
        this.fontType = type;
        return this;
    },
    setFontColor: function setFontColor(color) {
        this.fontColor = color;
        return this;
    },
    setTextAlign: function setTextAlign(textAlign) {
        this.textAlign = textAlign;
        return this;
    },
    setTextBaseline: function setTextBaseline(textBaseline) {
        this.textBaseline = textBaseline;
        return this;
    },
    setFontSize: function setFontSize(fontSize) {
        this.fontSize = fontSize;
        return this;
    },
    showing: function showing($super, x, y, w, h) {
        //覆盖父类中showing方法
        $super(); //执行父类中showing方法
        var _context = JMain.JForm.context;
        if (this.text) {
            var zoom = parseFloat(JMain.JZoom.y) + parseFloat(JMain.JZoom.x);
            _context.fillStyle = this.fontColor.data;
            _context.font = this.fontType + " " + parseInt(this.fontSize * zoom / 2) + "px serif";
            _context.textBaseline = this.textBaseline;
            _context.textAlign = this.textAlign;
            var x1, y1;
            if (_context.textAlign == "left") {
                x1 = x + parseInt(this.textPos.x * JMain.JZoom.x);
            } else if (_context.textAlign == "center") {
                x1 = x + parseInt(w / 2);
            } else if (_context.textAlign == "right") {
                x1 = x + w - parseInt(this.textPos.x * JMain.JZoom.x);
            }
            if (_context.textBaseline == "top") {
                y1 = y + parseInt(this.textPos.y * JMain.JZoom.y);
            } else if (_context.textBaseline == "middle") {
                y1 = y + parseInt(h / 2);
            } else if (_context.textBaseline == "bottom") {
                y1 = y + h - parseInt(this.textPos.y * JMain.JZoom.y);
            }
            _context.fillText(this.text, x1, y1, this.size.width);
        }
        if (this.isSelect) {
            _context.strokeStyle = JColor.red.data;
            _context.lineWidth = 1;
            _context.strokeRect(x, y, w - _context.lineWidth, h - _context.lineWidth);
        }
    }
});

module.exports = JLabel;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Class = __webpack_require__(0);
var JTick = {};

JTick = Class.create({
    time: 40, //间隔时间
    fun: [], //要循环显示的对象数组
    handle: null, //句柄
    initialize: function initialize(time) {
        this.time = time;
        this.fun = [];
        this.handle = null;
    },
    begin: function begin() {
        this.handle = setTimeout(this.runOneTime, this.time);
    },
    end: function end() {
        if (this.handle) clearTimeout(this.handle);
    },
    add: function add(obj) {
        if (obj) {
            for (var i = 0; i < obj.length; i++) {
                this.fun[this.fun.length] = obj[i];
            }
        }
    },
    delete: function _delete(obj) {
        if (obj) {
            for (var i = 0; i < this.fun.length; i++) {
                if (this.fun[i].ID == obj.ID) {
                    for (var j = i; j < this.fun.length - 1; j++) {
                        this.fun[j] = this.fun[j + 1];
                    }
                    this.fun.length--;
                }
            }
        }
    },
    runOneTime: function runOneTime() {
        JMain.JTick.end();
        for (var i = 0; i < JMain.JTick.fun.length; i++) {
            if (JMain.JTick.fun[i]) JMain.JTick.fun[i].show.call(JMain.JTick.fun[i]);
        }
        JMain.JTick.handle = setTimeout(JMain.JTick.runOneTime, JMain.JTick.time);
    }
});

module.exports = JTick;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Class = __webpack_require__(0);
var JAudio = {};

JAudio = Class.create({
    audioData: null, //Audio数据
    initialize: function initialize(audio, loop) {
        this.setAudio(audio, loop);
    },
    setAudio: function setAudio(audio, loop) {
        if (audio) {
            this.audioData = audio.data;
            if (loop) this.audioData.loop = true;
        }
    },
    play: function play() {
        if (this.audioData) this.audioData.play();
    },
    pause: function pause() {
        if (this.audioData) this.audioData.pause();
    }
});

module.exports = JAudio;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Class = __webpack_require__(0);
var JObject = __webpack_require__(1);
var JMessageBox = {};

JMessageBox = Class.create(JObject, {
    initialize: function initialize($super, argWH, argAString, argP) {
        //如果没有指定显示位置，则居中显示
        if (!argP) argP = { x: parseInt((JMain.JForm.size.width - argWH.width) / 2), y: parseInt((JMain.JForm.size.height - argWH.height) / 2) };
        $super(argP, argWH);
        this.BGColor = JColor.white;
        JMain.JForm.addControlInLast([this]); //把消息框添加到主窗体内
        var messageTitle = new JLabel({ x: 0, y: 0 }, "系统提示");
        messageTitle.BGColor = JColor.blue;
        messageTitle.fontColor = JColor.red;
        messageTitle.size.width = argWH.width;
        messageTitle.size.height = 25;
        messageTitle.fontSize = 20;
        messageTitle.fontType = "bold";
        this.addControlInLast([messageTitle]); //添加消息标题栏
        var h = messageTitle.size.height;
        for (var i = 0; i < argAString.length; i++) {
            //添加消息内容
            var m = new JLabel({ x: 0, y: h }, argAString[i]);
            m.size.width = argWH.width;
            m.textPos.x = 10;
            h += m.size.height;
            this.addControlInLast([m]);
        }
        this.size.height = h + 20;
    },
    onClick: function onClick() {
        //点击后，删除对象
        this.remove.call(this);
        JMain.JForm.show();
    }
});

module.exports = JMessageBox;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Class = __webpack_require__(0);
var JObject = __webpack_require__(1);
var JAnimationBox = {};

JAnimationBox = Class.create(JObject, {
    animationName: null, //动画资源key值
    animationPlayNum: null, //当前要显示的动画图片编号
    animationTime: null, //每次显示时计数加1
    animationOffset: null, //偏移量
    loop: null, //是否循环播放动画
    stopPlayAnimation: null, //是否暂停播放动画
    initialize: function initialize($super, argP, argWH, argAnimationName) {
        $super(argP, argWH);
        this.animationName = argAnimationName;
        this.animationPlayNum = 0;
        this.animationTime = 0;
        this.animationOffset = { WNum: 0, HNum: 0 };
        this.loop = true;
        this.stopPlayAnimation = false;
    },
    showing: function showing($super, x, y, w, h) {
        if (this.animationName) {
            var animation = Resources.Animation[this.animationName];
            var image = Resources.Images[animation.imageName];
            var w1 = image.cellSize.width;
            var h1 = image.cellSize.height;

            var times = this.animationOffset.times || animation.times;
            var allPlayNum = this.animationOffset.allPlayNum || animation.allPlayNum;

            var x1 = (animation.beginPoint.WNum + this.animationOffset.WNum + this.animationPlayNum) % image.picNum.WNum;
            var y1 = animation.beginPoint.HNum + this.animationOffset.HNum + parseInt((animation.beginPoint.WNum + this.animationOffset.WNum + this.animationPlayNum) / image.picNum.WNum);

            JMain.JForm.context.drawImage(image.data, w1 * x1, h1 * y1, w1, h1, x, y, w, h);
            if (this.isHighLight) {
                //绘制高亮图片
                JMain.JForm.context.save();
                JMain.JForm.context.globalCompositeOperation = "lighter";
                JMain.JForm.context.globalAlpha = this.alpha * 0.2;
                JMain.JForm.context.drawImage(image.data, w1 * x1, h1 * y1, w1, h1, x, y, w, h);
                JMain.JForm.context.restore();
            }
            if (!this.stopPlayAnimation) {
                this.animationTime++;
            }

            if (this.animationTime >= times) {
                //当计数大于或等于动画次数
                this.animationPlayNum++; //要显示的动画图片编号加1，
                if (this.animationPlayNum >= allPlayNum) {
                    if (this.loop) this.animationPlayNum = 0; //循环播放
                    else this.remove(); //已播放到末尾，删除该对象
                }
                this.animationTime = 0; //重置计数
            }
        }
        $super(x, y, w, h);
    },
    setAnimation: function setAnimation(animationName) {
        //设置动画资源
        this.animationName = animationName;
        return this;
    }
});

module.exports = JAnimationBox;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Class = __webpack_require__(0);
var JObject = __webpack_require__(1);
var JPictureBox = {};

JPictureBox = Class.create(JObject, {
    picture: null, //图片数据
    picAlpha: null, //t透明度
    picState: null, //显示方式（flex，cut）
    picPosition: null, //cut方式下，从该坐标开始截取图片数据
    picSize: null, //cut方式下，截取图片的长宽
    initialize: function initialize($super, argP, argWH, argimage, argposition) {
        $super(argP, argWH);

        this.picAlpha = 1.0;
        this.picState = "cut";

        var position = argposition || { x: 0, y: 0 };
        if (argimage) {
            this.setPicture(argimage, position);
        }
    },
    setPicture: function setPicture(image, position) {
        //设置该对象图片属性
        if (image) {
            this.picture = image.data;
            this.picSize = { width: image.cellSize.width, height: image.cellSize.height };
        }
        if (position) this.picPosition = position;else this.picPosition = { x: 0, y: 0 };

        return this;
    },
    showing: function showing($super, x, y, w, h) {
        //覆盖父类中showing函数
        var _context = JMain.JForm.context;
        if (this.picture) {
            _context.save();
            _context.globalAlpha = this.alpha * this.picAlpha;
            if (this.picState == "flex") {
                _context.drawImage(this.picture, 0, 0, this.picture.width, this.picture.height, x, y, w, h);
            } else if (this.picState == "cut") {
                _context.drawImage(this.picture, this.picPosition.x, this.picPosition.y, this.picSize.width, this.picSize.height, x, y, w, h);
            }
            _context.restore();
        }
        if (this.selected) {
            _context.strokeStyle = JColor.red.data;
            _context.lineWidth = 1;
            _context.strokeRect(x + _context.lineWidth, y + _context.lineWidth, w - _context.lineWidth * 2, h - _context.lineWidth * 2);
        }
        $super(x, y, w, h); //执行父类中showing函数
    }
});

module.exports = JPictureBox;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Class = __webpack_require__(0);
var JPreLoad = {};

JPreLoad = Class.create({
    loadedNum: 0, //已加载资源数量
    resourceNum: 0, //资源数量
    imagesNum: 0, //图片资源数量
    soundNum: 0, //音频资源数量
    mapsNum: 0, //地图资源数量
    initialize: function initialize() {
        console.log('JPreLoad');
        for (var a in Resources.Images) {
            this.imagesNum++, this.resourceNum++;
        }for (var b in Resources.Sound) {
            this.soundNum++, this.resourceNum++;
        }for (var c in Resources.Maps) {
            this.mapsNum++, this.resourceNum++;
        }
    },
    loadAll: function loadAll(f) {
        //开始加载
        if (f) this.loadPost = f;
        this.loadImage();
    },
    loadPost: function loadPost(num) {
        //每成功加载一个资源加载执行一次
        console.log('loadPost');
    },
    loadEnd: function loadEnd() {
        //资源加载完成后的回调函数
        console.log('loadEnd');
    },
    imageLoadPost: function imageLoadPost() {
        this.loadedNum++;
        var value = Math.round(parseFloat(this.loadedNum / this.resourceNum) * 100);
        this.loadPost(value);
        if (this.loadedNum >= this.imagesNum) {
            this.loadAudio();
            return;
        }
    },
    audioLoadPost: function audioLoadPost() {
        this.loadedNum++;
        var value = Math.round(parseFloat(this.loadedNum / this.resourceNum) * 100);
        this.loadPost(value);
        if (this.loadedNum >= this.imagesNum + this.soundNum) {
            this.loadJson();
            return;
        }
    },
    jsonLoadPost: function jsonLoadPost() {
        this.loadedNum++;
        var value = Math.round(parseFloat(this.loadedNum / this.resourceNum) * 100);
        this.loadPost(value);
        if (this.loadedNum >= this.resourceNum) {
            this.loadedNum = 0;
            this.resourceNum = 0;
            this.loadEnd();
            return;
        }
    },
    loadImage: function loadImage(f) {
        var _this = this;

        //加载图片
        if (f) this.loadPost = f;
        if (this.imagesNum == 0) {
            this.loadedNum--;
            this.imageLoadPost();
        } else {
            (function () {
                var that = _this;
                for (var m2 in Resources.Images) {
                    Resources.Images[m2].data = new Image();
                    Resources.Images[m2].data.src = GMain.URL + Resources.Images[m2].path;
                    Resources.Images[m2].data.onload = function () {
                        that.imageLoadPost();
                    };
                    Resources.Images[m2].data.onerror = function () {
                        console.log("资源加载失败！");
                        return;
                    };
                }
            })();
        }
    },
    loadAudio: function loadAudio(f) {
        var _this2 = this;

        //加载声音
        if (f) this.loadPost = f;
        if (this.soundNum == 0) {
            this.loadedNum--;
            this.audioLoadPost();
        } else {
            (function () {
                var that = _this2;
                for (var m1 in Resources.Sound) {
                    Resources.Sound[m1].data = new Audio();
                    //测试浏览器是否支持该格式声音
                    if ("" != Resources.Sound[m1].data.canPlayType('video/ogg')) {
                        Resources.Sound[m1].data.src = GMain.URL + resources.Sound[m1].path + resources.Sound[m1].soundName + ".ogg";
                    } else {
                        Resources.Sound[m1].data.src = GMain.URL + resources.Sound[m1].path + resources.Sound[m1].soundName + ".mp3";
                    }
                    Resources.Sound[m1].data.addEventListener("canplaythrough", function () {
                        that.audioLoadPost();
                    }, false);
                    Resources.Sound[m1].data.addEventListener("error", function () {
                        console.log("资源加载失败！");
                    }, false);
                }
            })();
        }
    },
    loadJson: function loadJson(f) {
        var _this3 = this;

        //加载JSON
        if (f) this.loadPost = f;
        if (this.mapsNum == 0) {
            this.loadedNum--;
            this.jsonLoadPost();
        } else {
            (function () {
                var that = _this3;

                var _loop = function _loop(m2) {
                    var request = new XMLHttpRequest();
                    request.open("get", GMain.URL + Resources.Maps[m2].path);
                    request.send(null);
                    request.onload = function () {
                        if (request.status == 200) {
                            var json = JSON.parse(request.responseText);
                            Resources.Maps[m2].data = json;
                            that.jsonLoadPost();
                        } else {
                            console.log("资源加载错误！");
                        }
                    };
                    request.onerror = function () {
                        console.log("资源加载失败！");
                    };
                };

                for (var m2 in Resources.Maps) {
                    _loop(m2);
                }
            })();
        }
    }
});

module.exports = JPreLoad;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var JBase64 = {};

JBase64._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

JBase64.encode = function (e) {
    var t = "";
    var n = void 0,
        r = void 0,
        i = void 0,
        s = void 0,
        o = void 0,
        u = void 0,
        a = void 0;
    var f = 0;
    e = JBase64._utf8_encode(e);
    while (f < e.length) {
        n = e.charCodeAt(f++);
        r = e.charCodeAt(f++);
        i = e.charCodeAt(f++);
        s = n >> 2;
        o = (n & 3) << 4 | r >> 4;
        u = (r & 15) << 2 | i >> 6;
        a = i & 63;
        if (isNaN(r)) {
            u = a = 64;
        } else if (isNaN(i)) {
            a = 64;
        }
        t = t + JBase64._keyStr.charAt(s) + JBase64._keyStr.charAt(o) + JBase64._keyStr.charAt(u) + JBase64._keyStr.charAt(a);
    }
    return t;
};

JBase64.decode = function (e) {
    var t = "";
    var n = void 0,
        r = void 0,
        i = void 0;
    var s = void 0,
        o = void 0,
        u = void 0,
        a = void 0;
    var f = 0;
    e = e.replace(/[^A-Za-z0-9+/=]/g, "");
    while (f < e.length) {
        s = JBase64._keyStr.indexOf(e.charAt(f++));
        o = JBase64._keyStr.indexOf(e.charAt(f++));
        u = JBase64._keyStr.indexOf(e.charAt(f++));
        a = JBase64._keyStr.indexOf(e.charAt(f++));
        n = s << 2 | o >> 4;
        r = (o & 15) << 4 | u >> 2;
        i = (u & 3) << 6 | a;
        t = t + String.fromCharCode(n);
        if (u != 64) {
            t = t + String.fromCharCode(r);
        }
        if (a != 64) {
            t = t + String.fromCharCode(i);
        }
    }
    t = JBase64._utf8_decode(t);
    return t;
};

JBase64._utf8_encode = function (e) {
    e = e.replace(/rn/g, "n");
    var t = "";
    for (var n = 0; n < e.length; n++) {
        var r = e.charCodeAt(n);
        if (r < 128) {
            t += String.fromCharCode(r);
        } else if (r > 127 && r < 2048) {
            t += String.fromCharCode(r >> 6 | 192);
            t += String.fromCharCode(r & 63 | 128);
        } else {
            t += String.fromCharCode(r >> 12 | 224);
            t += String.fromCharCode(r >> 6 & 63 | 128);
            t += String.fromCharCode(r & 63 | 128);
        }
    }
    return t;
};

JBase64._utf8_decode = function (e) {
    var t = "";
    var n = 0;
    var c1 = void 0,
        c2 = void 0;
    var r = c1 = c2 = 0;
    while (n < e.length) {
        r = e.charCodeAt(n);
        if (r < 128) {
            t += String.fromCharCode(r);
            n++;
        } else if (r > 191 && r < 224) {
            c2 = e.charCodeAt(n + 1);
            t += String.fromCharCode((r & 31) << 6 | c2 & 63);
            n += 2;
        } else {
            c2 = e.charCodeAt(n + 1);
            c3 = e.charCodeAt(n + 2);
            t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
            n += 3;
        }
    }
    return t;
};

module.exports = JBase64;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var JFunction = {};

JFunction.IsMobile = function () {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
        return false;
    }
    return true;
};

JFunction.FullScreen = function () {
    var el = document.documentElement;
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
    if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
    };
    return;
};

JFunction.ExitFullScreen = function () {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    if (typeof cfs != "undefined" && cfs) {
        cfs.call(el);
    }
};

JFunction.IsFullscreen = function () {
    return document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || false;
};

JFunction.GetElementById = function (name) {
    var element = document.getElementById(name);
    if (element == null) return false;
    element.state = false;
    element.show = function (e) {
        this.state = true;
        this.style.display = 'block';
    };
    element.hide = function (e) {
        this.state = false;
        this.style.display = 'none';
    };
    element.text = function (e) {
        this.innerHTML = e;
    };
    element.attrbute = function (name, value) {
        if (value == undefined) {
            return this.getAttribute(name);
        }
        this.setAttribute(name, value);
    };
    element.append = function (e) {
        this.appendChild(e);
    };
    element.remove = function (e) {
        this.removeChild(e);
    };
    return element;
};

JFunction.Random = function (formNum, toNum) {
    return parseInt(Math.random() * (toNum - formNum + 1) + formNum);
};
JFunction.setLSData = function (key, jsonValue) {
    var data = JSON.stringify(jsonValue);
    window.localStorage.setItem(key, JBase64.encode(data));
};
JFunction.getLSData = function (key) {
    var data = window.localStorage.getItem(key);
    if (data) {
        data = JBase64.decode(window.localStorage.getItem(key));
    }
    return JSON.parse(data);
};
JFunction.getNowTime = function () {
    var now = new Date();
    var year = now.getFullYear(); //年
    var month = now.getMonth() + 1; //月
    var day = now.getDate(); //日
    var hh = now.getHours(); //时
    var mm = now.getMinutes(); //分
    return year + "/" + month + "/" + day + " " + hh + ":" + mm;
};

//获取图片数据
JFunction.getImageData = function (_context, _point, _size) {
    return _context.getImageData(_point.x, _point.y, _size.width, _size.height);
};
//通过图片数据绘制图片
JFunction.drawImageData = function (_context, _imgdata, _point, _dPoint, _dSize) {
    if (!_dPoint) _dPoint = { x: 0, y: 0 };
    if (!_dSize) _dSize = { width: _imgdata.width, height: _imgdata.height };
    _context.putImageData(_imgdata, _point.x, _point.y, _dPoint.x, _dPoint.y, _dSize.width, _dSize.height);
};
//颜色反转
JFunction.invert = function (_imgData) {
    var imageData = _imgData;
    for (var i = 0; i < imageData.data.length; i += 4) {
        var red = imageData.data[i],
            green = imageData.data[i + 1],
            blue = imageData.data[i + 2],
            alpha = imageData.data[i + 3];
        imageData.data[i] = 255 - red;
        imageData.data[i + 1] = 255 - green;
        imageData.data[i + 2] = 255 - blue;
        imageData.data[i + 3] = alpha;
    }
    return imageData;
};
//灰色
JFunction.changeToGray = function (_imgData) {
    var imageData = _imgData;
    for (var i = 0; i < imageData.data.length; i += 4) {
        var wb = parseInt((imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3);
        imageData.data[i] = wb;
        imageData.data[i + 1] = wb;
        imageData.data[i + 2] = wb;
    }
    return imageData;
};
//加红
JFunction.changeToRed = function (_imgData) {
    var imageData = _imgData;
    for (var i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] += 50;
        if (imageData.data[i] > 255) imageData.data[i] = 255;
    }
    return imageData;
};
//图片旋转
JFunction.rotate = function (_context, _imageData, angle) {
    var returnData = _context.createImageData(_imageData.width, _imageData.height);
    var w = void 0,
        h = void 0,
        i = void 0,
        j = void 0,
        newPoint = void 0,
        x = void 0,
        y = void 0;
    var centerX = _imageData.width / 2.0;
    var centerY = _imageData.height / -2.0;
    var PI = 3.14159;
    for (h = 0; h < returnData.height; h++) {
        for (w = 0; w < returnData.width; w++) {
            i = (_imageData.width * h + w) * 4;
            newPoint = GetNewPoint({ x: w, y: h * -1 });
            x = parseInt(newPoint.x);
            y = parseInt(newPoint.y);
            if (x >= 0 && x < _imageData.width && -y >= 0 && -y < _imageData.height) {
                j = (_imageData.width * -y + x) * 4;
                returnData.data[i] = _imageData.data[j];
                returnData.data[i + 1] = _imageData.data[j + 1];
                returnData.data[i + 2] = _imageData.data[j + 2];
                returnData.data[i + 3] = _imageData.data[j + 3];
            }
        }
    }
    return returnData;
    function GetNewPoint(_point) {
        var l = angle * PI / 180;
        var newX = (_point.x - centerX) * Math.cos(l) - (_point.y - centerY) * Math.sin(l);
        var newY = (_point.x - centerX) * Math.sin(l) + (_point.y - centerY) * Math.cos(l);
        return { x: newX + centerX, y: newY + centerY };
    }
};
//高亮整个图片
JFunction.highLight = function (_imgData, n) {
    var imageData = _imgData;
    for (var i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = imageData.data[i] + n > 255 ? 255 : imageData.data[i] + n;
        imageData.data[i + 1] = imageData.data[i + 1] + n > 255 ? 255 : imageData.data[i + 1] + n;
        imageData.data[i + 2] = imageData.data[i + 2] + n > 255 ? 255 : imageData.data[i + 2] + n;
    }
    return imageData;
};

module.exports = JFunction;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var JColor = {
    white: { data: "#FFFFFF", r: 255, g: 255, b: 255 },
    black: { data: "#000000", r: 0, g: 0, b: 0 },
    red: { data: "#cf3a01", r: 207, g: 58, b: 1 },
    green: { data: "#7dbd5d", r: 125, g: 189, b: 93 },
    blue: { data: "#2da0ec", r: 45, g: 160, b: 236 },
    yellow: { data: "#fcce0e", r: 252, g: 206, b: 14 },
    gray: { data: "#b8c7d1", r: 184, g: 199, b: 209 }
};
module.exports = JColor;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var JMain = {
    JZoom: { x: 1.0, y: 1.0 },
    JFocusControl: null,
    JForm: null,
    JTick: null,
    JID: 0
};
module.exports = JMain;

/***/ })
/******/ ]);