$(function(){
	var windowEl = $(window);
	var bodyEl = $("body");
	var phoneViewWidth = 1000;
	var isMobile = false;
	if(navigator.userAgent.match(/Android/i)) {
		isMobile= true;
	}
	if ((navigator.userAgent.indexOf('iPhone') != -1) || 
		(navigator.userAgent.indexOf('iPod') != -1) || 
		(navigator.userAgent.indexOf('iPad') != -1)) {
	 	isMobile= true;
	}
	if(isMobile){ phoneViewWidth += 20;}
	
	var SV_ImgsEl = $(".multipleViewBlock img");
	var SV_overImage;
	var SV_containEl = $(".multipleViewBlock .contentBlock");
	var SV_containWidth = 0;
	var SV_count = 0;
	var SV_isInit = false;
	var SV_contentWidth = 0;
	var SV_pitch = 0;
	var SV_state = "";
	var SV_index = 0;
	var SV_timer = -1;
	var SV_minWidth = 40;
	var SV_liEl,SV_liCount,SV_ulEl,SV_navBlock,SV_navLiEls;

	SV_ImgsEl.each(function(index,node){
		if( node.complete ){
			SV_count++;
		}
	});
	if( SV_count != SV_ImgsEl.length ){
		SV_ImgsEl.load(function(){
			SV_count++;
			if( SV_count == SV_ImgsEl.length ){SV_init();}
		});
	}else{
		SV_init();
	}
	function SV_init(){
		SV_isInit = true;
		SV_overBlockEl = SV_containEl.children("a");
		SV_overImage = SV_overBlockEl.children("img");
		SV_ulEl = $("<ul></ul>").appendTo(SV_containEl);
		SV_navBlock = $("<div class='topSwitchNavBlock'></div>").appendTo(SV_containEl);
		
		SV_ulEl.append( $("<li><a href='"+ SV_overBlockEl.eq(SV_overBlockEl.length-1).attr("href") +
		"'><img src='"+  SV_overImage.eq(SV_overImage.length-1).attr("src") +"'></a></li>") );
		SV_overBlockEl.each(function(index){
			SV_ulEl.append( $("<li><a href='"+ SV_overBlockEl.eq(index).attr("href") +
			"'><img src='"+  SV_overImage.eq(index).attr("src") +"'></a></li>") );
			SV_navBlock.append( $("<a href='javascript:;'></a>") );
		});	
		SV_ulEl.append( $("<li><a href='"+ SV_overBlockEl.eq(0).attr("href") +
		"'><img src='"+  SV_overImage.eq(0).attr("src") +"'></a></li>") );
		SV_liEl = SV_ulEl.find("li");
		SV_liCount = SV_overBlockEl.length; 
		SV_navLiEls = SV_navBlock.find("a");
		SV_overBlockEl.show();
		SV_updateSize();
		SV_animaPosByAuto();
		SV_navLiEls.click(SV_navLiClickHandler);
		SV_overBlockEl.mouseenter(function(){
			var oIndex  = SV_overBlockEl.index(this);
			SV_overBlockEl.stop().each(function(index){
				var imgEl = SV_overBlockEl.eq(index);
				if(  index < oIndex){
					imgEl.animate({"left":index*SV_minWidth});
				}else if( index > oIndex){
					imgEl.animate({"left":SV_containWidth - (SV_liCount-index)*SV_minWidth  });
				}else{
					imgEl.animate({"left": index*SV_minWidth });
				}
			});
		});
		SV_containEl.mouseleave(function(){
			SV_overBlockEl.stop().each(function(index){
				SV_overBlockEl.eq(index).animate({"left":index*SV_pitch});
			});
		});
	}
	function SV_updateSize(){
		if( !SV_isInit || SV_overBlockEl.length==0 ){return;}
		var wWidth = windowEl.width();
		SV_containWidth = SV_containEl.width();
		SV_pitch = SV_containWidth/SV_overBlockEl.length;
		if( wWidth > phoneViewWidth &&  SV_state != "A"){
			SV_state = "A";
		}
		if( wWidth <= phoneViewWidth && SV_state != "B" ){
			SV_state = "B";
		}
		SV_overBlockEl.width( SV_containWidth );
		SV_liEl.width( SV_containWidth );
		SV_ulEl.width( SV_liEl.length *  SV_containWidth);
		for(var i=0; i < SV_overBlockEl.length;i++){
			SV_overBlockEl.eq(i).css("left",i*SV_pitch);
		}
		SV_setPosByIndex(SV_index);
	}
	function SV_setPosByIndex(value){
		SV_index = value;
		SV_ulEl.css("left", -(1+ SV_index%SV_liCount) * SV_containWidth );
		SV_navLiEls.removeClass("selected");
		SV_navLiEls.eq( value ).addClass("selected");
	}
	function SV_navLiClickHandler(){
		var index = SV_navLiEls.index(this);
		if( index == SV_index ){return;}
		SV_animaPosByIndex( SV_index,index );
	}
	function SV_animaPosByIndex(startIndex,endIndex){
		clearTimeout(SV_timer);
		SV_ulEl.stop();
		SV_index = endIndex;
		SV_navLiEls.removeClass("selected");
		SV_navLiEls.eq( SV_index ).addClass("selected");
		var curX = parseInt( SV_ulEl.css("left") );
		SV_ulEl.animate({"left":  curX - (endIndex-startIndex)* SV_containWidth },500* Math.abs(endIndex-startIndex),function(){
			SV_ulEl.css("left", -(1 + SV_index%SV_liCount) * SV_containWidth );
			SV_animaPosByAuto();
		});
	}
	function SV_animaPosByAuto(){
		clearTimeout(SV_timer);
		SV_ulEl.stop();
		SV_timer = setTimeout(function(){
			SV_index = (SV_index+1) % SV_liCount;
			SV_navLiEls.removeClass("selected");
			SV_navLiEls.eq( SV_index ).addClass("selected");
			
			var curX = parseInt( SV_ulEl.css("left") );
			SV_ulEl.animate({"left":  curX - SV_containWidth },500,function(){
				SV_ulEl.css("left", -(1 + SV_index%SV_liCount) * SV_containWidth );
				SV_animaPosByAuto();
			});
		},5000);
	}
	windowEl.resize(function(){
		SV_updateSize();
	});
	//---
	var tabBtnEls = $(".tabBtnPanel>a");
	var tabIndex = 0;
	var tabContentEls = $(".centerBlock>.contentBlock>div");
	
	tabBtnEls.click(function(){
		var index = tabBtnEls.index(this);
		if(tabIndex == index){return;}
		tabBtnEls.removeClass("checked");
		tabContentEls.hide();
		tabIndex = index;
		tabBtnEls.eq(tabIndex).addClass("checked");
		tabContentEls.eq(tabIndex).show();
	});
});




























