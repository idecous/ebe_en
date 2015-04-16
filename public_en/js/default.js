if(!Object.create){
    Object.create = function(o){
        function F(){}
        F.prototype = o;
        return new F();
    };
}
var EVE_DataPickerSelectorBase = function(ownerEl,rowEl,type){
	this.ownerEl = ownerEl;
	this.rowEl = rowEl;
	this.type = type;
	this.value = null;
	this.isBlockOpen = false;
};
(function(){
	this.extraBuild = function(){};
	this.build = function(){
		this.el = $("<div class='areaBlock "+ this.type +"'></div>").appendTo(this.rowEl);
		this.borderEl = $("<div class='border'></div>").appendTo(this.el);
		this.leftArrowEl = $("<a href='javascript:;' class='arrow leftArrow'><i></i></a>").appendTo(this.borderEl);
		this.rightArrowEl = $("<a href='javascript:;' class='arrow rightArrow'><i></i></a>").appendTo(this.borderEl);
		this.popBtnEl = $("<a href='javascript:;' class='arrow downArrow'><i></i></a>").appendTo(this.borderEl);
		var inputBorder = $("<div class='inputBorder'></div>").appendTo(this.borderEl); 
		this.inputEl = $("<input type='text' readonly='readonly' value=''/>").appendTo(inputBorder);
		this.extraBuild();
	};
}).call(EVE_DataPickerSelectorBase.prototype);

var EVE_DataPickerYearSelector = function(ownerEl,rowEl){
	EVE_DataPickerSelectorBase.call(this,ownerEl,rowEl,"year");
	this.init();
};
EVE_DataPickerYearSelector.prototype = Object.create(EVE_DataPickerSelectorBase.prototype);
(function(){
	this.init = function(){
		this.build();
		var that = this;
		this.leftArrowEl.click(function(){
			that.setPreYearHandler( that.value );
		});
		this.rightArrowEl.click(function(){
			that.setNextYearHandler( that.value );
		});
		this.popBtnEl.click( $.proxy(this.openHandler,this) );
		this.inputEl.click( $.proxy(this.openHandler,this) );
		this.el.mouseleave($.proxy(this.closeHandler,this) );
		this.yearUnitEls.click(function(){
			var unitEl = that.yearUnitEls.eq( that.yearUnitEls.index(this) );
			if( unitEl.text() == that.inputEl.val() ){return;}
			that.closeHandler();
			that.setYearHandler( parseInt(unitEl.text()) );
		});
		
		this.yearUpArrowEl.click(function(){
			var firstVal = parseInt( that.yearUnitEls.eq(0).text() );
			firstVal = firstVal-12;
			for(var i=0; i < 12 ;i++){
				that.yearUnitEls.eq(i).text( firstVal+i );
			}
		});
		this.yearDownArrowEl.click(function(){
			var lastVal = parseInt( that.yearUnitEls.eq( that.yearUnitEls.length-1 ).text() );
			var firstVal = lastVal+1;
			for(var i=0; i < 12 ;i++){
				that.yearUnitEls.eq(i).text( firstVal+i );
			}
		});
	};
	this.openHandler = function(){
		if( this.isBlockOpen ){return;}
		this.isBlockOpen = true;
		this.yearSelectorEl.show();
		
	};
	this.closeHandler = function(){
		if( this.isBlockOpen ){
			this.isBlockOpen = false;
			this.yearSelectorEl.hide();
		}
	};
	this.setData = function(val){
		this.value = val;
		this.inputEl.val( val );
		var i,pos=0,isOdd = val%2==1?0:1;
		for(i=0; i < 5+isOdd ;i++){
			this.yearUnitEls.eq(pos).text( val - 5 +i   );
			pos++;
		}
		var curPos = pos-1;
		for( i=pos;i < 12;i++){
			this.yearUnitEls.eq(pos).text(  val + i - curPos  );
			pos++;
		}
	};
	this.extraBuild = function(){
		this.yearSelectorEl = $("<div class='selectorBlock'></div>").appendTo(this.borderEl); 
		this.yearUpArrowEl = $("<a class='upArrow' href='javascript:;'><i></i></a>").appendTo(this.yearSelectorEl);
		var contentEl = $("<div></div>").appendTo(this.yearSelectorEl);
		this.yearDownArrowEl = $("<a class='downArrow' href='javascript:;'><i></i></a>").appendTo(this.yearSelectorEl);		
		for(var i=0;i<12;i++){
			$("<a class='unit' href='javascript:;'></a>").appendTo(contentEl);
		}
		this.yearUnitEls = contentEl.find(".unit");
	};
	
}).call(EVE_DataPickerYearSelector.prototype);
var EVE_DataPickerMonthSelector = function(ownerEl,rowEl,monthNames){
	EVE_DataPickerSelectorBase.call(this,ownerEl,rowEl,"month");
	this.monthNames = monthNames;
	this.init();
};
EVE_DataPickerMonthSelector.prototype = Object.create(EVE_DataPickerSelectorBase.prototype);
(function(){
	this.init = function(){
		this.build();
		var that = this;
		this.leftArrowEl.click(function(){
			that.setPreMonthHandler( that.value );
		});
		this.rightArrowEl.click(function(){
			that.setNextMonthHandler( that.value );
		});
		
		this.popBtnEl.click( $.proxy(this.openHandler,this) );
		this.inputEl.click( $.proxy(this.openHandler,this) );
		this.el.mouseleave($.proxy(this.closeHandler,this) );
		this.monthUnitEls.click(function(){
			that.closeHandler();
			that.setMonthHandler( that.monthUnitEls.index(this) );
		});
		
	};
	this.openHandler = function(){
		if( this.isBlockOpen ){return;}
		this.isBlockOpen = true;
		this.monthSelectorEl.show();
		
	};
	this.closeHandler = function(){
		if( this.isBlockOpen ){
			this.isBlockOpen = false;
			this.monthSelectorEl.hide();
		}
	};
	this.setData = function(val){
		this.value = val;
		this.inputEl.val( val+1 );
	};
	this.extraBuild = function(){
		this.monthSelectorEl = $("<div class='selectorBlock'></div>").appendTo(this.borderEl); 
		var contentEl = $("<div></div>").appendTo(this.monthSelectorEl);
		for(var i=0;i<12;i++){
			$("<a class='unit' href='javascript:;'>"+this.monthNames[i]+"</a>").appendTo(contentEl);
		}
		this.monthUnitEls = contentEl.find(".unit");
		
	};
}).call(EVE_DataPickerMonthSelector.prototype);

