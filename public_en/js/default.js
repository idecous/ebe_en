$(function(){
	var windowEl = $(window);
	var bodyEl = $("body");
	var phoneViewWidth = 785;
	var windowScrollWidth = 0;
	var headerEl = $("header");
	var mianNavEl = $("body>nav");
	var mainPanelEl = $("body>.mainPanel");
	var footerEl = $("footer");
	
	var phoneMenuPlaceholderEl;
	var screenHeightPlaceholderHandler = null;
	if(footerEl.length==0){
		phoneMenuPlaceholderEl = $(".phoneMenuPlaceholder");
	}else{
		phoneMenuPlaceholderEl = $("<div class='phoneMenuPlaceholder'></div>");
		footerEl.after(phoneMenuPlaceholderEl);
		var screenHeightPlaceholderEl = $("<div style='height:0;background-color:#fff;'></div>");
		footerEl.before(screenHeightPlaceholderEl);
		screenHeightPlaceholderHandler = function(){
	        var tH = windowEl.height() - (bodyEl.height()-screenHeightPlaceholderEl.height()-phoneMenuPlaceholderEl.height());
	        if(tH < 0){
	            screenHeightPlaceholderEl.height(0);
	        }else{
	            screenHeightPlaceholderEl.height(tH);
	        }
	    };
	}
	var topComboxEls = $("header .combox");
	var topComboxSelectorEls = topComboxEls.find(".popBlock");
	var windowResizeTimeID = 0;
	var norNavBlockEl = $(".topNavigation");
	var phoneViewMenuEl = $(".topNavigation>.phoneViewTopMenu");
	
	var isMobile = false;
	if(navigator.userAgent.match(/Android/i)) {
		isMobile= true;
	}
	if ((navigator.userAgent.indexOf('iPhone') != -1) || 
		(navigator.userAgent.indexOf('iPod') != -1) || 
		(navigator.userAgent.indexOf('iPad') != -1)) {
	 	isMobile= true;
	}
	var winScrollWidth = isMobile?0:20;

	$(".combox").mouseenter(function(){});
	//--
	var shoppingCarEl = $("header .shoppingCar");
	var shoppingCarPopEl = shoppingCarEl.find(".popWindow");
	var goodsItemEls = [];
	var viewIndex = 0;
	var countPhoneEl = $(".phoneShoppingcar>span"); 
	var countEL01 = $("header .shoppingCar>span:eq(1)");
	var countEL02 = $("header .shoppingCar .popWindow .lightRow>span:eq(1)");
	var countEL03 = $("header .shoppingCar .popWindow .totalRow>u");
	var goodsScrollEl = $("header .shoppingCar .scrollPanel");
	var goodsContentEl = $("header .shoppingCar .scrollPanel .contentBlock");
	var upArrowEl = $("header .shoppingCar .scrollPanel>.upArrow").show();
	var downArrowEl = $("header .shoppingCar .scrollPanel>.downArrow").show();
	var ulEl = $("header .shoppingCar .scrollPanel ul");
	var emptyEl = $("header .shoppingCar .scrollPanel .empty");
	upArrowEl.click(function(){
		goodsContentEl.stop();
		viewIndex--;
		if( viewIndex < 0){
			viewIndex = 0;
			return;
		}
		goodsContentEl.animate({"top": -viewIndex*160 },"fast" );
		updateShoppingCarArrow();
	});
	downArrowEl.click(function(){
		goodsContentEl.stop();
		viewIndex++;
		if(viewIndex == goodsItemEls.length-1){ 
			viewIndex = goodsItemEls.length -2;
			return;
		}
		goodsContentEl.animate({"top": -viewIndex*160 },"fast" );
		updateShoppingCarArrow();
	});
	function updateShoppingCarItems(){
		goodsItemEls = goodsContentEl.find("li");
		countEL01.text(  goodsItemEls.length );
		countEL02.text(  goodsItemEls.length );
		countEL03.text(  goodsItemEls.length );
		countPhoneEl.text(  goodsItemEls.length );
		if( goodsItemEls.length == 0 || goodsItemEls.length == 1){
			goodsScrollEl.height(171);
		}else{
			goodsScrollEl.height(331);
		}
		if( goodsItemEls.length == 0 ){
			emptyEl.show();
		}else{
			emptyEl.hide();
		}
	}
	function updateShoppingCarArrow(){
		if( goodsItemEls.length < 3 ){
			upArrowEl.hide();
			downArrowEl.hide();
			return;
		}
		if( viewIndex == 0 ){
			upArrowEl.hide();
		}else{
			upArrowEl.show();
		}
		if( viewIndex == goodsItemEls.length -2 ){
			downArrowEl.hide();
		}else{
			downArrowEl.show();
		}
	}
	updateShoppingCarItems();
	updateShoppingCarArrow();
	goodsContentEl.css("top",0);
	window.shoppingCarAppend = function(imgUrl,name,size,color,amount,price){
		ulEl.prepend($('<li><div class="imgContainer"><img src="'+imgUrl+'"/></div>'+
			'<div class="paramGroup">'+
				'<div class="nameRow">'+ name+'</div>'+
				'<div>'+ size+'</div>'+
				'<div>'+ color+'</div>'+
				'<div>'+ amount+'</div>'+
				'<div class="priceRow">'+ price+'</div>'+
			'</div>'+
		  '</li>') );		
		updateShoppingCarItems();
		updateShoppingCarArrow();
		shoppingCarPopEl.fadeIn("fast");
	};
	shoppingCarEl.mouseleave(function(){
		shoppingCarPopEl.fadeOut("fast");
	}).mouseenter(function(){
		shoppingCarPopEl.fadeIn("fast");
	});
	//--
	var phoneSearchBtnEl = $("header>.phoneSearch");
	var phoneShoppingBtnEl = $("header>.phoneShoppingcar");
	var topLogoEl = $("header>.logo");
	var searchBlockEl = $("header>form>.searchBlock");
	var searchInputEl = $("form:eq(0) input");
	phoneSearchBtnEl.click(function(){
		phoneSearchBtnEl.hide();
		phoneShoppingBtnEl.hide();
		topLogoEl.hide();
		searchBlockEl.show();
		isPhoneSearchStatus = true;
	});
	$("form:eq(0)").submit(function(){
		if( $.trim(searchInputEl.val()) == "" ){
			topLogoEl.css("display","");
			phoneSearchBtnEl.css("display","");
			phoneShoppingBtnEl.css("display","");
			searchBlockEl.css("display","");
			return false;
		}
	});
	//--
	var isPhoneMenuOpen = false;
	var phoneMenuEl = $(".phoneViewTopMenu");
	var phoneMenuBtnEl = $(".phoneViewTopMenu>.button");
	var topNavlistModuleEl = $(".topNavlistModule");
	var blurEl = $(".phoneViewArea>.logoBlock");
	var isIndexPage = false;
	var indexLogoBlockEl = $("body>.phoneViewArea>.logoBlock");
	var footerEl =  $("body>footer");
	var mainPanelEl = $("body>.mainPanel");
	var sub01Els = $(".topNavlistModule .popBlock");
	var sub02Els = $(".topNavlistModule .popBlock .subPopBlock");
	var navBtnEls = $(".topNavlistModule li");
	var openBtnEls = navBtnEls.find("i");
	if( footerEl.length == 0){
		isIndexPage = true;
	}	
	if( blurEl.length == 0){
		blurEl = $(".mainPanel,footer");
	}
	function phoneMenuCloseHandler(){
		topNavlistModuleEl.hide();
		phoneMenuBtnEl.removeClass("checked");
   	 	isPhoneMenuOpen = false;
   	 	screenHeightChangeByMenuHandler();
	}
	function screenHeightChangeByMenuHandler(){
		var navHeight = topNavlistModuleEl.height();
		if( topNavlistModuleEl.is(":hidden") ){
			navHeight = 0;
		}
		var tHeight,elHeight;
		if( isIndexPage ){
			elHeight = indexLogoBlockEl.height();
			tHeight = navHeight - 8 - elHeight;
		}else{
			elHeight = footerEl.outerHeight() + mainPanelEl.height();
			tHeight =  ( 8 + navHeight) - (120+ elHeight);
		}
		if(tHeight < 0 ){tHeight = 0;}
	    phoneMenuPlaceholderEl.height(tHeight);
	}
	phoneMenuBtnEl.click(function(){
		if( windowEl.width < phoneViewWidth - winScrollWidth){ return;}
		if(isPhoneMenuOpen){
			sub01Els.hide();
			sub02Els.hide();
			openBtnEls.removeClass("opened");
			phoneMenuCloseHandler();
		}else{
			topNavlistModuleEl.show();
			isPhoneMenuOpen = true;
			phoneMenuBtnEl.addClass("checked");
			screenHeightChangeByMenuHandler();		
		}
	});
	phoneViewMenuEl.mouseleave(function(){
		if(isPhoneMenuOpen){
			sub01Els.hide();
			sub02Els.hide();
			openBtnEls.removeClass("opened");
			phoneMenuCloseHandler();
		}	
	});
	openBtnEls.click(function(){
		var iEl = openBtnEls.eq( openBtnEls.index(this) );
		var liEl = iEl.parent().parent();
		var popBlockEl = liEl.children(".popBlock");
		var subPopBlockEl = liEl.children(".subPopBlock");
		if( iEl.hasClass("opened") ){
			if(popBlockEl.length>0){
				sub01Els.hide();
				sub02Els.hide();
				openBtnEls.removeClass("opened");
			}else{
				sub02Els.hide();
				iEl.removeClass("opened");
			}
			screenHeightChangeByMenuHandler();
			return;
		}
		if(popBlockEl.length>0){
			sub01Els.hide();
			sub02Els.hide();
			openBtnEls.removeClass("opened");
			popBlockEl.show();
		}else{
			sub02Els.hide();
			subPopBlockEl.show();
		}
		iEl.addClass("opened");
		screenHeightChangeByMenuHandler();
	});	
	//--
	var TS_El = $(".topSwitchViewBlock"); 
	var TS_navBlock = TS_El.find(".topSwitchNavBlock");
	var TS_placeholderEL = TS_El.find(".placeholderBG");
	var TS_index = 0;
	var TS_liWidth = 0;
	var TS_liCount = 0;
	var TS_timer = 0;
	if( TS_El.length > 0 ){
		var TS_borderEl = TS_El.find(".switchContainer");
		var TS_ulEl = TS_El.find("ul");
		var TS_liEl = TS_ulEl.children("li");
		TS_liCount = TS_liEl.length;
		if( TS_liCount < 2 ){return;}
		var fLiEl = TS_liEl.eq(0);
		var lLiEl = TS_liEl.eq( TS_liCount-1 );
		fLiEl.before( lLiEl.clone() );
		lLiEl.after( fLiEl.clone() );
		TS_liEl = TS_ulEl.children("li");
		var str = "";
		for( i=0; i < TS_liCount;i++){
			str += "<a href='javascript:;'></a>";
		}
		TS_navBlock.append( $(str) );
		var TS_navLiEls = TS_navBlock.find("a");
		TS_navLiEls.click( TS_navLiClickHandler );
	}
	function TS_updateSize(){
		if( TS_El.length == 0 ){return;}
		clearTimeout(TS_timer);
		TS_ulEl.stop();
		TS_liWidth = TS_placeholderEL.width();
		TS_liEl.width( TS_liWidth );
		TS_ulEl.width( TS_liWidth *  (TS_liCount +2 ) );
		TS_setPosByIndex(TS_index);
		TS_animaPosByAuto();
	}
	function TS_setPosByIndex(value){
		TS_index = value;
		TS_ulEl.css("left", -(1+ TS_index%TS_liCount) * TS_liWidth );
		TS_navLiEls.removeClass("selected");
		TS_navLiEls.eq( value ).addClass("selected");
	}
	function TS_navLiClickHandler(){
		var index = TS_navLiEls.index(this);
		if( index == TS_index ){return;}
		TS_animaPosByIndex( TS_index,index );
	}
	function TS_animaPosByIndex(startIndex,endIndex){
		clearTimeout(TS_timer);
		TS_ulEl.stop();
		TS_index = endIndex;
		TS_navLiEls.removeClass("selected");
		TS_navLiEls.eq( TS_index ).addClass("selected");
		var curX = parseInt( TS_ulEl.css("left") );
		TS_ulEl.animate({"left":  curX - (endIndex-startIndex)* TS_liWidth },500* Math.abs(endIndex-startIndex),function(){
			TS_ulEl.css("left", -(1 + TS_index%TS_liCount) * TS_liWidth );
			TS_animaPosByAuto();
		});
	}
	function TS_animaPosByAuto(){
		clearTimeout(TS_timer);
		TS_ulEl.stop();
		TS_timer = setTimeout(function(){
			TS_index = (TS_index+1) % TS_liCount;
			TS_navLiEls.removeClass("selected");
			TS_navLiEls.eq( TS_index ).addClass("selected");
			
			var curX = parseInt( TS_ulEl.css("left") );
			TS_ulEl.animate({"left":  curX - TS_liWidth },500,function(){
				TS_ulEl.css("left", -(1 + TS_index%TS_liCount) * TS_liWidth );
				TS_animaPosByAuto();
			});
		},5000);
	}
	//--
	function windowResizeHandler(){
		if( windowEl.width() < phoneViewWidth - winScrollWidth){
			if(topNavlistModuleEl.parent()[0] == norNavBlockEl[0]){
				phoneViewMenuEl.append(topNavlistModuleEl);
			}
		}else{	
			if( topLogoEl.is(":hidden") ){
				topLogoEl.css("display","");
				phoneSearchBtnEl.css("display","");
				phoneShoppingBtnEl.css("display","");
				searchBlockEl.css("display","");
			}
			sub01Els.css("display","");
			sub02Els.css("display","");
			if(topNavlistModuleEl.parent()[0] != norNavBlockEl[0]){
				norNavBlockEl.append( topNavlistModuleEl );
			}
		}
		if( screenHeightPlaceholderHandler){
			screenHeightPlaceholderHandler();
		}
		TS_updateSize();
	}
	windowEl.resize(function(){
    	clearTimeout(windowResizeTimeID);
    	windowResizeTimeID = setTimeout( windowResizeHandler,100);
    });
    windowResizeHandler();
    
    //--
    //添加购物车
	//shoppingCarAppend( "public_en/source/shoppingCar/001.jpg","name01","size01","Color01","amount01","￥ 2500.00");
});
