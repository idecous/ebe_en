var EVE_DataPicker = function(el,monthNames,weekNames){
	var inputEl = $("<input type='text' />").appendTo(el);
	var popBtn = $("<a href='javascript:;' class='popBtn'></a>").appendTo(el);
	
	
	
	
	
	console.log(el);
	
};


$(function(){
	new EVE_DataPicker(
		$(".com_dateSelector"),
		["January","February","March","April","May","June","July","August","September","October","November","December"],
		["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
	);
	
	
});
