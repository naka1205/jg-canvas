import Class from './Class.js'
import JObject from './JObject.js'

let JPanel = {};

JPanel = Class.create(JObject, {//从父类继承
    closeButton:null,//关闭按钮
    title:null,//显示标题的控件
    isShowTitle:null,//是否显示标题栏
    titleHeight:40,//标题栏高度
    initialize:function ($super,  argP, argWH) {
        $super( argP, argWH);
        this.titleHeight=40;
        this.initTitle();
        this.hideTitle();
    },
    initTitle:function(){
        this.isShowTitle=true;
        this.title=new JLabel({x:0,y:0}).setSize({width:this.size.width,height:this.titleHeight})
            .setBGColor(JColor.blue).setFontSize(27).setTextBaseline("middle").setFontType("bold").setTextPos({x:20,y:0});
        this.closeButton=new JButton({x:this.size.width-60,y:0},{width:60,height:this.titleHeight})
            .setBGColor(JColor.white);
        this.closeButton.text.setText("关闭").setFontColor(JColor.red).setFontSize(22);
        this.closeButton.onClick=function(){
            this.parent.visible=false;
            this.parent.onCloseButtonClick&&this.parent.onCloseButtonClick();
            return true;
        }
        this.addControlInLast([this.title,this.closeButton]);
    },
    hideTitle:function(){
        if(this.isShowTitle){
            this.isShowTitle=false;
            this.title.visible=false;
            this.closeButton.visible=false;
            for(let i=0;i<this.controls.length;i++){
                this.controls[i].relativePosition.y-=this.titleHeight;
            }
        }
    },
    showTitle:function(title){
        this.title.setText(title);
        if(!this.isShowTitle){
            for(let i=0;i<this.controls.length;i++){
                this.controls[i].relativePosition.y+=this.titleHeight;
            }
            this.isShowTitle=true;
            this.title.visible=true;
            this.closeButton.visible=true;
        }
    },
    onCloseButtonClick:null,
    clearControls:function($super){
        $super();
        this.initTitle();
        this.hideTitle();
    }

});

module.exports = JPanel;