var EVE_DataPickerDateSelectorCell = function(container,index){
	this.container = container;
	this.index = index;
	this.date = null;
	this.isMain = false;
	this.isNow = false;
	this.init();
};
(function(){
	this.init = function(){
		this.build();
	};
	this.setData = function(val,isMain){
		this.date = val;
		this.el.text( val.getDate() );
		this.isMain = isMain;
		if( isMain ){
			this.el.addClass("main");
		}else{
			this.el.removeClass("main");
		}
		this.setNow(false);
	};
	this.setNow = function(val){
		this.isNow = val;
		if( val ){
			this.el.addClass("now");
		}else{
			this.el.removeClass("now");
		}
	};
	this.build = function(){
		this.el = $("<a class='cell' href='javascript:;'></a>").appendTo(this.container);
	};	
}).call(EVE_DataPickerDateSelectorCell.prototype);


var EVE_DataPickerDateSelector = function(ownerEl,weekNames){
	this.ownerEl = ownerEl;
	this.weekNames = weekNames;
	this.init();
};
(function(){
	this.init = function(){
		this.build();		
		var that = this;
		this.cellEls.click(function(){
			var tIndex  = that.cellEls.index(this);
			that.setDateHandler(that.dateEls[tIndex].date );
		});
	};
	this.setCurrentDate = function(val){
		this.curYear = val.getFullYear();
		this.curMonth = val.getMonth();
		this.curDate = val.getDate();
	};
	this.setData = function(val){
		this.value = new Date(val.getFullYear(),val.getMonth(),val.getDate() );
		this.firstDate = new Date(val.getFullYear(),val.getMonth(),1 );
		this.lastDate = new Date(val.getFullYear(),val.getMonth()+1,0 );
		this.preMonthLastDate = new Date(val.getFullYear(),val.getMonth(),0 );
		var nextYear = val.getFullYear(); 
		var nextMonth = val.getMonth(); 
		if(nextMonth==11){
			nextYear++;
			nextMonth = 0;
		}else{
			nextMonth++;
		}
		this.nextMonthFirstDate = new Date(nextYear,nextMonth,1 );
		this.update();
	};	
	this.update = function(){
		var preLastday = this.preMonthLastDate.getDay();
		var preLastDate = this.preMonthLastDate.getDate();
		var preLastYear = this.preMonthLastDate.getFullYear();
		var preLastMonth = this.preMonthLastDate.getMonth();
		
		var curYear = this.value.getFullYear();
		var curMonth = this.value.getMonth();
		var curLastDate = this.lastDate.getDate();
		
		var i,cell,date,pos = 0,firstIndex;
		for(i=0; i <= preLastday;i++){
			date = new Date( preLastYear,preLastMonth, preLastDate - preLastday + i );
			this.dateEls[pos].setData( date ,false);
			pos++;
		}
		firstIndex = pos;
		for(i=0; i < curLastDate;i++){
			date = new Date( curYear,curMonth, i+1 );
			this.dateEls[pos].setData( date ,true);
			pos++;
		}
		var nextDay = this.nextMonthFirstDate.getDay();
		var nextYear = this.nextMonthFirstDate.getFullYear();
		var nextMonth = this.nextMonthFirstDate.getMonth();
		
		for( i=nextDay; i < 7;i++){
			date = new Date( nextYear,nextMonth,  i + 1 - nextDay);
			this.dateEls[pos].setData( date ,false);
			pos++;
		}
		if( curYear==this.curYear && curMonth==this.curMonth ){
			this.dateEls[ firstIndex+ this.curDate -1].setNow(true);
		}	
	};

	this.build = function(){
		this.el = $("<div class='weekDateBlock'></div>").appendTo(this.ownerEl);
		var weekRowEl = $("<ul class='weekRow'></ul>").appendTo(this.el);
		var i,k,rowEl,cellEl,arr;
		for( i=0; i<this.weekNames.length;i++ ){
			$("<li>"+this.weekNames[i]+"</li>").appendTo(weekRowEl);
		}
		this.dateRowEls = [];
		this.dateEls = [];
		for(i=0;i<6;i++){
			rowEl = $("<div class='dateRow'></div>").appendTo(this.el);
			this.dateRowEls.push( rowEl );
			for(k=0;k<7;k++){
				cellEl = new EVE_DataPickerDateSelectorCell(rowEl,this.dateEls.length);
				this.dateEls.push(cellEl);
			}
		}
		this.cellEls = this.el.find(".cell");
	};
}).call(EVE_DataPickerDateSelector.prototype);

