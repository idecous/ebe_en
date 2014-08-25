$(function(){
	var eMailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
	var loginFormEl = $(".leftPanel form:eq(0)");
	var LF_inputEl = loginFormEl.find("input");
	var LF_borderEl = loginFormEl.find(".inputText");

	
	loginFormEl.submit(function(){
		var hasErr= false;
		if( !eMailReg.test( $.trim(LF_inputEl.eq(0).val()) ) ){
			hasErr = true;
			LF_borderEl.eq(0).addClass("m7p_validationFailed");
			
		}else{
			LF_borderEl.eq(0).removeClass("m7p_validationFailed");
		}
		if(  $.trim(LF_inputEl.eq(1).val()) == "" ){
			hasErr = true;
			LF_borderEl.eq(1).addClass("m7p_validationFailed");
		}else{
			LF_borderEl.eq(1).removeClass("m7p_validationFailed");
		}
		return !hasErr;
	});
	
	var forgotmEl = $(".leftPanel form:eq(1)");
	var FG_inputEl = forgotmEl.find("input");
	var FG_borderEl = forgotmEl.find(".inputText");
	
	forgotmEl.submit(function(){
		var hasErr= false;
		if( !eMailReg.test( $.trim(FG_inputEl.eq(0).val()) ) ){
			hasErr = true;
			FG_borderEl.eq(0).addClass("m7p_validationFailed");
		}else{
			FG_borderEl.eq(0).removeClass("m7p_validationFailed");
		}
		
		return !hasErr;
	});

	
	var newAccountEl = $(".rightPanel form");
	var NA_inputEl = newAccountEl.find("input");
	var NA_borderEl = newAccountEl.find(".inputText");
	
	newAccountEl.submit(function(){
		var hasErr= false;
		if(  $.trim(NA_inputEl.eq(0).val()) == "" ){
			hasErr = true;
			NA_borderEl.eq(0).addClass("m7p_validationFailed");
		}else{
			NA_borderEl.eq(0).removeClass("m7p_validationFailed");
		}
		if(  $.trim(NA_inputEl.eq(1).val()) == "" ){
			hasErr = true;
			NA_borderEl.eq(1).addClass("m7p_validationFailed");
		}else{
			NA_borderEl.eq(1).removeClass("m7p_validationFailed");
		}
		
		if( !eMailReg.test( $.trim(NA_inputEl.eq(2).val()) ) ){
			hasErr = true;
			NA_borderEl.eq(2).addClass("m7p_validationFailed");
			
		}else{
			NA_borderEl.eq(2).removeClass("m7p_validationFailed");
		}
		var pw01 = $.trim(NA_inputEl.eq(3).val());
		var pw02 = $.trim(NA_inputEl.eq(4).val());
		if(  pw01 == "" ){
			hasErr = true;
			NA_borderEl.eq(3).addClass("m7p_validationFailed");
		}else{
			NA_borderEl.eq(3).removeClass("m7p_validationFailed");
		}
		if( pw02 == "" ){
			hasErr = true;
			NA_borderEl.eq(4).addClass("m7p_validationFailed");
		}else{
			NA_borderEl.eq(4).removeClass("m7p_validationFailed");
		}
		
		if( pw01 != "" && pw02 != "" && pw01 != pw02 ){
			hasErr = true;
			NA_borderEl.eq(3).addClass("m7p_validationFailed");
			NA_borderEl.eq(4).addClass("m7p_validationFailed");
		}
		return !hasErr;
	});

	var forgotPanelEl = $(".forgotpassword");
	$(".forgotPWBtn").click(function(){
		forgotPanelEl.show();
	});
	forgotPanelEl.find("abbr").click(function(){
		forgotPanelEl.hide();
	});
});
