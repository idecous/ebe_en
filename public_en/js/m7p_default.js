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
	phoneMenuPlaceholderEl = $("<div class='phoneMenuPlaceholder'></div>");
	footerEl.after(phoneMenuPlaceholderEl);
	var screenHeightPlaceholderEl = $("<div style='height:0;background-color:#fff;'></div>");
	footerEl.before(screenHeightPlaceholderEl);
	function screenHeightPlaceholderHandler(){
        var tH = windowEl.height() - (bodyEl.height()-screenHeightPlaceholderEl.height()-phoneMenuPlaceholderEl.height());
        if(tH < 0){
            screenHeightPlaceholderEl.height(0);
        }else{
            screenHeightPlaceholderEl.height(tH);
        }
	};
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
	shoppingCarEl.mouseleave(function(){
		shoppingCarPopEl.fadeOut("fast");
	}).mouseenter(function(){
		shoppingCarPopEl.fadeIn("fast");
	});
	//---
	var topLogoEl = $("header>.logo");
	var searchInputEl = $("form:eq(0) input");
	$("form:eq(0)").submit(function(){
		if( $.trim(searchInputEl.val()) == "" ){
			return false;
		}
	});
	//--
	function screenHeightChangeByMenuHandler(){
	    var elHeight = footerEl.outerHeight() + mainPanelEl.height();
		var	tHeight = 8  - (140+ elHeight);
		if(tHeight < 0 ){tHeight = 0;}
	    phoneMenuPlaceholderEl.height(tHeight);
	}
	var phoneMenuComboxEl = $(".menuCombox");
	var phoneMenuComboxListEl = phoneMenuComboxEl.find("ul");
	phoneMenuComboxEl.mouseenter(function(){
		phoneMenuComboxListEl.show();
		screenHeightChangeByMenuHandler();
	}).mouseleave(function(){
		phoneMenuComboxListEl.hide();
		screenHeightChangeByMenuHandler();
	});
	//--
	var AD_El = $(".com_accordion");
	var AD_subTitleEls = $(".com_accordion>li>.subTitleRow"); 
	var AD_subTitleIconEls = $(".com_accordion>li>.subTitleRow>i"); 
	var AD_subTitleTextEls = $(".com_accordion>li>.subTitleRow>span"); 
	var AD_openIndex = 0;
	var AD_liHeights =[];
	var AD_liEls = $(".com_accordion>li");
	
	AD_subTitleEls.click(function(){
		var index = AD_subTitleEls.index(this);
		if( index == AD_openIndex  ){
			if( AD_subTitleIconEls.eq(index).hasClass("open") ){
				AD_subTitleIconEls.eq(index).removeClass("open");
				AD_liEls.eq(index).stop();
				AD_subTitleTextEls.eq(index).height("auto");
				AD_subTitleEls.eq(index).height("auto");
				AD_liEls.eq(index).animate({"height":AD_liHeights[index] });
			}else{
				AD_subTitleIconEls.eq(index).addClass("open");
				AD_liEls.eq(index).stop();
				AD_liEls.eq(index).animate({"height":38 });
				AD_subTitleTextEls.eq(index).animate({"height":22 });
			}
			return;
		}
		AD_subTitleIconEls.eq(AD_openIndex).addClass("open");
		AD_liEls.eq(AD_openIndex).stop();
		AD_liEls.eq(AD_openIndex).animate({"height":38});
		AD_subTitleTextEls.eq(AD_openIndex).animate({"height":22 });
		AD_openIndex = index;
		AD_subTitleIconEls.eq(AD_openIndex).removeClass("open");
		AD_liEls.eq(AD_openIndex).stop();
		AD_liEls.eq(AD_openIndex).animate({"height":AD_liHeights[AD_openIndex] });
		AD_subTitleTextEls.eq(index).height("auto");
		AD_subTitleEls.eq(index).height("auto");
	});
	function AD_windowResizeHandler(){
		AD_El.css("visibility","hidden");	
		AD_liEls.stop().remove("open").height("auto");
		AD_subTitleTextEls.height("auto");
		AD_subTitleEls.height("auto");
		
		AD_liEls.each(function(index,node){
			var liEl = AD_liEls.eq(index);
			AD_liHeights[index] = liEl.height();
			if(AD_openIndex != index){
				liEl.height(38);
				AD_subTitleTextEls.eq(index).height(22);
				AD_subTitleIconEls.eq(index).addClass("open");
			}else{
				liEl.height( AD_liHeights[index] );
				AD_subTitleTextEls.eq(index).height("auto");
				AD_subTitleEls.eq(index).height("auto");
			}		
		});
		AD_El.css("visibility","visible");
	}
	
	//--
	function windowResizeHandler(){
		AD_windowResizeHandler();
		screenHeightPlaceholderHandler();
	}
	windowEl.resize(function(){
    	clearTimeout(windowResizeTimeID);
    	windowResizeTimeID = setTimeout( windowResizeHandler,100);
    });
    windowResizeHandler();
	
	
});