var EVE_DataPicker = function(el,monthNames,weekNames,todayText){
	var currentDate = new Date();
	var isOpen = false;
	var inputEl = $("<input name='aaa' type='text' class='dateInput' readonly='readonly'/>").appendTo(el);
	var infoEl = $("<span class='info'>YYYY/MM/DD</span>").appendTo(el);
	var popBtnEl = $("<a href='javascript:;' class='popBtn'></a>").appendTo(el);
	var popBlockEl = $("<div class='popBlock'></div>").appendTo(el);
	var ymRowEl = $("<div class='YM_Row'></div>").appendTo(popBlockEl);	
	var yearSelector = new EVE_DataPickerYearSelector(popBlockEl,ymRowEl);
	var monthSelector = new EVE_DataPickerMonthSelector(popBlockEl,ymRowEl,monthNames);
	var dataPickerDateSelector = new EVE_DataPickerDateSelector(popBlockEl,weekNames);
	var bottomBlockEl = $("<div class='bottomBlock'></div>").appendTo(popBlockEl);
	var todayBtnEl = $("<a href='javascript:;'>"+todayText+"</a>").appendTo(bottomBlockEl);
		
	yearSelector.setPreYearHandler = function(yearVal){
		setDate( new Date(yearVal-1,monthSelector.value,1) );
	};
	yearSelector.setNextYearHandler = function(yearVal){
		setDate( new Date(yearVal+1,monthSelector.value,1) );
	};
	yearSelector.setYearHandler = function(yearVal){
		setDate( new Date(yearVal,monthSelector.value,1) );
	};
	monthSelector.setPreMonthHandler = function(monthVal){
		if( monthVal == 0 ){
			setDate( new Date(yearSelector.value-1,11,1) );
		}else{
			setDate( new Date(yearSelector.value,monthVal-1,1) );
		}
	};
	monthSelector.setNextMonthHandler = function(monthVal){
		if( monthVal == 11 ){
			setDate( new Date(yearSelector.value+1,0,1) );
		}else{
			setDate( new Date(yearSelector.value,monthVal+1,1) );
		}
	};
	monthSelector.setMonthHandler = function(monthVal){
		setDate( new Date(yearSelector.value,monthVal,1) );
	};
	dataPickerDateSelector.setDateHandler = function(dateVal){
		currentDate = dateVal;
		dataPickerDateSelector.setCurrentDate(dateVal);
		setDate( dateVal );
		
		infoEl.hide();
		inputEl.val( formatDate(dateVal) );
		closePopHandler();
	};
	todayBtnEl.click(function(){
		currentDate = new Date();
		dataPickerDateSelector.setCurrentDate(currentDate);
		setDate( currentDate );
		infoEl.hide();
		inputEl.val( formatDate(currentDate) );
		closePopHandler();
	});
	el.mousedown(function(){
		if( isOpen ){return;}
		isOpen = true;
		popBlockEl.show();
		return false;
	}).mouseleave(closePopHandler);

	function closePopHandler(){
		if( !isOpen ){return;}
		isOpen = false;
		popBlockEl.hide();
	}
	function formatDate(val){
		return val.getFullYear()+"/"+(val.getMonth()+1)+"/"+val.getDate();
	}
	function setDate(val){
		yearSelector.setData( val.getFullYear() );
		monthSelector.setData( val.getMonth() );
		dataPickerDateSelector.setData( val );
	}
	dataPickerDateSelector.setCurrentDate(currentDate);
	setDate( currentDate );
};

