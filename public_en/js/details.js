$(function(){
	var windEl = $(window);
	var bodyEl = $("body");
	var documentEl = $(document);
	var PV_M_viewIndex = -1;
	var PV_L_scrollIndex = 0;
	var PV_L_viewIndex = 0;
	var PV_L_viewCount = 0;
	var PV_L_totalItem = 0;
	var PV_L_liWidth = 137;
	var PV_L_liRightM = 0;
	var PV_EL = $(".mainPreviewBlock");
	var PV_mainPreviewEl = PV_EL.children(".imgContainer");
	var PV_L_listEl = PV_EL.find(".listGroup");
	var PV_L_containerEl = PV_L_listEl.find(".listContainer");
	var PV_L_containerUlEl = PV_L_containerEl.find("ul");
	var PV_L_leftArrowEl = PV_L_listEl.find(".leftArrow");
	var PV_L_rightArrowEl = PV_L_listEl.find(".rightArrow");
	var PV_L_showMoreEl = PV_EL.find(".showMore");
	
	var PV_viewMaskEl = PV_EL.find(".whitehMask"); 
	var PV_viewAreaEl = PV_EL.find(".viewArea");
	var PV_viewAreaImgEl = PV_viewAreaEl.find("img");
	var PV_mouswAreaEl = PV_EL.find(".mouseArea"); 
	var PV_partViewEl = $(".mainParamBlock .partViewBlock");
	var PV_partViewBorderEl = $(".mainParamBlock .partViewBorder");
	
	var phoneOptionEl = $(".phoneOption");
	var PV_phoneNavEls = PV_EL.find(".phoneNavBlock");
	
	var PV_L_containerLiEl; 
	var PV_mainViewImgEl;
	var PV_phoneNavLiEls;

	function PV_resetPreview(){
		PV_L_containerLiEl = PV_L_containerUlEl.find("li");
		PV_L_totalItem = PV_L_containerLiEl.length;
		PV_L_containerUlEl.css("left",0);
		PV_L_leftArrowEl.hide();
		PV_L_rightArrowEl.hide();
		PV_L_scrollIndex = 0;
		PV_L_viewIndex = -1;
		PV_M_viewIndex = -1;
		PV_L_containerLiEl.eq(0).addClass("checked");
		PV_L_containerLiEl.mouseenter(PV_L_previewListItemEnterHandler);
		//--
		PV_mainViewImgEl = PV_mainPreviewEl.children("img");
		PV_partViewImgEl = PV_partViewEl.children("img");
		
		if( PV_phoneNavLiEls ){
			PV_phoneNavLiEls.unbind();
			PV_phoneNavEls.empty();
		}
		var i,str="";
		for( i=0; i< PV_mainViewImgEl.length;i++){
			str += "<a href='javascript:;'></a>";
		}
		PV_phoneNavEls.append( $(str) );
		PV_phoneNavLiEls = PV_phoneNavEls.find("a");
		PV_phoneNavLiEls.click(function(){
			var index = PV_phoneNavLiEls.index(this);
			PV_setMainViewIndex(index);
		});
		PV_setMainViewIndex(0);
	};
	function PV_updateViewListCountBySize(){
		var lWidth = PV_L_listEl.width();
		var mWidth = lWidth - 30;
		PV_L_viewCount = Math.floor( mWidth/PV_L_liWidth );
		var remain = mWidth % PV_L_liWidth;
		var spacer = remain;
		if( remain == 0){
			spacer = PV_L_liWidth;
			PV_L_viewCount--;
		}else if( remain < 4){
			spacer = PV_L_liWidth+remain;
			PV_L_viewCount--;
		}
		PV_L_liRightM = PV_L_viewCount ==0?0:spacer/(PV_L_viewCount-1);
		if( PV_L_liRightM > 20){
			PV_L_liRightM = 20;
		}
		PV_L_containerUlEl.width( PV_L_totalItem * ( PV_L_liWidth + PV_L_liRightM) );
		PV_L_containerLiEl.css("marginRight",PV_L_liRightM);
		var nWidth = PV_L_viewCount*PV_L_liWidth + (PV_L_viewCount-1)*PV_L_liRightM;
		var sideSpacer = (lWidth - nWidth)/2;
		PV_L_containerEl.css({"left":sideSpacer,"right":sideSpacer});
	
		if(PV_L_scrollIndex + PV_L_viewCount > PV_L_totalItem){
			PV_L_scrollIndex = PV_L_totalItem - PV_L_viewCount;
			PV_L_containerUlEl.css("left",-PV_L_scrollIndex * 141);
		}	
		if( PV_L_scrollIndex >= (PV_L_totalItem-PV_L_viewCount) ){ 
			PV_L_rightArrowEl.hide();
		}else if( PV_L_scrollIndex + PV_L_viewCount < PV_L_totalItem){
			PV_L_rightArrowEl.show();
		}	
		PV_L_containerUlEl.css( "left",-PV_L_scrollIndex * (PV_L_liWidth+PV_L_liRightM));
	}
	function PV_L_previewListItemEnterHandler(){
		var index = PV_L_containerLiEl.index(this);
		if( index == PV_L_viewIndex ){return;}
		var liEl = PV_L_containerLiEl.eq(index);
		if( liEl.find("i").length > 0 ){
			return;
		}
		PV_L_containerLiEl.eq(PV_L_viewIndex).removeClass("checked");
		PV_L_viewIndex = index;
		PV_L_containerLiEl.eq(PV_L_viewIndex).addClass("checked");
		PV_setMainViewIndex( PV_L_viewIndex );
	};
	function PV_setMainViewIndex(value){ 
		if( value ==  PV_M_viewIndex){return;}
		PV_mainViewImgEl.stop();
		if( PV_M_viewIndex != -1){
			PV_mainViewImgEl.eq( PV_M_viewIndex).css("zIndex",1).fadeOut();
		}
		PV_M_viewIndex = value;
		PV_mainViewImgEl.eq( PV_M_viewIndex).css("zIndex",2).fadeIn();
		
		PV_viewAreaImgEl.attr( "src",PV_mainViewImgEl.eq(value).attr("src") );
		PV_partViewImgEl.hide();
		PV_partViewImgEl.eq(value).show();
		
		PV_phoneNavLiEls.removeClass("selected");
		PV_phoneNavLiEls.eq(value).addClass("selected");
	}
	PV_L_leftArrowEl.click(function(){
		PV_L_containerUlEl.stop();
		PV_L_scrollIndex--;
		if(PV_L_scrollIndex <= 0){
			PV_L_leftArrowEl.hide();
		}
		PV_L_rightArrowEl.show();
		PV_L_containerUlEl.animate( {"left":-PV_L_scrollIndex * (PV_L_liWidth+PV_L_liRightM)} );
	});
	PV_L_rightArrowEl.click(function(){
		PV_L_containerUlEl.stop();
		PV_L_scrollIndex++;
		PV_L_leftArrowEl.show();
		if( PV_L_scrollIndex >= (PV_L_totalItem-PV_L_viewCount) ){ 
			PV_L_rightArrowEl.hide();
		}
		PV_L_containerUlEl.animate( {"left":-PV_L_scrollIndex * (PV_L_liWidth+PV_L_liRightM)} );
	});
	PV_L_showMoreEl.mouseenter(function(){
		PV_L_listEl.stop();
		PV_L_listEl.animate({"bottom":0},"fast",function(){
			PV_L_showMoreEl.hide();
		});
	});
	PV_L_listEl.mouseleave(function(){
		PV_L_listEl.stop();
		PV_L_listEl.animate({"bottom":-220},"fast",function(){
			PV_L_showMoreEl.css("display","");
		});
	});
	var PV_rateX,PV_rateY,PV_bordeWidth,PV_bordeHeight,PV_mWidth,PV_mHeight,isPhoneStatus;
	
	PV_mouswAreaEl.mouseenter(function(e){
		isPhoneStatus = phoneOptionEl.is(":visible");
		if( isPhoneStatus ){return; }
		PV_viewMaskEl.show();
		PV_viewAreaEl.show();
		PV_partViewBorderEl.show();
		PV_mWidth = PV_EL.width();
		PV_mHeight = PV_EL.height();
		PV_rateX =  PV_mWidth / PV_partViewImgEl.eq(PV_M_viewIndex).width() ; 
		PV_rateY =  PV_mHeight / PV_partViewImgEl.eq(PV_M_viewIndex).height() ; 
		PV_bordeWidth = PV_rateX * PV_partViewEl.width();
		PV_bordeHeight = PV_rateY * PV_partViewEl.height();
		
		PV_viewAreaEl.width(PV_bordeWidth).height(PV_bordeHeight);
		PV_viewAreaImgEl.width(PV_mWidth).height(PV_mHeight);
		
		updateViewArea(e.pageX,e.pageY);
	}).mouseleave(function(){
		if( isPhoneStatus ){return;}
		PV_viewMaskEl.hide();
		PV_viewAreaEl.hide();
		PV_partViewBorderEl.hide();
	}).mousemove(function(e){
		if( isPhoneStatus ){return;}
		updateViewArea(e.pageX,e.pageY);
	});
	var isTouch = false;
	var touchX = 0;
	PV_mouswAreaEl.bind("mousedown touchstart",function(e){
		isPhoneStatus = phoneOptionEl.is(":visible");
		if( !isPhoneStatus ){return; }
		isTouch = true;
		var touch = null;
		if( e.originalEvent.touches || e.originalEvent.changedTouches){
			touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		}
		if( touch ){
			e.pageX = touch.pageX;
		}
		touchX = e.pageX;
		if (window.captureEvents) {
            window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
        } else if (this.el.setCapture) {
            this.el.setCapture();
        }    
	});
	documentEl.bind("mouseup touchend", function(e){ 
		if( !isTouch ){ return; }
		isTouch = false;
		var touch = null;
		if( e.originalEvent.touches || e.originalEvent.changedTouches){
			touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		}
		if( touch ){
			e.pageX = touch.pageX;
		}
		var offsetX =  touchX - e.pageX;
		if( Math.abs(offsetX) < 50 ){
			return;
		}
		var index =  PV_M_viewIndex + (offsetX<0?1:-1);
		if(index<0){index=PV_mainViewImgEl.length-1;}
		if( index >= PV_mainViewImgEl.length ){
			index = 0;
		}
		PV_setMainViewIndex(index);
		if (window.releaseEvents) {
            window.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP);
        } else if (this.el.releaseCapture) {
            this.el.releaseCapture();
        }        
	});
	
	
	
	
	function updateViewArea(pX,pY){
		var mainPos = PV_EL.offset();
		var mouseX =  pX - mainPos.left;  
		var mouseY =  pY - mainPos.top;  
		var tX = mouseX - PV_bordeWidth/2;
		var tY = mouseY - PV_bordeHeight/2;
		if(tX < 0){ tX=0; }
		if(tY < 0){ tY=0; }
		if(tX > PV_mWidth - PV_bordeWidth){ tX = PV_mWidth - PV_bordeWidth;}
		if(tY > PV_mHeight - PV_bordeHeight){ tY = PV_mHeight- PV_bordeHeight;}
		PV_viewAreaEl.css( {"left":tX,"top": tY} );
		PV_viewAreaImgEl.css({"left":-tX,"top": -tY} );
		PV_partViewImgEl.css( {"left":-tX/PV_rateX + "px","top": -tY/PV_rateY + "px"} );
	};
	PV_resetPreview();
	PV_updateViewListCountBySize();
	//--
	var PM_priceEl = $(".mainParamBlock .price");
	var COLOR_El = $(".colorSelector>a");
	var COLOR_index = -1;
	COLOR_El.each(function(index){
		if( COLOR_El.eq(index).hasClass("selected") ){
			COLOR_index = index;
		}
	});
	COLOR_El.click(function(){
		var index  = COLOR_El.index(this);
		if( COLOR_index == index ){return;}
		COLOR_El.eq(COLOR_index).removeClass("selected");
		COLOR_index = index;
		COLOR_El.eq(COLOR_index).addClass("selected");
		var cData = colorData[ index ];
		if( cData == undefined ){return;}
		
		var i,str="";
		PV_mainPreviewEl.empty();
		for( i=0; i < cData.views.length ;i++ ){
			str += "<img src='" + cData.views[i] + "' />";
		}
		PV_mainPreviewEl.append( $(str) );
		
		PV_L_containerLiEl.unbind();
		PV_L_containerUlEl.empty();
		str = "";
		for( i=0; i < cData.thumbnails.length ;i++ ){
			if( i== cData.thumbnails.length-1 && cData.thumbnails.length != cData.views.length ){
				str += "<li><a href='"+ cData.movieUrl+"'><img src='" + cData.thumbnails[i] + "' /><i></i></a></li>";
				continue;
			}
			str += "<li><a href='javascript:;'><img src='" + cData.thumbnails[i] + "' /></a></li>";
		}
		PV_L_containerUlEl.append( $(str) );
		PV_partViewEl.empty();
		str = "";
		for( i=0; i < cData.largeViews.length ;i++ ){
			str += "<img src='" + cData.largeViews[i] + "' />";
		}
		PV_partViewEl.append( $(str) );
		PM_priceEl.text( cData.price);
		
		
		SIZE_El.unbind();
		sizeSelectorEl.empty();
		str ="";
		for( i=0; i <  cData.size.length ;i++){
			str += "<a href='javascript:;' title='"+
			cData.size[i].title+"'>"+ cData.size[i].text +"<input type='hidden' value='"+ cData.size[i].value +"'/></a>";
		}
		sizeSelectorEl.append( $(str) );
		PV_resetPreview();
		PV_updateViewListCountBySize();
		resetSize();
	});
	//--
	var sizeSelectorEl = $(".sizeSelector");
	var SIZE_El = null;
	var SIZE_index = -1;
	function resetSize(){
		SIZE_El = $(".sizeSelector>a");
		SIZE_index = -1;
		SIZE_El.each(function(index){
			if( SIZE_El.eq(index).hasClass("selected") ){
				SIZE_index = index;
			}
		});
		SIZE_El.click(function(){
			var index = SIZE_El.index(this);
			if(index == SIZE_index){return;}
			if(SIZE_index!=-1){
				SIZE_El.eq(SIZE_index).removeClass("selected");
			}
			SIZE_index = index;
			SIZE_El.eq(SIZE_index).addClass("selected");
		});		
	}
	resetSize();
	//--
	var ML_scrollIndex = 0;
	var ML_viewCount = 0;
	var ML_liRightM = 0;
	var ML_liWidth = 150;
	var ML_el = $(".mightLikeGroup");
	var ML_liEl = $(".mightLikeGroup li");
	var ML_totalItem = ML_liEl.length;
	var ML_containerEl = $(".mightLikeGroup .listContainer");
	var ML_ulEl = $(".mightLikeGroup ul");
	var ML_arrowLeftEl =  $(".mightLikeGroup .leftArrow");
	var ML_arrowRightEl =  $(".mightLikeGroup .rightArrow");
	if(ML_liEl.length > 3){
		ML_arrowRightEl.show();
		ML_arrowLeftEl.show().addClass("unable");
	}
	ML_arrowLeftEl.click(function(){
		if( ML_arrowLeftEl.hasClass("unable") ){return;}
		ML_ulEl.stop();
		ML_scrollIndex--;
		if(ML_scrollIndex <= 0){
			ML_arrowLeftEl.addClass("unable");
		}
		ML_arrowRightEl.removeClass("unable");
		ML_ulEl.animate( {"left":-ML_scrollIndex * 180} );
	});
	ML_arrowRightEl.click(function(){
		if( ML_arrowRightEl.hasClass("unable") ){return;}
		ML_ulEl.stop();
		ML_scrollIndex++;
		if(ML_scrollIndex >= ( ML_totalItem - ML_viewCount)  ){
			ML_arrowRightEl.addClass("unable");
		}
		ML_arrowLeftEl.removeClass("unable");
		ML_ulEl.animate( {"left":-ML_scrollIndex * 180 } );
	});
	function ML_updateListCountBySize(){
		var lWidth = ML_el.width();
		var mWidth = lWidth - 34;
		ML_viewCount = Math.floor( mWidth/ML_liWidth );
		var remain = mWidth % ML_liWidth;
		var spacer = remain;
		if( remain == 0){
			spacer = ML_liWidth;
			ML_viewCount--;
		}else if( remain < 8 ){
			spacer = ML_liWidth+remain;
			ML_viewCount--;
		}
		ML_liRightM = ML_viewCount ==0?0:spacer/(ML_viewCount-1);
		if( ML_liRightM > 40){
			ML_liRightM = 40;
		}
		ML_ulEl.width( PV_L_totalItem * ( ML_liWidth + ML_liRightM ) );
		ML_liEl.css("marginRight",ML_liRightM);
		var nWidth = ML_viewCount*ML_liWidth + (ML_viewCount-1)*ML_liRightM;
		var sideSpacer = (lWidth - nWidth)/2;
		ML_containerEl.css({"left":sideSpacer,"right":sideSpacer});
		if(ML_scrollIndex + ML_viewCount > ML_totalItem){
			ML_scrollIndex = ML_totalItem - ML_viewCount;
			ML_ulEl.css("left",-ML_scrollIndex * 141);
		}	
		if( ML_scrollIndex >= (ML_totalItem - ML_viewCount) ){ 
			ML_arrowRightEl.addClass("unable");
		}else if( ML_scrollIndex + ML_viewCount < ML_totalItem){
			ML_arrowRightEl.removeClass("unable");
		}	
		if(ML_scrollIndex <= 0){
			ML_arrowLeftEl.addClass("unable");
		}else{
			ML_arrowLeftEl.removeClass("unable");
		}
		if( ML_scrollIndex >= ( ML_totalItem - ML_viewCount) ){
			ML_arrowRightEl.addClass("unable");
		}else{
			ML_arrowRightEl.removeClass("unable");
		}
		ML_ulEl.css( "left",-ML_scrollIndex * (ML_liWidth+ML_liRightM));
	}
	ML_updateListCountBySize();
	//--
	var RV_scrollIndex = 0;
	var RV_liEl = $(".recentViewGroup li");
	var RV_ulEl = $(".recentViewGroup ul").width( RV_liEl.length * 170);
	var RV_arrowLeftEl =  $(".recentViewGroup .leftArrow");
	var RV_arrowRightEl =  $(".recentViewGroup .rightArrow");
	if(RV_liEl.length > 1){
		RV_arrowRightEl.show();
		RV_arrowLeftEl.show().addClass("unable");
	}
	RV_arrowLeftEl.click(function(){
		if( RV_arrowLeftEl.hasClass("unable") ){return;}
		RV_ulEl.stop();
		RV_scrollIndex--;
		if(RV_scrollIndex <= 0){
			RV_arrowLeftEl.addClass("unable");
		}
		RV_arrowRightEl.removeClass("unable");
		RV_ulEl.animate( {"left":-RV_scrollIndex * 170} );
	});
	RV_arrowRightEl.click(function(){
		if( RV_arrowRightEl.hasClass("unable") ){return;}
		RV_ulEl.stop();
		RV_scrollIndex++;
		if(RV_scrollIndex >= ( RV_liEl.length - 1)  ){
			RV_arrowRightEl.addClass("unable");
		}
		RV_arrowLeftEl.removeClass("unable");
		RV_ulEl.animate( {"left":-RV_scrollIndex * 170 } );
	});
	//--
	var nameEl = $(".mainParamBlock>h1");
	var numcheck = /\d/;
	var numInputEl = $(".quantityGroup .numStep input");
	numInputEl.keypress(function(e){
		var keynum;
		if(window.event){
		  keynum = e.keyCode;
		}else if(e.which){
		  keynum = e.which;
		}
		if(keynum==8){
			return true;
		}
		var keychar = String.fromCharCode(keynum);
		return numcheck.test(keychar);
	}).keyup(function(){
		var val = parseInt( numInputEl.val() );
		if( isNaN(val) ||  val < 1){
			numInputEl.val(1);
			return;
		}
		if( val > 999 ){
			numInputEl.val(999);
			return;
		}
	});
	var numStepBtnEls = $(".quantityGroup .numStep>a");
	numStepBtnEls.click(function(){
		var val = parseInt( numInputEl.val() );
		if( numStepBtnEls.index(this) == 1){
			val++;
		}else{
			val--;
		}
		if(val>999){val=999;}
		if(val<1){val=1;}
		numInputEl.val(val);
	});
	var addToShoppingCarBtnEl = $(".actionRow>a");
	addToShoppingCarBtnEl.click(function(){
		var index = addToShoppingCarBtnEl.index(this);
		if(index){
			alert("TO CART");
			window.shoppingCarAppend( "public_en/source/shoppingCar/001.jpg",
			nameEl.text(),
			"Size:"+ SIZE_El.eq(SIZE_index).text(),
			"Color:" +  COLOR_El.eq(COLOR_index).attr("title")  ,
			"Quantity:" + numInputEl.val(),
			"￥ 2500.00");
		}else{
			alert("WISH LIST");
		}
	});
	//--
	windEl.resize(function(){
		PV_updateViewListCountBySize();
		ML_updateListCountBySize();
	});
});
