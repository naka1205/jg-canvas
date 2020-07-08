import Class from './Class.js'

let JTick = {};

JTick = Class.create({
    time:40,//间隔时间
    fun:[],//要循环显示的对象数组
    handle:null,//句柄
    initialize:function(time){
        this.time=time;
        this.fun=[];
        this.handle=null;
    },
    begin:function(){
        this.handle=setTimeout(this.runOneTime, this.time);
    },
    end:function(){
        if(this.handle)clearTimeout(this.handle);
    },
    add:function(obj){
        if(obj){
            for (let i = 0; i < obj.length; i++) {
                this.fun[this.fun.length]=obj[i];
            }
        }
    },
    delete:function(obj){
        if(obj){
            for(let i=0;i<this.fun.length;i++){
                if(this.fun[i].ID==obj.ID){
                    for(let j=i;j<this.fun.length-1;j++){
                        this.fun[j]=this.fun[j+1];
                    }
                    this.fun.length--;
                }
            }
        }
    },
    runOneTime:function(){
        JMain.JTick.end();
        for(let i=0;i<JMain.JTick.fun.length;i++){
            if(JMain.JTick.fun[i])JMain.JTick.fun[i].show.call(JMain.JTick.fun[i]);
        }
        JMain.JTick.handle=setTimeout(JMain.JTick.runOneTime, JMain.JTick.time);
    }
});

module.exports = JTick;