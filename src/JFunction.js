let JFunction = {};

JFunction.IsMobile = function () {
    let sUserAgent = navigator.userAgent.toLowerCase();
    let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    let bIsMidp = sUserAgent.match(/midp/i) == "midp";
    let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    let bIsAndroid = sUserAgent.match(/android/i) == "android";
    let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) ){
        return false;
    }
    return true;
};

JFunction.FullScreen = function () {
    let el = document.documentElement;
    let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;      
    if(typeof rfs != "undefined" && rfs) {
        rfs.call(el);
    };
    return;
};

JFunction.ExitFullScreen = function () {
    if (document.exitFullscreen) {  
        document.exitFullscreen();  
    }  
    else if (document.mozCancelFullScreen) {  
        document.mozCancelFullScreen();  
    }  
    else if (document.webkitCancelFullScreen) {  
        document.webkitCancelFullScreen();  
    }  
    else if (document.msExitFullscreen) {  
        document.msExitFullscreen();  
    } 
    if(typeof cfs != "undefined" && cfs) {
        cfs.call(el);
    }
};


JFunction.IsFullscreen = function(){
    return document.fullscreenElement    ||
           document.msFullscreenElement  ||
           document.mozFullScreenElement ||
           document.webkitFullscreenElement || false;
}

JFunction.GetElementById = function (name){
    let element = document.getElementById(name); 
    if( element == null ) return false;
    element.state = false;
    element.show = function(e){
        this.state = true;
        this.style.display = 'block';
    }
    element.hide = function(e){
        this.state = false;
        this.style.display = 'none';
    }
    element.text = function(e){this.innerHTML = e;}
    element.attrbute = function(name,value){
        if( value == undefined ){
            return this.getAttribute(name);
        }
        this.setAttribute(name,value);
    }
    element.append = function(e){this.appendChild(e);}
    element.remove = function(e){this.removeChild(e);}
    return element;
}

JFunction.Random = function (formNum, toNum) {
    return parseInt(Math.random() * (toNum - formNum + 1) + formNum);
};
JFunction.setLSData = function (key, jsonValue) {
    let data = JSON.stringify(jsonValue);
    window.localStorage.setItem(key, JBase64.encode(data));
};
JFunction.getLSData = function (key) {
    let data = window.localStorage.getItem(key);
    if( data ){
        data = JBase64.decode(window.localStorage.getItem(key));
    }
    return JSON.parse(data);
};
JFunction.getNowTime=function(){
    let now = new Date();
    let year = now.getFullYear();       //年
    let month = now.getMonth() + 1;     //月
    let day = now.getDate();            //日
    let hh = now.getHours(); //时
    let mm = now.getMinutes();  //分
    return year+"/"+month+"/"+day+" "+hh+":"+mm;
};

//获取图片数据
JFunction.getImageData=function (_context, _point, _size) {
    return _context.getImageData(_point.x, _point.y, _size.width, _size.height);
};
//通过图片数据绘制图片
JFunction.drawImageData=function (_context, _imgdata, _point, _dPoint, _dSize) {
    if (!_dPoint)_dPoint = {x:0, y:0};
    if (!_dSize)_dSize = {width:_imgdata.width, height:_imgdata.height};
    _context.putImageData(_imgdata, _point.x, _point.y, _dPoint.x, _dPoint.y, _dSize.width, _dSize.height);
};
//颜色反转
JFunction.invert=function (_imgData) {
    let imageData = _imgData;
    for (let i = 0; i < imageData.data.length; i += 4) {
        let red = imageData.data[i], green = imageData.data[i + 1], blue = imageData.data[i + 2], alpha = imageData.data[i + 3];
        imageData.data[i] = 255 - red;
        imageData.data[i + 1] = 255 - green;
        imageData.data[i + 2] = 255 - blue;
        imageData.data[i + 3] = alpha;
    }
    return imageData;
};
//灰色
JFunction.changeToGray=function (_imgData) {
    let imageData = _imgData;
    for (let i = 0; i < imageData.data.length; i += 4) {
        let wb = parseInt((imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3);
        imageData.data[i] = wb;
        imageData.data[i + 1] = wb;
        imageData.data[i + 2] = wb;
    }
    return imageData;
};
//加红
JFunction.changeToRed=function (_imgData) {
    let imageData = _imgData;
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] += 50;
        if (imageData.data[i] > 255) imageData.data[i] = 255;

    }
    return imageData;
};
//图片旋转
JFunction.rotate=function (_context, _imageData, angle) {
    let returnData = _context.createImageData(_imageData.width, _imageData.height);
    let w, h, i, j, newPoint, x, y;
    let centerX = _imageData.width / 2.0;
    let centerY = _imageData.height / -2.0;
    let PI = 3.14159;
    for (h = 0; h < returnData.height; h++) {
        for (w = 0; w < returnData.width; w++) {
            i = (_imageData.width * h + w) * 4;
            newPoint = GetNewPoint({x:w, y:h * -1});
            x = parseInt(newPoint.x);
            y = parseInt(newPoint.y);
            if (x >= 0 && x < _imageData.width && -y >= 0 && -y < _imageData.height) {
                j = (_imageData.width * -y + x) * 4;
                returnData.data[i] = _imageData.data[j];
                returnData.data[i + 1] = _imageData.data[j + 1];
                returnData.data[i + 2] = _imageData.data[j + 2];
                returnData.data[i + 3] = _imageData.data[j + 3];
            }
        }
    }
    return returnData;
    function GetNewPoint(_point) {
        let l = (angle * PI) / 180;
        let newX = (_point.x - centerX) * Math.cos(l) - (_point.y - centerY) * Math.sin(l);
        let newY = (_point.x - centerX) * Math.sin(l) + (_point.y - centerY) * Math.cos(l);
        return {x:newX + centerX, y:newY + centerY};
    }
};
//高亮整个图片
JFunction.highLight=function (_imgData, n) {
    let imageData = _imgData;
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i]  = (imageData.data[i] +n)>255?255:(imageData.data[i] +n);
        imageData.data[i + 1] = (imageData.data[i+1] +n)>255?255:(imageData.data[i+1] +n);
        imageData.data[i + 2 ] = (imageData.data[i+2] +n)>255?255:(imageData.data[i+2] +n);
    }
    return imageData;
};

module.exports = JFunction;