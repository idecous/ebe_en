var CEvent = function(name,data){
	this.name = name;
	this.data = data === undefined ? null : data;
	this.target = null; 
};
var ScrollBarV = function(el){
	this._eventCollection = {};
	this.el = el;
	this.rate = 1;
	this.value = 0;
    this.maximum = 0;
    this.thumbSize = 0;
    this.extraPos = 0;
    this.startPos = 0;
    this.minThumbSize = 20;
    this.isDraging = false;
    this.dragStartValue = 0;
    this.changeEvent = new CEvent("VALUE_CHANGE_EVENT");
    this.dragEvent = new CEvent("DRAG_EVENT",[]);
	this.init();
};
(function(){
	this.init = function() {
        this.build();
        this.thumb.mousedown($.proxy(this._startDrag, this));
        this.el.mousedown($.proxy(this._trackClickHandler, this));
    };
    this._trackClickHandler = function(e) {
        if (this.isDraging) {
            return;
        }
        var mousePosY = e.pageY - this.el.offset().top;
        var thumbY = parseInt(this.thumb.css("top"));
        var thumbHeight = parseInt(this.thumb.css("height"));
        var tY = mousePosY <= thumbY ? mousePosY : mousePosY - thumbHeight;
        this.thumb.css("top", tY + "px");
        var value = this._posToValue(tY, this.thumbSize - thumbHeight);
        if (this.value == value) {
            return;
        }
        this.value = value;
        this.changeEvent.data = value;
        this.dispatchEvent(this.changeEvent);
    };
    this._startDrag = function(e) {
        this.extraPos = e.pageY - this.thumb.offset().top;
        this.startPos = e.pageY;
        this.documentEl.bind("mousemove", $.proxy(this._mouseMoveFn, this));
        this.documentEl.bind("mouseup", $.proxy(this._mouseUpFn, this));
        if (window.captureEvents) {
            window.addEventListener(Event.MOUSEMOVE, null, true);
            window.addEventListener(Event.MOUSEUP, null, true);
        } else if (this.thumb[0].setCapture) {
            this.thumb[0].setCapture();
        }
        this.isDraging = true;
        this.dragStartValue = this.value;
        this.dragEvent.data[0] = "BEGIN";
        this.dragEvent.data[1] = 0;
        this.dispatchEvent(this.dragEvent);
        return false;
    };
    this._mouseMoveFn = function(e) {
        var tY = e.pageY - this.el.offset().top - this.extraPos;
        if (tY < 0) {
            tY = 0;
        }
        var thumbH = parseInt(this.thumb.css("height")) ;
        if (tY + thumbH > this.maximum * this.rate) {
            tY = this.maximum * this.rate - thumbH;
        }
        this.thumb.css("top", tY );
        var value = this._posToValue(tY,this.maximum* this.rate - thumbH);
        if (this.value == value) {
            return;
        }
        this.value = value;
        this.changeEvent.data = value;
        this.dispatchEvent(this.changeEvent);
    };
    this._mouseUpFn = function(e) {
        this.documentEl.unbind();
        if (window.releaseEvents) {
            window.removeEventListener(Event.MOUSEMOVE, null, true);
            window.removeEventListener(Event.MOUSEUP, null, true);
        } else if (this.thumb[0].releaseCapture) {
            this.thumb[0].releaseCapture();
        }
        this.isDraging = false;
        this.dragEvent.data[0] = "END";
        this.dragEvent.data[1] = this.value - this.dragStartValue ;
        this.dispatchEvent(this.dragEvent);
    };
	this.setMaximum = function(value) { 
        this.rate = this.el.height() / value;
        this.maximum = value;
        this.value = this.value > this.maximum ? this.maximum : this.value;
        var thumbH = this.thumbSize / this.maximum * this.thumbSize;
        if (isNaN(thumbH) || thumbH < this.minThumbSize) {
            thumbH = this.minThumbSize;
        }
        this.thumb.css("height", thumbH * this.rate );
    };
	this.setThumbSize = function(value) {
        this.thumbSize = value;
        this.thumb.css("height", this.thumbSize * this.rate ); 
    };
    this.setValue = function(value) {
        this.value = value;
        this.value = this.value > this.maximum  ? this.maximum  : this.value;
        this.value = this.value < 0 ? 0 : this.value;
        var tY = (this.value / this.maximum) * (this.maximum - this.thumbSize);
        this.thumb.css("top", tY * this.rate);
    };
	this.build = function() {
		this.documentEl = $(document);
        this.thumb = $("<a class='thumb'></a>").appendTo(this.el);
        this.setVisible(false);
    };
	this.setVisible = function(value) {return;
		if (value) {
			this.el.css("display", "block");
		} else {
			this.el.css("display", "none");
		}
	};
	this._posToValue = function(posVlaue, posMax) {
		return posVlaue / posMax * this.maximum ;
	}; 
	this.dispatchEvent = function(event) {
		for (var key in this._eventCollection ) {
			if (key.toString() == event.name) {
				var handleFns = this._eventCollection[key];
				event.target = this;
				for (var i = 0; i < handleFns.length; i++) {
					handleFns[i].call(this, event);
				}
			}
		}
	};
	this.addEventListener = function(eventName, eventFn) {
		if (this._eventCollection[eventName]) {
			this._eventCollection[eventName].push(eventFn);
		} else {
			this._eventCollection[eventName] = [eventFn];
		}
	};
}).call(ScrollBarV.prototype);

