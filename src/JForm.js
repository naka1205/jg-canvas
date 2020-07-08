
let Class = require('./Class.js')
let JObject = require('./JObject.js')
let JForm = {};

JForm = Class.create(JObject, {//从父类继承
    context:null,//画布环境
    canvas:null,//画布
    webPosition:null,//主窗体在Web页面中得位置
    mousePosition:null,//鼠标在主窗体中得相对坐标
    initialize:function ($super,size) {
        $super({x:0, y:0}, size);
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        let _top=0,_left=0;
        let _op=this.canvas;
        while(_op!=null){
            _top+=_op.offsetTop;
            _left+=_op.offsetLeft;
            _op=_op.offsetParent;
        }
        this.webPosition={x:_left,y:_top};
        this.setFocus();//默认主窗体获得焦点
        //创建画布对象
        this.canvas.width = parseInt(this.size.width * JMain.JZoom.x);
        this.canvas.height = parseInt(this.size.height * JMain.JZoom.y);

        //为画布添加事件
        this.canvas.onclick = function (event) {
            JMain.JForm.mousePosition = {x:parseInt((event.pageX - JMain.JForm.webPosition.x) / JMain.JZoom.x), y:parseInt((event.pageY - JMain.JForm.webPosition.y) / JMain.JZoom.y)};
            JMain.JForm.onControlClick.call(JMain.JForm);
        }

        this.canvas.onmousedown = function (event) {
            JMain.JForm.mousePosition = {x:parseInt((event.pageX - JMain.JForm.webPosition.x) / JMain.JZoom.x), y:parseInt((event.pageY - JMain.JForm.webPosition.y) / JMain.JZoom.y)};
            JMain.JForm.onControlMouseDown.call(JMain.JForm);
        }

        this.canvas.onmouseup = function (event) {
            JMain.JForm.mousePosition = {x:parseInt((event.pageX - JMain.JForm.webPosition.x) / JMain.JZoom.x), y:parseInt((event.pageY - JMain.JForm.webPosition.y) / JMain.JZoom.y)};
            JMain.JForm.onControlMouseUp.call(JMain.JForm);
        }

        this.canvas.addEventListener('touchstart', function(event) {
            event.pageX = event.pageX || event.changedTouches[0].pageX;
            event.pageY = event.pageY || event.changedTouches[0].pageY;
            JMain.JForm.mousePosition = {x:parseInt((event.pageX - JMain.JForm.webPosition.x) / JMain.JZoom.x), y:parseInt((event.pageY - JMain.JForm.webPosition.y) / JMain.JZoom.y)};
            JMain.JForm.onControlMouseDown.call(JMain.JForm);
        })

        this.canvas.addEventListener('touchend', function(event) { 
            event.pageX = event.pageX || event.changedTouches[0].pageX;
            event.pageY = event.pageY || event.changedTouches[0].pageY;
            JMain.JForm.mousePosition = {x:parseInt((event.pageX - JMain.JForm.webPosition.x) / JMain.JZoom.x), y:parseInt((event.pageY - JMain.JForm.webPosition.y) / JMain.JZoom.y)};
            JMain.JForm.onControlMouseUp.call(JMain.JForm);
        })

        document.onkeydown = function (event) {
            event = window.event || event;
            let keyCode = event.keyCode || event.which;
            JMain.JForm.onControlKeyDown(keyCode);
        }

        document.onkeyup = function (event) {
            event = window.event || event;
            let keyCode = event.keyCode || event.which;
            JMain.JForm.onControlKeyUp(keyCode);
        }

    }
});
module.exports = JForm;