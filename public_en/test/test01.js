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
	 
	var inputEl = $("<input type='text' class='dateInput' readonly='readonly'/>").appendTo(el);
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


$(function(){
	new EVE_DataPicker(
		$(".com_dateSelector"),
		["January","February","March","April","May","June",
		"July","August","September","October","November","December"],
		["Mon","Tue","Wed","Thur","Fri","Sat","Sun"],
		"Today"
	);
	
	
});
