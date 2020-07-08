
let Class = require('./Class.js')
let JAudio = {};

JAudio = Class.create({
    audioData:null,//Audio数据
    initialize:function (audio,loop) {
        this.setAudio(audio,loop);
    },
    setAudio:function(audio,loop){
        if(audio){
            this.audioData = audio.data;
            if(loop)this.audioData.loop=true;
        }
    },
    play:function () {
        if (this.audioData)this.audioData.play();
    },
    pause:function () {
        if (this.audioData)this.audioData.pause();
    }
});

module.exports = JAudio;