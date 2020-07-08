
let Class = require('./Class.js')
let JObject = require('./JObject.js')
let JPictureBox = {};

JPictureBox = Class.create(JObject, {
    picture:null,//图片数据
    picAlpha:null,//t透明度
    picState:null,//显示方式（flex，cut）
    picPosition:null,//cut方式下，从该坐标开始截取图片数据
    picSize:null,//cut方式下，截取图片的长宽
    initialize:function ($super,  argP, argWH, argimage, argposition) {
        $super( argP, argWH);
        
        this.picAlpha=1.0;
        this.picState = "cut";

        let position = argposition || {x:0,y:0}
        if(argimage){
            this.setPicture(argimage,position);
        }
    },
    setPicture:function(image,position){//设置该对象图片属性
        if(image){
            this.picture=image.data;
            this.picSize={width:image.cellSize.width,height:image.cellSize.height};
        }
        if(position)this.picPosition=position;
        else this.picPosition={x:0,y:0};

        return this;
    },
    showing:function ($super, x, y, w, h){//覆盖父类中showing函数
        let _context=JMain.JForm.context;
        if(this.picture){
            _context.save();
            _context.globalAlpha=this.alpha*this.picAlpha;
            if (this.picState == "flex") {
                _context.drawImage(this.picture, 0, 0, this.picture.width, this.picture.height, x, y, w, h);
            }else if (this.picState == "cut") {
                _context.drawImage(this.picture, this.picPosition.x, this.picPosition.y, this.picSize.width,
                    this.picSize.height, x, y, w, h);
            }
            _context.restore();
        }
        if (this.selected) {
            _context.strokeStyle = JColor.red.data;
            _context.lineWidth = 1;
            _context.strokeRect(x + _context.lineWidth, y + _context.lineWidth,
                w - _context.lineWidth*2, h - _context.lineWidth*2);
        }
        $super(x, y, w, h);//执行父类中showing函数
    }
});

module.exports = JPictureBox;