var AppointmentModule = function( type ){
	var openBtn = $(".comm_appointmentBar .normal ."+type);
	if(openBtn.length==0){return;}
	var windEl = $(window);
	var bodyEl = $("body");
	var eMailReg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	var isPop = false;

	var popWinEl = $(".comm_appointmentPopWindow");
	var blockEls = popWinEl.find(".block");
	var blockEl = popWinEl.find(".block."+type);
	if(type=="en"){
		new EVE_DataPicker(
			blockEl.find(".com_dateSelector"),
			["January","February","March","April","May","June",
			"July","August","September","October","November","December"],
			["Mon","Tue","Wed","Thur","Fri","Sat","Sun"],
			"Today"
		);
	}else{
		new EVE_DataPicker(
			blockEl.find(".com_dateSelector"),
			["一月","二月","三月","四月","五月","六月",
			"七月","八月","九月","十月","十一月","十二月"],
			["一","二","三","四","五","六","七"],
			"今日"
		);
	}

	var closeBtnEl = blockEl.find(".closeBtn,.topBar>a");
	var formEl = blockEl.find("form");
	var borderEl = formEl.find(">div>div>.inputBorder");
	var inputEls = borderEl.find(">input,>select");
	
	openBtn.click(function(){
		isPop = true;
		blockEl.show();
		popWinEl.show();
		updateView();
	});
	closeBtnEl.click(function(){
		popWinEl.hide();
		blockEls.hide();
	});
	function updateView(){
		if( !isPop ){return;}
		blockEl.css({"left": (windEl.width()-blockEl.width())/2,
		"top":(windEl.height()-blockEl.height())/2});
	};
	//windEl.resize(updateView);
	formEl.submit(function(){
		var result = true;
		for(var i=0; i < 7;i++){
			if( $.trim( inputEls.eq(i).val() ) == "" ){
				result = false;
				borderEl.eq(i).addClass("warn");
			}else{
				borderEl.eq(i).removeClass("warn");
			}
		}
		if( eMailReg.test(  $.trim( inputEls.eq(7).val()) ) ){
			borderEl.eq(i).removeClass("warn");
		}else{
			result = false;
			borderEl.eq(i).addClass("warn");
		}
		return result;
	});
	
};

