
let Class = require('./Class.js')
let JObject = require('./JObject.js')
let JLabel = {};

JLabel = Class.create(JObject, {//从父类继承
    text:"",//显示文本
    textPos:null,//用于调整文字在Label中得位置
    fontType:"normal", //文字属性,如:"normal","bold"等
    fontColor:null,//字体颜色
    textAlign:"left",//水平对齐：left，center，right
    textBaseline:"top", //竖直对齐：top，middle，bottom
    fontSize:10,//字体大小
    isSelect:false,
    initialize:function ($super,  argP, argtext) {//覆盖父类中构造函数
        $super( argP, {width:100, height:20});//执行父类中构造函数
        this.text = argtext + "";
        this.textPos = {x:2, y:2};
        this.fontSize = 15;
        this.fontColor = JColor.black;
    },
    setText:function (text) {
        this.text = text;
        return this;
    },
    setTextPos:function (textPos) {
        this.textPos = textPos;
        return this;
    },
    setFontType:function (type) {
        this.fontType = type;
        return this;
    },
    setFontColor:function (color) {
        this.fontColor = color;
        return this;
    },
    setTextAlign:function(textAlign){
        this.textAlign=textAlign;
        return this;
    },
    setTextBaseline:function(textBaseline){
        this.textBaseline=textBaseline;
        return this;
    },
    setFontSize:function(fontSize){
        this.fontSize=fontSize;
        return this;
    },
    showing:function($super,x, y, w, h){//覆盖父类中showing方法
        $super();//执行父类中showing方法
        var _context = JMain.JForm.context;
        if (this.text) {
            let zoom = parseFloat(JMain.JZoom.y) + parseFloat(JMain.JZoom.x)
            _context.fillStyle = this.fontColor.data;
            _context.font = this.fontType + " " + parseInt(this.fontSize * zoom / 2) + "px serif";
            _context.textBaseline = this.textBaseline;
            _context.textAlign = this.textAlign;
            var x1,y1;
            if(_context.textAlign=="left"){
                x1= x + parseInt(this.textPos.x * JMain.JZoom.x);
            }else if(_context.textAlign=="center"){
                x1= x + parseInt(w/2);
            }else if(_context.textAlign=="right"){
                x1= x + w- parseInt(this.textPos.x * JMain.JZoom.x);
            }
            if(_context.textBaseline=="top"){
                y1=y + parseInt(this.textPos.y * JMain.JZoom.y);
            }else if(_context.textBaseline=="middle"){
                y1=y + parseInt(h/2);
            }else if(_context.textBaseline=="bottom"){
                y1=y +h- parseInt(this.textPos.y * JMain.JZoom.y);
            }
            _context.fillText(this.text,x1,y1, this.size.width);
        }
        if(this.isSelect){
            _context.strokeStyle = JColor.red.data;
            _context.lineWidth = 1;
            _context.strokeRect(x , y,w - _context.lineWidth, h - _context.lineWidth);
        }
    }
});

module.exports = JLabel;