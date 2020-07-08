import Class from './Class.js'
import JObject from './JObject.js'

let JMessageBox = {};

JMessageBox = Class.create(JObject, {
    initialize:function ($super,  argWH, argAString,argP) {
        //如果没有指定显示位置，则居中显示
        if(!argP)argP={x:parseInt((JMain.JForm.size.width - argWH.width) / 2), y:parseInt((JMain.JForm.size.height - argWH.height) / 2)};
        $super(argP, argWH);
        this.BGColor = JColor.white;
        JMain.JForm.addControlInLast([this]);//把消息框添加到主窗体内
        let messageTitle = new JLabel({x:0, y:0}, "系统提示");
        messageTitle.BGColor = JColor.blue;
        messageTitle.fontColor = JColor.red;
        messageTitle.size.width = argWH.width;
        messageTitle.size.height = 25;
        messageTitle.fontSize = 20;
        messageTitle.fontType = "bold";
        this.addControlInLast([messageTitle]);//添加消息标题栏
        let h = messageTitle.size.height;
        for (let i = 0; i < argAString.length; i++) {//添加消息内容
            let m = new JLabel({x:0, y:h}, argAString[i]);
            m.size.width = argWH.width;
            m.textPos.x = 10;
            h += m.size.height;
            this.addControlInLast([m]);
        }
        this.size.height = h+20;
    },
    onClick:function () {//点击后，删除对象
        this.remove.call(this);
        JMain.JForm.show();
    }
});

module.exports = JMessageBox;