var Appointment = function(){
	new AppointmentModule("cn");
	new AppointmentModule("en");
};

var ToApp = function(){
	var openBtnEl = $(".comm_appBlock a");
	if( openBtnEl.length == 0){return;}
	var windEl = $(window);
	var bodyEl = $("body");
	var isPop = false;
	var popWinEl = $(".comm_appPopWindow");
	var blockEl = popWinEl.find(".panel");
	var closeBtnEl = popWinEl.find(".closeBtn");
	
	openBtnEl.click(function(){
		isPop = true;
		blockEl.show();
		popWinEl.show();
		updateView();
	});
	function updateView(){
		if( !isPop ){return;}
		blockEl.css({"left": (windEl.width()-blockEl.width())/2,
		"top":(windEl.height()-blockEl.height())/2});
	};
	closeBtnEl.click(function(){
		popWinEl.hide();
		blockEl.hide();
	});
	//windEl.resize(updateView);
};


$(function(){
	new Appointment();
	new ToApp();
	
	var windowEl = $(window);
	var bodyEl = $("body");
	var phoneViewWidth = 785;
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
		var screenHeightPlaceholderEl = $("<div class='footerBeforeHolder'></div>");
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
	var TS_PHBGEl = TS_El.find(".placeholderBG");
	var TS_navBlock = TS_El.find(".topSwitchNavBlock");
	var TS_placeholderEL = TS_El.find(".placeholderBG");
	var TS_index = 0;
	var TS_liWidth = 0;
	var TS_liCount = 0;
	var TS_timer = 0;
	var TS_isInit = false;
	if( TS_El.length > 0 ){
		var TS_borderEl = TS_El.find(".switchContainer");
		var TS_ulEl = TS_El.find("ul");
		var TS_liEl = TS_ulEl.children("li");
		TS_liCount = TS_liEl.length;
		if( TS_liCount > 1){
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
	}
	function TS_updateSize(){
		if( !TS_isInit || TS_El.length == 0 ){return;}
		clearTimeout(TS_timer);
		TS_ulEl.stop();
		TS_liWidth = TS_placeholderEL.width();
		TS_liEl.width( TS_liWidth );
		TS_ulEl.width( TS_liWidth *  (TS_liCount +2 ) );
		if( TS_liCount < 2){return;}
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

	if( TS_placeholderEL.prop("complete") ){
		TS_isInit = true;
		TS_updateSize();
	}else{
		TS_placeholderEL.load(function(){
			TS_isInit = true;
			TS_updateSize();
		});
	}
	
	//--
	//function windowResizeHandler(){
	//	if( windowEl.width() < phoneViewWidth - winScrollWidth){
	//		if(topNavlistModuleEl.parent()[0] == norNavBlockEl[0]){
	//			phoneViewMenuEl.append(topNavlistModuleEl);
	//		}
	//	}else{
	//		if( topLogoEl.is(":hidden") ){
	//			topLogoEl.css("display","");
	//			phoneSearchBtnEl.css("display","");
	//			phoneShoppingBtnEl.css("display","");
	//			searchBlockEl.css("display","");
	//		}
	//		sub01Els.css("display","");
	//		sub02Els.css("display","");
	//		if(topNavlistModuleEl.parent()[0] != norNavBlockEl[0]){
	//			norNavBlockEl.append( topNavlistModuleEl );
	//		}
	//	}
	//
	//	if( screenHeightPlaceholderHandler){
	//		screenHeightPlaceholderHandler();
	//	}
	//	TS_updateSize();
	//}
	//windowEl.resize(function(){
    	//clearTimeout(windowResizeTimeID);
    	//windowResizeTimeID = setTimeout( windowResizeHandler,100);
    //});
    //windowResizeHandler();
    
    //--
    //添加购物车
	//shoppingCarAppend( "public_en/source/shoppingCar/001.jpg","name01","size01","Color01","amount01","￥ 2500.00");
});



