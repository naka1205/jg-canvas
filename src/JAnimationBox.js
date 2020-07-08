
let Class = require('./Class.js')
let JObject = require('./JObject.js')
let JAnimationBox = {};

JAnimationBox = Class.create(JObject, {
    animationName:null,//动画资源key值
    animationPlayNum:null,//当前要显示的动画图片编号
    animationTime:null,//每次显示时计数加1
    animationOffset:null,//偏移量
    loop:null,//是否循环播放动画
    stopPlayAnimation:null,//是否暂停播放动画
    initialize:function ($super,  argP, argWH, argAnimationName) {
        $super( argP, argWH);
        this.animationName = argAnimationName;
        this.animationPlayNum = 0;
        this.animationTime = 0;
        this.animationOffset = {WNum:0, HNum:0};
        this.loop = true;
        this.stopPlayAnimation = false;
    },
    showing:function ($super, x, y, w, h) {
        if (this.animationName) {
            let animation = Resources.Animation[this.animationName];
            let image = Resources.Images[animation.imageName];
            let w1 = image.cellSize.width;
            let h1 = image.cellSize.height;

            let times = this.animationOffset.times || animation.times;
            let allPlayNum = this.animationOffset.allPlayNum || animation.allPlayNum;

            let x1 = (animation.beginPoint.WNum + this.animationOffset.WNum + this.animationPlayNum) % image.picNum.WNum;
            let y1 = animation.beginPoint.HNum + this.animationOffset.HNum + parseInt((animation.beginPoint.WNum + this.animationOffset.WNum + this.animationPlayNum) / image.picNum.WNum);
            
            JMain.JForm.context.drawImage(image.data, w1 * x1, h1 * y1, w1, h1, x, y, w, h);
            if(this.isHighLight){//绘制高亮图片
                JMain.JForm.context.save();
                JMain.JForm.context.globalCompositeOperation="lighter";
                JMain.JForm.context.globalAlpha=this.alpha*0.2;
                JMain.JForm.context.drawImage(image.data, w1 * x1, h1 * y1, w1, h1, x, y, w, h);
                JMain.JForm.context.restore();
            }
            if (!this.stopPlayAnimation) {
                this.animationTime++;
            }

            if (this.animationTime >= times ) {//当计数大于或等于动画次数
                this.animationPlayNum++;//要显示的动画图片编号加1，
                if (this.animationPlayNum >= allPlayNum ) {
                    if (this.loop)this.animationPlayNum = 0;//循环播放
                    else this.remove();//已播放到末尾，删除该对象
                }
                this.animationTime = 0;//重置计数
            }
        }
        $super( x, y, w, h);
    },
    setAnimation:function (animationName) {//设置动画资源
        this.animationName = animationName;
        return this;
    }
});

module.exports = JAnimationBox;