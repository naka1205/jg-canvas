!function(t){function i(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,i),n.l=!0,n.exports}var e={};i.m=t,i.c=e,i.d=function(exports,t,e){i.o(exports,t)||Object.defineProperty(exports,t,{configurable:!1,enumerable:!0,get:e})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},i.p="",i(i.s=2)}([function(t,exports,i){"use strict";window.$A=function(t){if(!t)return[];if(t.toArray)return t.toArray();for(var i=t.length||0,e=new Array(i);i--;)e[i]=t[i];return e};var e={};e={create:function(){function t(){this.initialize.apply(this,arguments)}var i=null,o=$A(arguments);if(Object.isFunction(o[0])&&(i=o.shift()),Object.extend(t,e.Methods),t.superclass=i,t.subclasses=[],i){var n=function(){};n.prototype=i.prototype,t.prototype=new n,i.subclasses.push(t)}for(var s=0;s<o.length;s++)t.addMethods(o[s]);return t.prototype.initialize||(t.prototype.initialize=Prototype.emptyFunction),t.prototype.constructor=t,t}},e.Methods={addMethods:function(t){var i=this.superclass&&this.superclass.prototype,e=Object.keys(t);Object.keys({toString:!0}).length||e.push("toString","valueOf");for(var o=0,n=e.length;o<n;o++){var s=e[o],a=t[s];if(i&&Object.isFunction(a)&&"$super"==a.argumentNames().first()){var r=a;a=function(t){return function(){return i[t].apply(this,arguments)}}(s).wrap(r),a.valueOf=r.valueOf.bind(r),a.toString=r.toString.bind(r)}this.prototype[s]=a}return this}},t.exports=e},function(t,exports,i){"use strict";var e=i(0),o={};o=e.create({ID:null,position:null,alpha:null,moveStep:null,canMove:!0,size:null,blockAngle:null,rotationStep:null,blockInvert:null,BGColor:null,BGColorAlpha:null,BGImage:null,BGImageAlpha:null,BGImagePosition:null,BGImageSize:null,focus:null,controls:null,parent:null,relativePosition:null,enabled:null,visible:null,showImageData:null,isHighLight:null,onFocus:null,onClick:null,onMouseDown:null,onMouseUp:null,onKeyDown:null,onKeyUp:null,keyCode:null,initialize:function(t,i){this.ID=JMain.JID++,this.position=t,this.size=i||{width:0,height:0},this.BGColorAlpha=1,this.BGImageAlpha=1,this.moveStep={x:0,y:0},this.fontColor=JColor.black,this.textPos={x:0,y:0},this.alpha=1,this.relativePosition=t||{x:0,y:0},this.controls=[],this.parent=null,this.enabled=!0,this.visible=!0},setSize:function(t){return this.size=t,this},setBGColor:function(t){return this.BGColor=t,this},setBGImage:function(t){return this.BGImage=t.data,this.BGImagePosition={x:0,y:0},this.BGImageSize={width:t.cellSize.width,height:t.cellSize.height},this},setKeyCode:function(t){return this.keyCode=t,this},setRelativePosition:function(t){return this.relativePosition=t,this},setFocus:function(){JMain.JFocusControl&&JMain.JFocusControl.lostFocus(),this.focus=!0,JMain.JFocusControl=this,this.onFocus&&this.onFocus()},lostFocus:function(){this.focus=!1,JMain.JFocusControl=null},pointInBlock:function(t,i){return i||(i=this),t.x>=i.position.x&&t.x<i.position.x+i.size.width&&t.y>=i.position.y&&t.y<i.position.y+i.size.height},onControlClick:function(){if(!this.visible||!this.enabled)return!1;for(var t=this.controls.length-1;t>=0;t--)if(this.controls[t].pointInBlock(JMain.JForm.mousePosition,this.controls[t])&&this.controls[t].onControlClick.call(this.controls[t]))return!0;return!(!this.onClick||!this.onClick(JMain.JForm.mousePosition))},onControlMouseDown:function(){if(!this.visible||!this.enabled)return!1;for(var t=this.controls.length-1;t>=0;t--)if(this.controls[t].pointInBlock(JMain.JForm.mousePosition,this.controls[t])&&this.controls[t].onControlMouseDown.call(this.controls[t]))return!0;return!(!this.onMouseDown||!this.onMouseDown())},onControlMouseUp:function(){if(!this.visible||!this.enabled)return!1;for(var t=this.controls.length-1;t>=0;t--)if(this.controls[t].pointInBlock(JMain.JForm.mousePosition,this.controls[t])&&this.controls[t].onControlMouseUp.call(this.controls[t]))return!0;return!(!this.onMouseUp||!this.onMouseUp())},onControlKeyDown:function(t){if(!this.visible||!this.enabled)return!1;for(var i=this.controls.length-1;i>=0;i--)if(this.controls[i].onControlKeyDown.call(this.controls[i],t))return!0;return!(!this.onKeyDown||!this.onKeyDown(t))},onControlKeyUp:function(t){if(!this.visible||!this.enabled)return!1;for(var i=this.controls.length-1;i>=0;i--)if(this.controls[i].onControlKeyUp.call(this.controls[i],t))return!0;return!(!this.onKeyUp||!this.onKeyUp(t))},addControlInLast:function(t){for(var i=0;i<t.length;i++)if(t[i]){var e=this.controls.length;this.controls[e]=t[i],this.controls[e].parent=this,this.position&&(this.controls[e].position={x:this.position.x+this.controls[e].relativePosition.x,y:this.position.y+this.controls[e].relativePosition.y})}},removeControl:function(t){for(var i=0;i<this.controls.length;i++)if(t==this.controls[i].ID){this.controls.splice(i,1);break}},remove:function(){this.parent?this.parent.removeControl.call(this.parent,this.ID):this.ID=null},clearControls:function(){this.controls=[]},saveShowImageData:function(){var t=parseInt(this.size.width*JMain.JZoom.x),i=parseInt(this.size.height*JMain.JZoom.y),e=this.relativePosition,o=this.parent;this.parent=null,this.relativePosition={x:0,y:0},JMain.JForm.canvas.width=t,JMain.JForm.canvas.height=i,this.showImageData=null,this.show(),this.showImageData=JFunction.getImageData(JMain.JForm.context,this.relativePosition,{width:t,height:i}),this.parent=o,this.relativePosition=e,JMain.JForm.canvas.width=parseInt(JMain.JForm.size.width*JMain.JZoom.x),JMain.JForm.canvas.height=parseInt(JMain.JForm.size.height*JMain.JZoom.y)},beginShow:function(){this.position.x=this.relativePosition.x,this.position.y=this.relativePosition.y,this.parent&&(this.position.x+=this.parent.position.x,this.position.y+=this.parent.position.y)},showing:function(t,i,e,o){for(var n=0;n<this.controls.length;n++)this.controls[n].show.call(this.controls[n]);if(!this.enabled){var s=JFunction.getImageData(JMain.JForm.context,{x:t,y:i},{width:e,height:o});JFunction.drawImageData(JMain.JForm.context,JFunction.changeToGray(s),{x:t,y:i})}},endShow:function(){this.rotationStep&&(this.blockAngle+=this.rotationStep,this.blockAngle=this.blockAngle%360),this.canMove&&this.moveStep&&(this.relativePosition.x+=this.moveStep.x,this.relativePosition.y+=this.moveStep.y)},show:function(){if(this.beginShow(),this.visible&&this.size)if(this.showImageData)JFunction.drawImageData(JMain.JForm.context,this.showImageData,{x:parseInt(this.position.x*JMain.JZoom.x),y:parseInt(this.position.y*JMain.JZoom.y)});else{var t=JMain.JForm.context;if(null==this.ID)return;var i=parseInt(this.position.x*JMain.JZoom.x),e=parseInt(this.position.y*JMain.JZoom.y),o=parseInt(this.size.width*JMain.JZoom.x),n=parseInt(this.size.height*JMain.JZoom.y);t&&(this.alpha<1&&(t.save(),t.globalAlpha=this.alpha),this.blockInvert&&(t.save(),t.translate(i+parseInt(o/2),0),t.scale(-1,1),t.translate(-1*(i+parseInt(o/2)),0)),this.blockAngle&&(t.save(),t.translate(i+parseInt(o/2),e+parseInt(n/2)),i=-parseInt(o/2),e=-parseInt(n/2),t.rotate(this.blockAngle*Math.PI/180)),this.BGColor&&(t.save(),t.globalAlpha=this.alpha*this.BGColorAlpha,t.fillStyle=this.BGColor.data,t.fillRect(i,e,o,n),t.restore()),this.BGImage&&(t.save(),t.globalAlpha=this.alpha*this.BGImageAlpha,t.drawImage(this.BGImage,this.BGImagePosition.x,this.BGImagePosition.y,this.BGImageSize.width,this.BGImageSize.height,i,e,o,n),t.restore()),this.showing&&this.showing(i,e,o,n),this.blockAngle&&t.restore(),this.blockInvert&&(t.translate(JMain.JForm.size.width-i-parseInt(o/2),0),t.scale(-1,1),t.translate(-1*(JMain.JForm.size.width-i-parseInt(o/2)),0),t.restore()),this.alpha<1&&t.restore())}this.endShow()}}),t.exports=o},function(t,exports,i){"use strict";var e={Class:i(0),Object:i(3),JObject:i(1),JPanel:i(4),JForm:i(5),JButton:i(6),JLabel:i(7),JTick:i(8),JAudio:i(9),JMessageBox:i(10),JAnimationBox:i(11),JPictureBox:i(12),JPreLoad:i(13),JBase64:i(14),JFunction:i(15),JColor:i(16),JMain:i(17)};t.exports=e},function(t,exports,i){"use strict";Object.extend=function(t,i){for(var e in i)t[e]=i[e];return t},Object.extend(Object,{keys:function(t){var i=[];for(var e in t)i.push(e);return i},isFunction:function(t){return"function"==typeof t},isUndefined:function(t){return void 0===t}}),Object.extend(Function.prototype,{argumentNames:function(){var t=this.toString().match(/^[\s\(]*function[^(]*\(([^\)]*)\)/)[1].replace(/\s+/g,"").split(",");return 1!=t.length||t[0]?t:[]},bind:function(){if(arguments.length<2&&Object.isUndefined(arguments[0]))return this;var t=this,i=$A(arguments),e=i.shift();return function(){return t.apply(e,i.concat($A(arguments)))}},wrap:function(t){var i=this;return function(){return t.apply(this,[i.bind(this)].concat($A(arguments)))}}}),Object.extend(Array.prototype,{first:function(){return this[0]}}),t.exports=Object},function(t,exports,i){"use strict";var e=i(0),o=i(1),n={};n=e.create(o,{closeButton:null,title:null,isShowTitle:null,titleHeight:40,initialize:function($super,t,i){$super(t,i),this.titleHeight=40,this.initTitle(),this.hideTitle()},initTitle:function(){this.isShowTitle=!0,this.title=new JLabel({x:0,y:0}).setSize({width:this.size.width,height:this.titleHeight}).setBGColor(JColor.blue).setFontSize(27).setTextBaseline("middle").setFontType("bold").setTextPos({x:20,y:0}),this.closeButton=new JButton({x:this.size.width-60,y:0},{width:60,height:this.titleHeight}).setBGColor(JColor.white),this.closeButton.text.setText("关闭").setFontColor(JColor.red).setFontSize(22),this.closeButton.onClick=function(){return this.parent.visible=!1,this.parent.onCloseButtonClick&&this.parent.onCloseButtonClick(),!0},this.addControlInLast([this.title,this.closeButton])},hideTitle:function(){if(this.isShowTitle){this.isShowTitle=!1,this.title.visible=!1,this.closeButton.visible=!1;for(var t=0;t<this.controls.length;t++)this.controls[t].relativePosition.y-=this.titleHeight}},showTitle:function(t){if(this.title.setText(t),!this.isShowTitle){for(var i=0;i<this.controls.length;i++)this.controls[i].relativePosition.y+=this.titleHeight;this.isShowTitle=!0,this.title.visible=!0,this.closeButton.visible=!0}},onCloseButtonClick:null,clearControls:function($super){$super(),this.initTitle(),this.hideTitle()}}),t.exports=n},function(t,exports,i){"use strict";var e=i(0),o=i(1),n={};n=e.create(o,{context:null,canvas:null,webPosition:null,mousePosition:null,initialize:function($super,t){$super({x:0,y:0},t),this.canvas=document.getElementById("canvas"),this.context=this.canvas.getContext("2d");for(var i=0,e=0,o=this.canvas;null!=o;)i+=o.offsetTop,e+=o.offsetLeft,o=o.offsetParent;this.webPosition={x:e,y:i},this.setFocus(),this.canvas.width=parseInt(this.size.width*JMain.JZoom.x),this.canvas.height=parseInt(this.size.height*JMain.JZoom.y),this.canvas.onclick=function(t){JMain.JForm.mousePosition={x:parseInt((t.pageX-JMain.JForm.webPosition.x)/JMain.JZoom.x),y:parseInt((t.pageY-JMain.JForm.webPosition.y)/JMain.JZoom.y)},JMain.JForm.onControlClick.call(JMain.JForm)},this.canvas.onmousedown=function(t){JMain.JForm.mousePosition={x:parseInt((t.pageX-JMain.JForm.webPosition.x)/JMain.JZoom.x),y:parseInt((t.pageY-JMain.JForm.webPosition.y)/JMain.JZoom.y)},JMain.JForm.onControlMouseDown.call(JMain.JForm)},this.canvas.onmouseup=function(t){JMain.JForm.mousePosition={x:parseInt((t.pageX-JMain.JForm.webPosition.x)/JMain.JZoom.x),y:parseInt((t.pageY-JMain.JForm.webPosition.y)/JMain.JZoom.y)},JMain.JForm.onControlMouseUp.call(JMain.JForm)},this.canvas.addEventListener("touchstart",function(t){t.pageX=t.pageX||t.changedTouches[0].pageX,t.pageY=t.pageY||t.changedTouches[0].pageY,JMain.JForm.mousePosition={x:parseInt((t.pageX-JMain.JForm.webPosition.x)/JMain.JZoom.x),y:parseInt((t.pageY-JMain.JForm.webPosition.y)/JMain.JZoom.y)},JMain.JForm.onControlMouseDown.call(JMain.JForm)}),this.canvas.addEventListener("touchend",function(t){t.pageX=t.pageX||t.changedTouches[0].pageX,t.pageY=t.pageY||t.changedTouches[0].pageY,JMain.JForm.mousePosition={x:parseInt((t.pageX-JMain.JForm.webPosition.x)/JMain.JZoom.x),y:parseInt((t.pageY-JMain.JForm.webPosition.y)/JMain.JZoom.y)},JMain.JForm.onControlMouseUp.call(JMain.JForm)}),document.onkeydown=function(t){t=window.event||t;var i=t.keyCode||t.which;JMain.JForm.onControlKeyDown(i)},document.onkeyup=function(t){t=window.event||t;var i=t.keyCode||t.which;JMain.JForm.onControlKeyUp(i)}}}),t.exports=n},function(t,exports,i){"use strict";var e=i(0),o=i(1),n={};n=e.create(o,{text:null,initialize:function($super,t,i){$super(t,i),this.text=new JLabel({x:0,y:0}).setSize(i).setTextBaseline("middle").setTextAlign("center").setFontType("bold").setFontSize(20),this.addControlInLast([this.text])},setText:function(t){return this.text.setText(t),this},setSize:function(t){return t&&(this.size=t,this.text.setSize({width:t.width,height:t.height})),this}}),t.exports=n},function(t,exports,i){"use strict";var e=i(0),o=i(1),n={};n=e.create(o,{text:"",textPos:null,fontType:"normal",fontColor:null,textAlign:"left",textBaseline:"top",fontSize:10,isSelect:!1,initialize:function($super,t,i){$super(t,{width:100,height:20}),this.text=i+"",this.textPos={x:2,y:2},this.fontSize=15,this.fontColor=JColor.black},setText:function(t){return this.text=t,this},setTextPos:function(t){return this.textPos=t,this},setFontType:function(t){return this.fontType=t,this},setFontColor:function(t){return this.fontColor=t,this},setTextAlign:function(t){return this.textAlign=t,this},setTextBaseline:function(t){return this.textBaseline=t,this},setFontSize:function(t){return this.fontSize=t,this},showing:function($super,t,i,e,o){$super();var n=JMain.JForm.context;if(this.text){var s=parseFloat(JMain.JZoom.y)+parseFloat(JMain.JZoom.x);n.fillStyle=this.fontColor.data,n.font=this.fontType+" "+parseInt(this.fontSize*s/2)+"px serif",n.textBaseline=this.textBaseline,n.textAlign=this.textAlign;var a,r;"left"==n.textAlign?a=t+parseInt(this.textPos.x*JMain.JZoom.x):"center"==n.textAlign?a=t+parseInt(e/2):"right"==n.textAlign&&(a=t+e-parseInt(this.textPos.x*JMain.JZoom.x)),"top"==n.textBaseline?r=i+parseInt(this.textPos.y*JMain.JZoom.y):"middle"==n.textBaseline?r=i+parseInt(o/2):"bottom"==n.textBaseline&&(r=i+o-parseInt(this.textPos.y*JMain.JZoom.y)),n.fillText(this.text,a,r,this.size.width)}this.isSelect&&(n.strokeStyle=JColor.red.data,n.lineWidth=1,n.strokeRect(t,i,e-n.lineWidth,o-n.lineWidth))}}),t.exports=n},function(t,exports,i){"use strict";var e=i(0),o={};o=e.create({time:40,fun:[],handle:null,initialize:function(t){this.time=t,this.fun=[],this.handle=null},begin:function(){this.handle=setTimeout(this.runOneTime,this.time)},end:function(){this.handle&&clearTimeout(this.handle)},add:function(t){if(t)for(var i=0;i<t.length;i++)this.fun[this.fun.length]=t[i]},delete:function(t){if(t)for(var i=0;i<this.fun.length;i++)if(this.fun[i].ID==t.ID){for(var e=i;e<this.fun.length-1;e++)this.fun[e]=this.fun[e+1];this.fun.length--}},runOneTime:function(){JMain.JTick.end();for(var t=0;t<JMain.JTick.fun.length;t++)JMain.JTick.fun[t]&&JMain.JTick.fun[t].show.call(JMain.JTick.fun[t]);JMain.JTick.handle=setTimeout(JMain.JTick.runOneTime,JMain.JTick.time)}}),t.exports=o},function(t,exports,i){"use strict";var e=i(0),o={};o=e.create({audioData:null,initialize:function(t,i){this.setAudio(t,i)},setAudio:function(t,i){t&&(this.audioData=t.data,i&&(this.audioData.loop=!0))},play:function(){this.audioData&&this.audioData.play()},pause:function(){this.audioData&&this.audioData.pause()}}),t.exports=o},function(t,exports,i){"use strict";var e=i(0),o=i(1),n={};n=e.create(o,{initialize:function($super,t,i,e){e||(e={x:parseInt((JMain.JForm.size.width-t.width)/2),y:parseInt((JMain.JForm.size.height-t.height)/2)}),$super(e,t),this.BGColor=JColor.white,JMain.JForm.addControlInLast([this]);var o=new JLabel({x:0,y:0},"系统提示");o.BGColor=JColor.blue,o.fontColor=JColor.red,o.size.width=t.width,o.size.height=25,o.fontSize=20,o.fontType="bold",this.addControlInLast([o]);for(var n=o.size.height,s=0;s<i.length;s++){var a=new JLabel({x:0,y:n},i[s]);a.size.width=t.width,a.textPos.x=10,n+=a.size.height,this.addControlInLast([a])}this.size.height=n+20},onClick:function(){this.remove.call(this),JMain.JForm.show()}}),t.exports=n},function(t,exports,i){"use strict";var e=i(0),o=i(1),n={};n=e.create(o,{animationName:null,animationPlayNum:null,animationTime:null,animationOffset:null,loop:null,stopPlayAnimation:null,initialize:function($super,t,i,e){$super(t,i),this.animationName=e,this.animationPlayNum=0,this.animationTime=0,this.animationOffset={WNum:0,HNum:0},this.loop=!0,this.stopPlayAnimation=!1},showing:function($super,t,i,e,o){if(this.animationName){var n=Resources.Animation[this.animationName],s=Resources.Images[n.imageName],a=s.cellSize.width,r=s.cellSize.height,l=this.animationOffset.times||n.times,h=this.animationOffset.allPlayNum||n.allPlayNum,u=(n.beginPoint.WNum+this.animationOffset.WNum+this.animationPlayNum)%s.picNum.WNum,c=n.beginPoint.HNum+this.animationOffset.HNum+parseInt((n.beginPoint.WNum+this.animationOffset.WNum+this.animationPlayNum)/s.picNum.WNum);JMain.JForm.context.drawImage(s.data,a*u,r*c,a,r,t,i,e,o),this.isHighLight&&(JMain.JForm.context.save(),JMain.JForm.context.globalCompositeOperation="lighter",JMain.JForm.context.globalAlpha=.2*this.alpha,JMain.JForm.context.drawImage(s.data,a*u,r*c,a,r,t,i,e,o),JMain.JForm.context.restore()),this.stopPlayAnimation||this.animationTime++,this.animationTime>=l&&(this.animationPlayNum++,this.animationPlayNum>=h&&(this.loop?this.animationPlayNum=0:this.remove()),this.animationTime=0)}$super(t,i,e,o)},setAnimation:function(t){return this.animationName=t,this}}),t.exports=n},function(t,exports,i){"use strict";var e=i(0),o=i(1),n={};n=e.create(o,{picture:null,picAlpha:null,picState:null,picPosition:null,picSize:null,initialize:function($super,t,i,e,o){$super(t,i),this.picAlpha=1,this.picState="cut";var n=o||{x:0,y:0};e&&this.setPicture(e,n)},setPicture:function(t,i){return t&&(this.picture=t.data,this.picSize={width:t.cellSize.width,height:t.cellSize.height}),this.picPosition=i||{x:0,y:0},this},showing:function($super,t,i,e,o){var n=JMain.JForm.context;this.picture&&(n.save(),n.globalAlpha=this.alpha*this.picAlpha,"flex"==this.picState?n.drawImage(this.picture,0,0,this.picture.width,this.picture.height,t,i,e,o):"cut"==this.picState&&n.drawImage(this.picture,this.picPosition.x,this.picPosition.y,this.picSize.width,this.picSize.height,t,i,e,o),n.restore()),this.selected&&(n.strokeStyle=JColor.red.data,n.lineWidth=1,n.strokeRect(t+n.lineWidth,i+n.lineWidth,e-2*n.lineWidth,o-2*n.lineWidth)),$super(t,i,e,o)}}),t.exports=n},function(t,exports,i){"use strict";var e=i(0),o={};o=e.create({loadedNum:0,resourceNum:0,imagesNum:0,soundNum:0,mapsNum:0,initialize:function(){console.log("JPreLoad");for(var t in Resources.Images)this.imagesNum++,this.resourceNum++;for(var i in Resources.Sound)this.soundNum++,this.resourceNum++;for(var e in Resources.Maps)this.mapsNum++,this.resourceNum++},loadAll:function(t){t&&(this.loadPost=t),this.loadImage()},loadPost:function(t){console.log("loadPost")},loadEnd:function(){console.log("loadEnd")},imageLoadPost:function(){this.loadedNum++;var t=Math.round(100*parseFloat(this.loadedNum/this.resourceNum));if(this.loadPost(t),this.loadedNum>=this.imagesNum)return void this.loadAudio()},audioLoadPost:function(){this.loadedNum++;var t=Math.round(100*parseFloat(this.loadedNum/this.resourceNum));if(this.loadPost(t),this.loadedNum>=this.imagesNum+this.soundNum)return void this.loadJson()},jsonLoadPost:function(){this.loadedNum++;var t=Math.round(100*parseFloat(this.loadedNum/this.resourceNum));if(this.loadPost(t),this.loadedNum>=this.resourceNum)return this.loadedNum=0,this.resourceNum=0,void this.loadEnd()},loadImage:function(t){var i=this;t&&(this.loadPost=t),0==this.imagesNum?(this.loadedNum--,this.imageLoadPost()):function(){var t=i;for(var e in Resources.Images)Resources.Images[e].data=new Image,Resources.Images[e].data.src=GMain.URL+Resources.Images[e].path,Resources.Images[e].data.onload=function(){t.imageLoadPost()},Resources.Images[e].data.onerror=function(){console.log("资源加载失败！")}}()},loadAudio:function(t){var i=this;t&&(this.loadPost=t),0==this.soundNum?(this.loadedNum--,this.audioLoadPost()):function(){var t=i;for(var e in Resources.Sound)Resources.Sound[e].data=new Audio,""!=Resources.Sound[e].data.canPlayType("video/ogg")?Resources.Sound[e].data.src=GMain.URL+resources.Sound[e].path+resources.Sound[e].soundName+".ogg":Resources.Sound[e].data.src=GMain.URL+resources.Sound[e].path+resources.Sound[e].soundName+".mp3",Resources.Sound[e].data.addEventListener("canplaythrough",function(){t.audioLoadPost()},!1),Resources.Sound[e].data.addEventListener("error",function(){console.log("资源加载失败！")},!1)}()},loadJson:function(t){var i=this;t&&(this.loadPost=t),0==this.mapsNum?(this.loadedNum--,this.jsonLoadPost()):function(){var t=i;for(var e in Resources.Maps)!function(i){var e=new XMLHttpRequest;e.open("get",GMain.URL+Resources.Maps[i].path),e.send(null),e.onload=function(){if(200==e.status){var o=JSON.parse(e.responseText);Resources.Maps[i].data=o,t.jsonLoadPost()}else console.log("资源加载错误！")},e.onerror=function(){console.log("资源加载失败！")}}(e)}()}}),t.exports=o},function(t,exports,i){"use strict";var e={};e._keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e.encode=function(t){var i="",o=void 0,n=void 0,s=void 0,a=void 0,r=void 0,l=void 0,h=void 0,u=0;for(t=e._utf8_encode(t);u<t.length;)o=t.charCodeAt(u++),n=t.charCodeAt(u++),s=t.charCodeAt(u++),a=o>>2,r=(3&o)<<4|n>>4,l=(15&n)<<2|s>>6,h=63&s,isNaN(n)?l=h=64:isNaN(s)&&(h=64),i=i+e._keyStr.charAt(a)+e._keyStr.charAt(r)+e._keyStr.charAt(l)+e._keyStr.charAt(h);return i},e.decode=function(t){var i="",o=void 0,n=void 0,s=void 0,a=void 0,r=void 0,l=void 0,h=void 0,u=0;for(t=t.replace(/[^A-Za-z0-9+/=]/g,"");u<t.length;)a=e._keyStr.indexOf(t.charAt(u++)),r=e._keyStr.indexOf(t.charAt(u++)),l=e._keyStr.indexOf(t.charAt(u++)),h=e._keyStr.indexOf(t.charAt(u++)),o=a<<2|r>>4,n=(15&r)<<4|l>>2,s=(3&l)<<6|h,i+=String.fromCharCode(o),64!=l&&(i+=String.fromCharCode(n)),64!=h&&(i+=String.fromCharCode(s));return i=e._utf8_decode(i)},e._utf8_encode=function(t){t=t.replace(/rn/g,"n");for(var i="",e=0;e<t.length;e++){var o=t.charCodeAt(e);o<128?i+=String.fromCharCode(o):o>127&&o<2048?(i+=String.fromCharCode(o>>6|192),i+=String.fromCharCode(63&o|128)):(i+=String.fromCharCode(o>>12|224),i+=String.fromCharCode(o>>6&63|128),i+=String.fromCharCode(63&o|128))}return i},e._utf8_decode=function(t){for(var i="",e=0,o=void 0,n=void 0,s=o=n=0;e<t.length;)s=t.charCodeAt(e),s<128?(i+=String.fromCharCode(s),e++):s>191&&s<224?(n=t.charCodeAt(e+1),i+=String.fromCharCode((31&s)<<6|63&n),e+=2):(n=t.charCodeAt(e+1),c3=t.charCodeAt(e+2),i+=String.fromCharCode((15&s)<<12|(63&n)<<6|63&c3),e+=3);return i},t.exports=e},function(t,exports,i){"use strict";var e={};e.IsMobile=function(){var t=navigator.userAgent.toLowerCase(),i="ipad"==t.match(/ipad/i),e="iphone os"==t.match(/iphone os/i),o="midp"==t.match(/midp/i),n="rv:1.2.3.4"==t.match(/rv:1.2.3.4/i),s="ucweb"==t.match(/ucweb/i),a="android"==t.match(/android/i),r="windows ce"==t.match(/windows ce/i),l="windows mobile"==t.match(/windows mobile/i);return!!(i||e||o||n||s||a||r||l)},e.FullScreen=function(){var t=document.documentElement,i=t.requestFullScreen||t.webkitRequestFullScreen||t.mozRequestFullScreen||t.msRequestFullscreen;void 0!==i&&i&&i.call(t)},e.ExitFullScreen=function(){document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen(),"undefined"!=typeof cfs&&cfs&&cfs.call(el)},e.IsFullscreen=function(){return document.fullscreenElement||document.msFullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||!1},e.GetElementById=function(t){var i=document.getElementById(t);return null!=i&&(i.state=!1,i.show=function(t){this.state=!0,this.style.display="block"},i.hide=function(t){this.state=!1,this.style.display="none"},i.text=function(t){this.innerHTML=t},i.attrbute=function(t,i){if(void 0==i)return this.getAttribute(t);this.setAttribute(t,i)},i.append=function(t){this.appendChild(t)},i.remove=function(t){this.removeChild(t)},i)},e.Random=function(t,i){return parseInt(Math.random()*(i-t+1)+t)},e.setLSData=function(t,i){var e=JSON.stringify(i);window.localStorage.setItem(t,JBase64.encode(e))},e.getLSData=function(t){var i=window.localStorage.getItem(t);return i&&(i=JBase64.decode(window.localStorage.getItem(t))),JSON.parse(i)},e.getNowTime=function(){var t=new Date;return t.getFullYear()+"/"+(t.getMonth()+1)+"/"+t.getDate()+" "+t.getHours()+":"+t.getMinutes()},e.getImageData=function(t,i,e){return t.getImageData(i.x,i.y,e.width,e.height)},e.drawImageData=function(t,i,e,o,n){o||(o={x:0,y:0}),n||(n={width:i.width,height:i.height}),t.putImageData(i,e.x,e.y,o.x,o.y,n.width,n.height)},e.invert=function(t){for(var i=t,e=0;e<i.data.length;e+=4){var o=i.data[e],n=i.data[e+1],s=i.data[e+2],a=i.data[e+3];i.data[e]=255-o,i.data[e+1]=255-n,i.data[e+2]=255-s,i.data[e+3]=a}return i},e.changeToGray=function(t){for(var i=t,e=0;e<i.data.length;e+=4){var o=parseInt((i.data[e]+i.data[e+1]+i.data[e+2])/3);i.data[e]=o,i.data[e+1]=o,i.data[e+2]=o}return i},e.changeToRed=function(t){for(var i=t,e=0;e<i.data.length;e+=4)i.data[e]+=50,i.data[e]>255&&(i.data[e]=255);return i},e.rotate=function(t,i,e){var o=t.createImageData(i.width,i.height),n=void 0,s=void 0,a=void 0,r=void 0,l=void 0,h=void 0,u=void 0,c=i.width/2,d=i.height/-2,m=3.14159;for(s=0;s<o.height;s++)for(n=0;n<o.width;n++)a=4*(i.width*s+n),l=function(t){var i=e*m/180,o=(t.x-c)*Math.cos(i)-(t.y-d)*Math.sin(i),n=(t.x-c)*Math.sin(i)+(t.y-d)*Math.cos(i);return{x:o+c,y:n+d}}({x:n,y:-1*s}),h=parseInt(l.x),u=parseInt(l.y),h>=0&&h<i.width&&-u>=0&&-u<i.height&&(r=4*(i.width*-u+h),o.data[a]=i.data[r],o.data[a+1]=i.data[r+1],o.data[a+2]=i.data[r+2],o.data[a+3]=i.data[r+3]);return o},e.highLight=function(t,i){for(var e=t,o=0;o<e.data.length;o+=4)e.data[o]=e.data[o]+i>255?255:e.data[o]+i,e.data[o+1]=e.data[o+1]+i>255?255:e.data[o+1]+i,e.data[o+2]=e.data[o+2]+i>255?255:e.data[o+2]+i;return e},t.exports=e},function(t,exports,i){"use strict";var e={white:{data:"#FFFFFF",r:255,g:255,b:255},black:{data:"#000000",r:0,g:0,b:0},red:{data:"#cf3a01",r:207,g:58,b:1},green:{data:"#7dbd5d",r:125,g:189,b:93},blue:{data:"#2da0ec",r:45,g:160,b:236},yellow:{data:"#fcce0e",r:252,g:206,b:14},gray:{data:"#b8c7d1",r:184,g:199,b:209}};t.exports=e},function(t,exports,i){"use strict";var e={JZoom:{x:1,y:1},JFocusControl:null,JForm:null,JTick:null,JID:0};t.exports=e}]);