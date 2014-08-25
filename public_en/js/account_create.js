$(function(){
	var eMailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
	var newAccountForm = $(".mainPanel form");
	var NA_inputEl = newAccountForm.find("input");
	var NA_borderEl = newAccountForm.find(".inputText");
	newAccountForm.submit(function(){
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
	
	
	
});
