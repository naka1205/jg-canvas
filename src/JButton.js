
let Class = require('./Class.js')
let JObject = require('./JObject.js')
let JButton = {};

JButton = Class.create(JObject, {
    
    text:null,//Label对象，用于显示按钮上的文字
    initialize:function ($super,  argP, argWH) {
        $super( argP, argWH);
        //创建Label对象
        this.text = new JLabel({x:0,y:0}).setSize(argWH).setTextBaseline("middle").setTextAlign("center").setFontType("bold").setFontSize(20);
        this.addControlInLast([this.text]);//添加到当前按钮子对象数组中
    },
    setText:function(text){
        this.text.setText(text);
        return this;
    },
    setSize:function(size){
        if(size){
            this.size = size;
            this.text.setSize({width:size.width,height:size.height});
        }
        return this;
    }
});

module.exports = JButton;