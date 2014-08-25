$(function(){
	var eMailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
	
	var contactUsForm = $(".m7p_contentMainPanel form");
	var CS_inputEl = contactUsForm.find("input,textarea");
	var CS_borderEl = contactUsForm.find(".inputText,.inputTextarea");
	
	contactUsForm.submit(function(){
		var hasErr= false;
		if(  $.trim(CS_inputEl.eq(0).val()) == "" ){
			hasErr = true;
			CS_borderEl.eq(0).addClass("m7p_validationFailed");
		}else{
			CS_borderEl.eq(0).removeClass("m7p_validationFailed");
		}
		if( !eMailReg.test( $.trim(CS_inputEl.eq(1).val()) ) ){
			hasErr = true;
			CS_borderEl.eq(1).addClass("m7p_validationFailed");
			
		}else{
			CS_borderEl.eq(1).removeClass("m7p_validationFailed");
		}
		
		if(  $.trim(CS_inputEl.eq(3).val()) == "" ){
			hasErr = true;
			CS_borderEl.eq(3).addClass("m7p_validationFailed");
		}else{
			CS_borderEl.eq(3).removeClass("m7p_validationFailed");
		}
		return !hasErr;
	});

});
