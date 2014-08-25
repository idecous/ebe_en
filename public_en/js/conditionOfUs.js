$(function(){
	
	var subTitleEls = $(".conditionBlock>li>.subTitleRow"); 
	var subTitleIconEls = $(".conditionBlock>li>.subTitleRow>i"); 
	var subTitleTextEls = $(".conditionBlock>li>.subTitleRow>span"); 
	var openIndex = 0;
	var liHeights =[];
	var liEls = $(".conditionBlock>li");
	
	subTitleEls.click(function(){
		var index = subTitleEls.index(this);
		if( index == openIndex  ){
			if( subTitleIconEls.eq(index).hasClass("open") ){
				subTitleIconEls.eq(index).removeClass("open");
				liEls.eq(index).stop();
				subTitleTextEls.eq(index).height("auto");
				subTitleEls.eq(index).height("auto");
				liEls.eq(index).animate({"height":liHeights[index] });
			}else{
				subTitleIconEls.eq(index).addClass("open");
				liEls.eq(index).stop();
				liEls.eq(index).animate({"height":38 });
				subTitleTextEls.eq(index).animate({"height":22 });
			}
			return;
		}
		subTitleIconEls.eq(openIndex).addClass("open");
		liEls.eq(openIndex).stop();
		liEls.eq(openIndex).animate({"height":38});
		subTitleTextEls.eq(openIndex).animate({"height":22 });
		openIndex = index;
		subTitleIconEls.eq(openIndex).removeClass("open");
		liEls.eq(openIndex).stop();
		liEls.eq(openIndex).animate({"height":liHeights[openIndex] });
		subTitleTextEls.eq(index).height("auto");
		subTitleEls.eq(index).height("auto");
	});
	
	
	function windowResizeHandler(){
		$(".conditionBlock").css("visibility","hidden");
		$(".infoBlock").css("visibility","hidden");
		
		liEls.stop().remove("open").height("auto");
		subTitleTextEls.height("auto");
		subTitleEls.height("auto");
		
		liEls.each(function(index,node){
			var liEl = liEls.eq(index);
			liHeights[index] = liEl.height();
			if(openIndex != index){
				liEl.height(38);
				subTitleTextEls.eq(index).height(22);
				subTitleIconEls.eq(index).addClass("open");
			}else{
				liEl.height( liHeights[index] );
				subTitleTextEls.eq(index).height("auto");
				subTitleEls.eq(index).height("auto");
			}		
		});
		$(".conditionBlock").css("visibility","visible");
		$(".infoBlock").css("visibility","visible");
	}
	$(window).resize(windowResizeHandler);
	windowResizeHandler();
	
});
