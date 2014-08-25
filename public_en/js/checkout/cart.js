$(function(){
	var valiFormEl = $("form:eq(2)");
	var countyBorderEl = valiFormEl.find(".inputSelect:eq(0)");
	var countyEl = valiFormEl.find("select:eq(0)");
	var provinceBorderEl = valiFormEl.find(".inputSelect:eq(1)");
	var provinceEl = valiFormEl.find("select:eq(1)");
	var zipBorderEl = valiFormEl.find(".inputText");
	var zipEl = valiFormEl.find("input");
	
	valiFormEl.submit(function(){
	 	var hasErr= false;
	 	if( countyEl.val() == ""){
	 		hasErr = true;
	 		countyBorderEl.addClass("m7p_validationFailed");
	 	}else{
	 		countyBorderEl.removeClass("m7p_validationFailed");
	 	}
	 	if( provinceEl.val() == ""){
	 		hasErr = true;
	 		provinceBorderEl.addClass("m7p_validationFailed");
	 	}else{
	 		provinceBorderEl.removeClass("m7p_validationFailed");
	 	}
	 	
	 	if( $.trim(zipEl.val()) == "" ){
	 		hasErr = true;
	 		zipBorderEl.addClass("m7p_validationFailed");
	 	}else{
	 		zipBorderEl.removeClass("m7p_validationFailed");
	 	}
		return !hasErr;
	});
	
});