$(function(){
	var phoneViewWidth = 785;
	var windowResizeTimeID = 0 ,autoScrollTimeID=0,scrollDirection="UP",tDirection,animScrollTarget,animScrollSpeed,animScrollValue;
	var screenHeight = 0;
	var screenWidth = 0;
	var bottomPadding = 70;
	var topPadding = 145;
	var logoGraphicMiddleTop = 0;
	var logoTextMiddleTop = 0;
	var logoGraphicEl = $(".mainViewArea .logoGraphic");
	var logoTextEl = $(".mainViewArea .logoText");
	var mainViewEl = $(".mainViewArea");
	var contenBlockEl = $(".mainViewArea .contentBlock");
	var scrollBar = new ScrollBarV( $(".mainViewArea .scrollBar") );
	scrollBar.setThumbSize( 20 );
	windowResizeHandler();
	contenBlockEl.show();
	logoGraphicEl.show();
	logoTextEl.show();
	if ( navigator.userAgent.toLowerCase().indexOf("firefox")!=-1 ) {
        mainViewEl.get(0).addEventListener('DOMMouseScroll', function(e) {
        	if(screenWidth < phoneViewWidth){return;}
            tDirection = e.detail;
            if (Math.abs(tDirection) == 3) {
                tDirection = tDirection < 0 ? -1 : 1;
            } else {
                tDirection = tDirection > 0 ? -1 : 1;
            }
            e.stopPropagation();
            e.preventDefault();
            _mouseScrollHandler(tDirection);
        }, false);
    } else {
        mainViewEl.get(0).onmousewheel = function(e) {
        	if(screenWidth < phoneViewWidth){return;}
            e = e || window.event;
            e.returnValue = false;
            tDirection = e.wheelDelta > 0 ? -1 : 1;
            _mouseScrollHandler(tDirection);
        };
    }
	scrollBar.addEventListener("VALUE_CHANGE_EVENT",$.proxy(updateScrollHandler,this));
	
	scrollBar.addEventListener("DRAG_EVENT",function(e){
		if( e.data[0] != "END"){ return; }
		animScrollHandler( e.data[1] <0?-1:1 );
	});
	function _mouseScrollHandler(direction){
		scrollBar.setValue( scrollBar.value + direction * 10 );
		updateScrollHandler();
		animScrollHandler(direction);
	}
	function animScrollHandler(direction){
		animScrollTarget = direction > 0? 100:0;
		animScrollSpeed =  direction * 2;
		animScrollValue = scrollBar.value;
		clearTimeout(autoScrollTimeID);
		_animScrollHandler();
		bottomMiddleContentEl.stop();
		if(direction==1){
			bottomMiddleContentEl.fadeIn(1000);
		}else{
			bottomMiddleContentEl.fadeOut(1000);
		}
	}
	function _animScrollHandler(){
		autoScrollTimeID = setTimeout(function() {
            if( Math.abs( animScrollTarget - animScrollValue ) > Math.abs(animScrollSpeed)*3 ){
                animScrollValue += animScrollSpeed;
            }else{
                animScrollValue += (animScrollTarget - animScrollValue)/3;
            }
            if (animScrollSpeed > 0 && animScrollTarget-0.5 <= animScrollValue) {
                animScrollValue = animScrollTarget;
            } else if (animScrollSpeed < 0 && animScrollTarget+0.5 >= animScrollValue) {
                animScrollValue = animScrollTarget;
            } else {
                _animScrollHandler();
            }
            scrollBar.setValue(animScrollValue);
            updateScrollHandler();
        }, 10);
	};
	function updateScrollHandler(){
		var rate = (100-scrollBar.value)/100;
		contenBlockEl.css("top", topPadding + rate * (screenHeight - bottomPadding -topPadding) );
		logoTextEl.css("top",60 + (logoTextMiddleTop-60)*rate );
		logoGraphicEl.css("top",-234 + (logoGraphicMiddleTop+234)*rate );
	};
	
	var touchStartY = 0;
	$("body").bind("mousedown touchstart",function(e){
		if(windowEl.width() < phoneViewWidth ){ return;}
		var touch = null;
		if( e.originalEvent.touches || e.originalEvent.changedTouches){
			touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		}
		if( touch ){
			e.pageY = touch.pageY;
		}
		touchStartY = e.pageY;
	}).bind("mouseup touchend",function(e){
		if(windowEl.width() < phoneViewWidth ){ return;}
		var touch = null;
		if( e.originalEvent.touches || e.originalEvent.changedTouches){
			touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		}
		if( touch ){
			e.pageY = touch.pageY;
		}
		touchStartY -= e.pageY;
		if( Math.abs( touchStartY ) < 20 ){return;}
		_mouseScrollHandler(  touchStartY<0?-1:1 );
		e.originalEvent.preventDefault();
	});

	//--
	var bottomContentEl = $(".mainViewArea .bottomContent");
	var bottomMiddleContentEl = $(".mainViewArea .contentMiddleBlock");
	var bottomContentImgBlockEl = bottomMiddleContentEl.children("a");
	var phoneLogoBlockEl = $(".phoneViewArea .logoBlock");
	var phoneScreenHeight = 0;
	var norNavBlockEl = $(".contentBlock>.centerBlock");
	var navigationListEl = $(".topNavigation");
	var phoneLogoBlockEl = $(".phoneViewArea>.logoBlock");
	//--
	var windowEl = $(window);
	windowEl.resize(function(){
    	clearTimeout(windowResizeTimeID);
    	windowResizeTimeID = setTimeout( windowResizeHandler,100);
    });
	function windowResizeHandler(){
		screenHeight = mainViewEl.height();
		screenWidth  = mainViewEl.width();
		contenBlockEl.height(screenHeight - topPadding);
		scrollBar.el.height( screenHeight - 16 );
		scrollBar.setMaximum( 100 );
		scrollBar.setValue( scrollBar.value );
		
		logoGraphicMiddleTop = (screenHeight-bottomPadding-300)/2;
		logoTextMiddleTop = (screenHeight-bottomPadding-300)/2 + 250;
	    updateScrollHandler();
	    contentResize(); 	   
	}
	function contentResize(){
		if(bottomMiddleContentEl==null){return;}
		if( windowEl.width() < phoneViewWidth){
			if(navigationListEl.parent()[0] == norNavBlockEl[0]){
				phoneLogoBlockEl.before(navigationListEl);
			}
		}else{
			if(navigationListEl.parent()[0] != norNavBlockEl[0]){
				norNavBlockEl.append( navigationListEl );
			}
		}
		phoneScreenHeight = windowEl.height() - 120;
		if(phoneScreenHeight < 370){ phoneScreenHeight = 370; }
		phoneLogoBlockEl.height( phoneScreenHeight );
		

		bottomContentEl.height( screenHeight-225 - 100 );
		var contentBlockHeight = screenHeight-225 - 100 - 40;
		if(contentBlockHeight > 450){
			contentBlockHeight = 450;
		}
		var imgWidth = screenWidth < 900?340:426;
		var imgHeight = screenWidth < 900?235:294;
		bottomMiddleContentEl.css({"height":contentBlockHeight,"marginTop": -contentBlockHeight/2 });
		bottomContentImgBlockEl.css( "marginTop" , (contentBlockHeight - imgHeight) / 2 );		
	};
	screenHeight = mainViewEl.height();
	screenWidth  = mainViewEl.width();
	contentResize();
	//--
	var imgEvensEl = $(".mainViewArea .contentMiddleBlock>a>img:even").show();
	var imgOddsEl = $(".mainViewArea .contentMiddleBlock>a>img:odd");
	var imgBlocksEl = $(".mainViewArea .contentMiddleBlock>a");
	imgBlocksEl.mouseenter(function(){
		var index = imgBlocksEl.index(this);
		imgEvensEl.eq( index ).hide();
		imgOddsEl.eq( index ).show();	
	}).mouseleave(function(){
		var index = imgBlocksEl.index(this);
		imgEvensEl.eq( index ).show();
		imgOddsEl.eq( index ).hide();
	});
	
});

