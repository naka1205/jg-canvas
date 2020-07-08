import Class from './Class.js'

let JPreLoad = {};

JPreLoad = Class.create({
    loadedNum:0,//已加载资源数量
    resourceNum:0,//资源数量
    imagesNum:0,//图片资源数量
    soundNum:0,//音频资源数量
    mapsNum:0,//地图资源数量
    initialize:function(){
        console.log('JPreLoad')
        for (let a in Resources.Images)  this.imagesNum++,this.resourceNum++;
        for (let b in Resources.Sound)  this.soundNum++,this.resourceNum++;
        for (let c in Resources.Maps)  this.mapsNum++,this.resourceNum++;
    },
    loadAll:function (f) {//开始加载
        if (f) this.loadPost = f;
        this.loadImage();
    },
    loadPost:function (num) {//每成功加载一个资源加载执行一次
        console.log('loadPost')
    },
    loadEnd:function () {//资源加载完成后的回调函数
        console.log('loadEnd')
    },
    imageLoadPost:function () {
        this.loadedNum++;
        let value = Math.round(parseFloat(this.loadedNum / this.resourceNum) * 100);
        this.loadPost(value);
        if (this.loadedNum >= this.imagesNum) {
            this.loadAudio()
            return;
        }
    },
    audioLoadPost:function () {
        this.loadedNum++;
        let value = Math.round(parseFloat(this.loadedNum / this.resourceNum) * 100);
        this.loadPost(value);
        if (this.loadedNum >= this.imagesNum + this.soundNum) {
            this.loadJson()
            return;
        }
    },
    jsonLoadPost:function () {
        this.loadedNum++;
        let value = Math.round(parseFloat(this.loadedNum / this.resourceNum) * 100);
        this.loadPost(value);
        if (this.loadedNum >= this.resourceNum ) {
            this.loadedNum=0;
            this.resourceNum=0;
            this.loadEnd()
            return;
        }
        
    },
    loadImage:function (f) {//加载图片
        if (f) this.loadPost = f;
        if(this.imagesNum==0){
            this.loadedNum--;
            this.imageLoadPost();
        }else{
            let that = this;
            for (let m2 in Resources.Images) {
                Resources.Images[m2].data = new Image();
                Resources.Images[m2].data.src = GMain.URL + Resources.Images[m2].path;
                Resources.Images[m2].data.onload = function () {
                    that.imageLoadPost();
                }
                Resources.Images[m2].data.onerror = function () {
                    console.log("资源加载失败！")
                    return;
                }
            }
        }
    },
    loadAudio:function (f) {//加载声音
        if (f) this.loadPost = f;
        if(this.soundNum==0){
            this.loadedNum--;
            this.audioLoadPost();
        }else{
            let that = this;
            for (let m1 in Resources.Sound) {
                Resources.Sound[m1].data = new Audio();
                //测试浏览器是否支持该格式声音
                if ( "" != Resources.Sound[m1].data.canPlayType('video/ogg') ) {
                    Resources.Sound[m1].data.src = GMain.URL+ resources.Sound[m1].path + resources.Sound[m1].soundName + ".ogg";
                } else {
                    Resources.Sound[m1].data.src = GMain.URL+ resources.Sound[m1].path + resources.Sound[m1].soundName + ".mp3";
                }
                Resources.Sound[m1].data.addEventListener("canplaythrough", function () {
                    that.audioLoadPost();
                }, false);
                Resources.Sound[m1].data.addEventListener("error", function () {
                    console.log("资源加载失败！")
                }, false);
            }
        }
    },
    loadJson:function (f) {//加载JSON
        if (f) this.loadPost = f;
        if(this.mapsNum==0){
            this.loadedNum--;
            this.jsonLoadPost();
        }else{
            let that = this;
            for (let m2 in Resources.Maps) {
                let request = new XMLHttpRequest();
                request.open("get", GMain.URL + Resources.Maps[m2].path);
                request.send(null);
                request.onload = function () {
                    if (request.status == 200) {
                        let json = JSON.parse(request.responseText);
                        Resources.Maps[m2].data = json;
                        that.jsonLoadPost();
                    }else{
                        console.log("资源加载错误！")
                    }
                }
                request.onerror= function () {
                    console.log("资源加载失败！")    
                }

            }
        }
    },
})

module.exports = JPreLoad;