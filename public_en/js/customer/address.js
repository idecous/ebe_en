$(function(){
	var tInputEls =$(".m7p_formList input[type='text'],input[type='password']");
	var tBorderEls =$(".m7p_formList .inputText");
	var fNameEl = tInputEls.eq(0);
	var fNameBorderEl = tBorderEls.eq(0);
	var lNameEl = tInputEls.eq(1);
	var lNameBorderEl = tBorderEls.eq(1);
	var telEl = tInputEls.eq(3);
	var telBorderEl = tBorderEls.eq(3);
	var addressEl = tInputEls.eq(5);
	var addressBorderEl = tBorderEls.eq(5);
	var cityEl = tInputEls.eq(7);
	var cityBorderEl = tBorderEls.eq(7);
	var zipEl = tInputEls.eq(8);
	var zipBorderEl = tBorderEls.eq(8);
	var countryEl = $(".m7p_formList select:eq(0)");
	var countryBorderEl = $(".m7p_formList .inputSelect:eq(0)");
	var provinceEl = $(".m7p_formList select:eq(1)");
	var provinceBorderEl = $(".m7p_formList .inputSelect:eq(1)");
	
	$(".m7p_contentMainPanel form").submit(function(){
		var hasErr= false;
		if( $.trim(fNameEl.val()) == "" ){
			hasErr = true;
			fNameBorderEl.addClass("m7p_validationFailed");
		}else{
			fNameBorderEl.removeClass("m7p_validationFailed");
		}
		if( $.trim(lNameEl.val()) == "" ){
			hasErr = true;
			lNameBorderEl.addClass("m7p_validationFailed");
		}else{
			lNameBorderEl.removeClass("m7p_validationFailed");
		}
		if( $.trim(telEl.val()) == "" ){
			hasErr = true;
			telBorderEl.addClass("m7p_validationFailed");
		}else{
			telBorderEl.removeClass("m7p_validationFailed");
		}
		if( $.trim(addressEl.val()) == "" ){
			hasErr = true;
			addressBorderEl.addClass("m7p_validationFailed");
		}else{
			addressBorderEl.removeClass("m7p_validationFailed");
		}
		if( $.trim(cityEl.val()) == "" ){
			hasErr = true;
			cityBorderEl.addClass("m7p_validationFailed");
		}else{
			cityBorderEl.removeClass("m7p_validationFailed");
		}
		if( countryEl.val() == "" ){
			hasErr = true;
			countryBorderEl.addClass("m7p_validationFailed");
		}else{
			countryBorderEl.removeClass("m7p_validationFailed");
		}
		if( provinceEl.val() == "" ){
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
