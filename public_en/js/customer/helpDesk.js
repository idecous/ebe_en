$(function(){
	var tTextAreaEls =$(".m7p_formList textarea");
	var tTextAreaBorderEls =$(".m7p_formList .inputTextarea");
	var tSelectEls =$(".m7p_formList select");
	var tSelectBorderEls =$(".m7p_formList .inputSelect");
	
	var countryEls = tSelectEls.eq(0);
	var countryBorderEls = tSelectBorderEls.eq(0);
	var titleEls = tTextAreaEls.eq(0);
	var titleBorderEls = tTextAreaBorderEls.eq(0);
	var departmentEls = tSelectEls.eq(1);
	var departmentBorderEls = tSelectBorderEls.eq(1);
	var messageEls = tTextAreaEls.eq(1);
	var messageBorderEls = tTextAreaBorderEls.eq(1);
	
	$(".m7p_contentMainPanel form").submit(function(){
		var hasErr= false;
		if( countryEls.val() == ""){
			hasErr= true;
			countryBorderEls.addClass("m7p_validationFailed");
		}else{
			countryBorderEls.removeClass("m7p_validationFailed");
		}
		if( $.trim(titleEls.val()) == "" ){
			hasErr= true;
			titleBorderEls.addClass("m7p_validationFailed");
		}else{
			titleBorderEls.removeClass("m7p_validationFailed");
		}
		if( departmentEls.val() == ""){
			hasErr= true;
			departmentBorderEls.addClass("m7p_validationFailed");
		}else{
			departmentBorderEls.removeClass("m7p_validationFailed");
		}
		if( $.trim(messageEls.val()) == "" ){
			hasErr= true;
			messageBorderEls.addClass("m7p_validationFailed");
		}else{
			messageBorderEls.removeClass("m7p_validationFailed");
		}
		
		console.log( messageEls, messageBorderEls );
		
		
		
		
		
		
		return false;
	});
	

	
	
});
