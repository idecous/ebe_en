$(function(){
	var eMailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
	var passwordReg = /^[\\~!@#$%^&*()-_=+|{}\[\],.?\/:;\'\"\d\w]{4,16}$/;
	var telReg = /^[\d-]{4,20}$/;
	var cardReg = /^\d{10,50}$/;
	var cardVerifyReg = /^\d{3,20}$/;
	var i,currentStep = 0;
	var role="";//Register Guest01 Guest02;
	var setGroupLiBarEl = $(".stepGroup>li");
	var setGroupEditBtnEl = $(".stepGroup>li>.stepTitle>a");
	
	function setStep(value){
		if( value == currentStep){return;}
		for(i=0;i<setGroupLiBarEl.length;i++){
			if( i < value){
				setGroupLiBarEl.eq(i).removeClass("action").addClass("allow");
				continue;
			} 
			if( i == value){
				setGroupLiBarEl.eq(i).removeClass("allow").addClass("action");
				continue;
			}
			setGroupLiBarEl.eq(i).removeClass("action").removeClass("allow");
		}
		currentStep = value;
	}
	if( setGroupLiBarEl.eq(0).is(":hidden") ){
		role = "Register";
	}
	setGroupEditBtnEl.click(function(){
		var index = setGroupEditBtnEl.index(this);
		if( index < currentStep ){
			setStep(index);
		}
	});
	
	//--step01--
	var S1_guestTypeEl = $(".stepGroup>.login input[type='radio']");
	var S1_guestNextBtnEl = $(".stepGroup>.login button:eq(1)");
	var S1_guestIndex = S1_guestTypeEl.index( S1_guestTypeEl.filter(":checked") );
	S1_guestTypeEl.change(function(){
		S1_guestIndex = S1_guestTypeEl.index(this);
	});
	S1_guestNextBtnEl.click(function(){
		switch(S1_guestIndex){
			case -1:
				alert("Please choose to register or to checkout as a guest!");
			break;
			case 0:
				role = "Guest01";
				S2_passwordLisEl.hide();
				setStep(1);
			break;
			case 1:
				role = "Guest02";
				S2_passwordLisEl.show();
				setStep(1);
			break;
		}
	});
	var S1_formEl = $(".stepGroup>.login form");
	var S1_nameEl = S1_formEl.find("input[type='text']");
	var S1_passwordEl = S1_formEl.find("input[type='password']");
	var S1_inputBorderEl = S1_formEl.find(".inputText");
	S1_formEl.submit(function(){
		var hasErr= false;
		if( eMailReg.test( $.trim(S1_nameEl.val()) ) ){
			S1_inputBorderEl.eq(0).removeClass("m7p_validationFailed");
		}else{
			hasErr = true;
			S1_inputBorderEl.eq(0).addClass("m7p_validationFailed");
		}
		if( passwordReg.test( $.trim(S1_passwordEl.val()) ) ){
			S1_inputBorderEl.eq(1).removeClass("m7p_validationFailed");
		}else{
			hasErr = true;
			S1_inputBorderEl.eq(1).addClass("m7p_validationFailed");
		}
		return !hasErr;
	});
	
	//--step02--
	var tInputEls =$(".stepGroup>.billing input");
	var tBorderEls =$(".stepGroup>.billing .inputText");
	var S2_passwordLisEl = $(".stepGroup>.billing li:gt(11)");	
	var S2_firstNameEl =  tInputEls.eq(0);
	var S2_firstNameBorderEl =  tBorderEls.eq(0);
	var S2_lastNameEl = tInputEls.eq(1);
	var S2_lastNameBorderEl =  tBorderEls.eq(1);
	var S2_emailEl =  tInputEls.eq(2);
	var S2_emailBorderEl =  tBorderEls.eq(2);
	var S2_companyEl =  tInputEls.eq(3);
	var S2_addressEl =  tInputEls.eq(4);
	var S2_addressBorderEl =  tBorderEls.eq(4);
	var S2_address2El =  tInputEls.eq(5);
	var S2_cityEl = tInputEls.eq(6);
	var S2_cityBorderEl = tBorderEls.eq(6);
	var S2_zipEl = tInputEls.eq(7);
	var S2_zipBorderEl = tBorderEls.eq(7);
	var S2_countryEl = $(".stepGroup>.billing select:eq(0)");
	var S2_countryBorderEl = $(".stepGroup>.billing .inputSelect:eq(0)");
	var S2_provinceEl = $(".stepGroup>.billing select:eq(1)");
	var S2_provinceBorderEl = $(".stepGroup>.billing .inputSelect:eq(1)");
	var S2_telEl = tInputEls.eq(8);
	var S2_telBorderEl = tBorderEls.eq(8);
	var S2_faxEl = tInputEls.eq(9);
	var S2_password1El = tInputEls.eq(10);
	var S2_password1BorderEl = tBorderEls.eq(10);
	var S2_password2El = tInputEls.eq(11);
	var S2_password2BorderEl = tBorderEls.eq(11);
	var S2_addressTypeEl = $(".stepGroup>.billing input[type='radio']");
	var S2_addressIndex = S2_addressTypeEl.index( S2_addressTypeEl.filter(":checked") );
	var S2_continueBtnEl = $(".stepGroup>.billing button");	
	var S2_waitEl = $(".stepGroup>.billing .waitInfo");	

	S2_continueBtnEl.click(function(){
		var hasErr= false;		
		if( $.trim(S2_firstNameEl.val()) == "" ){
			hasErr = true;
			S2_firstNameBorderEl.addClass("m7p_validationFailed");
		}else{
			S2_firstNameBorderEl.removeClass("m7p_validationFailed");
		}
		if( $.trim(S2_lastNameEl.val()) == "" ){
			hasErr = true;
			S2_lastNameBorderEl.addClass("m7p_validationFailed");
		}else{
			S2_lastNameBorderEl.removeClass("m7p_validationFailed");
		}
		if( !eMailReg.test( $.trim(S2_emailEl.val()) ) ){
			hasErr = true;
			S2_emailBorderEl.addClass("m7p_validationFailed");
		}else{
			S2_emailBorderEl.removeClass("m7p_validationFailed");
		}
		if( $.trim(S2_addressEl.val()) == "" ){
			hasErr = true;
			S2_addressBorderEl.addClass("m7p_validationFailed");
		}else{
			S2_addressBorderEl.removeClass("m7p_validationFailed");
		}
		if( $.trim(S2_cityEl.val()) == "" ){
			hasErr = true;
			S2_cityBorderEl.addClass("m7p_validationFailed");
		}else{
			S2_cityBorderEl.removeClass("m7p_validationFailed");
		}
		if( $.trim(S2_zipEl.val()) == "" ){
			hasErr = true;
			S2_zipBorderEl.addClass("m7p_validationFailed");
		}else{
			S2_zipBorderEl.removeClass("m7p_validationFailed");
		}
		if( S2_countryEl.val() == ""){
			hasErr = true;
			S2_countryBorderEl.addClass("m7p_validationFailed");
		}else{
			S2_countryBorderEl.removeClass("m7p_validationFailed");
		}
		if( S2_provinceEl.val() == ""){
			hasErr = true;
			S2_provinceBorderEl.addClass("m7p_validationFailed");
		}else{
			S2_provinceBorderEl.removeClass("m7p_validationFailed");
		}
		if( !telReg.test( $.trim(S2_telEl.val()) ) ){
			hasErr = true;
			S2_telBorderEl.addClass("m7p_validationFailed");
		}else{
			S2_telBorderEl.removeClass("m7p_validationFailed");
		}
		if( role == "Guest02" ){
			var tErr = false;
			if( !passwordReg.test( $.trim(S2_password1El.val()) )  ){
				tErr = true;
				S2_password1BorderEl.addClass("m7p_validationFailed");
			}else{
				S2_password1BorderEl.removeClass("m7p_validationFailed");
			}
			if( !passwordReg.test( $.trim(S2_password2El.val()) )  ){
				tErr = true;
				S2_password2BorderEl.addClass("m7p_validationFailed");
			}else{
				S2_password2BorderEl.removeClass("m7p_validationFailed");
			}
			if( !tErr ){
				if( $.trim(S2_password1El.val()) != $.trim(S2_password2El.val()) ){
					tErr = true;
					S2_password2BorderEl.addClass("m7p_validationFailed");
				}else{
					S2_password2BorderEl.removeClass("m7p_validationFailed");
				}
			}
			hasErr |= tErr;
		}
		if(!hasErr){
			S2_waitEl.show();
			//请求服务器
			S2_waitEl.hide();
			S2_addressIndex = S2_addressTypeEl.index( S2_addressTypeEl.filter(":checked") );
			setStep(S2_addressIndex == 0?3:2);
		}
	});
	//--step03--
	tInputEls =$(".stepGroup>.shipping input");
	tBorderEls =$(".stepGroup>.shipping .inputText");
	var S3_firstNameEl =  tInputEls.eq(0);
	var S3_firstNameBorderEl =  tBorderEls.eq(0);
	var S3_lastNameEl = tInputEls.eq(1);
	var S3_lastNameBorderEl =  tBorderEls.eq(1);
	var S3_companyEl =  tInputEls.eq(2);
	var S3_addressEl =  tInputEls.eq(3);
	var S3_addressBorderEl =  tBorderEls.eq(3);
	var S3_address2El =  tInputEls.eq(4);
	var S3_cityEl = tInputEls.eq(5);
	var S3_cityBorderEl = tBorderEls.eq(5);
	var S3_zipEl = tInputEls.eq(6);
	var S3_zipBorderEl = tBorderEls.eq(6);
	var S3_countryEl = $(".stepGroup>.shipping select:eq(0)");
	var S3_countryBorderEl = $(".stepGroup>.shipping .inputSelect:eq(0)");
	var S3_provinceEl = $(".stepGroup>.shipping select:eq(1)");
	var S3_provinceBorderEl = $(".stepGroup>.shipping .inputSelect:eq(1)");
	var S3_telEl = tInputEls.eq(7);
	var S3_telBorderEl = tBorderEls.eq(7);
	var S3_faxEl = tInputEls.eq(8);
	var S3_copyBtnEl = $(".stepGroup>.shipping .useAddress>input");	
	var S3_continueBtnEl = $(".stepGroup>.shipping button");	
	var S3_waitEl = $(".stepGroup>.shipping .waitInfo");	
	S3_copyBtnEl.click(function(){
		if( S3_copyBtnEl.prop("checked") ){
			S3_firstNameEl.val( S2_firstNameEl.val() );
			S3_lastNameEl.val( S2_lastNameEl.val() );
			S3_companyEl.val( S2_companyEl.val() );
			S3_addressEl.val( S2_addressEl.val() );
			S3_address2El.val( S2_address2El.val() );
			S3_cityEl.val( S2_cityEl.val() );
			S3_zipEl.val( S2_zipEl.val() );
			S3_countryEl.val( S2_countryEl.val() );
			S3_provinceEl.val( S2_provinceEl.val() );
			S3_telEl.val( S2_telEl.val() );
			S3_faxEl.val( S2_faxEl.val() );
		}
	});
	S3_continueBtnEl.click(function(){
		var hasErr= false;		
		if( $.trim(S3_firstNameEl.val()) == "" ){
			hasErr = true;
			S3_firstNameBorderEl.addClass("m7p_validationFailed");
		}else{
			S3_firstNameBorderEl.removeClass("m7p_validationFailed");
		}
		if( $.trim(S3_lastNameEl.val()) == "" ){
			hasErr = true;
			S3_lastNameBorderEl.addClass("m7p_validationFailed");
		}else{
			S3_lastNameBorderEl.removeClass("m7p_validationFailed");
		}
		if( $.trim(S3_addressEl.val()) == "" ){
			hasErr = true;
			S3_addressBorderEl.addClass("m7p_validationFailed");
		}else{
			S3_addressBorderEl.removeClass("m7p_validationFailed");
		}
		if( $.trim(S3_cityEl.val()) == "" ){
			hasErr = true;
			S3_cityBorderEl.addClass("m7p_validationFailed");
		}else{
			S3_cityBorderEl.removeClass("m7p_validationFailed");
		}
		if( $.trim(S3_zipEl.val()) == "" ){
			hasErr = true;
			S3_zipBorderEl.addClass("m7p_validationFailed");
		}else{
			S3_zipBorderEl.removeClass("m7p_validationFailed");
		}
		if( S3_countryEl.val() == ""){
			hasErr = true;
			S3_countryBorderEl.addClass("m7p_validationFailed");
		}else{
			S3_countryBorderEl.removeClass("m7p_validationFailed");
		}
		if( S3_provinceEl.val() == ""){
			hasErr = true;
			S3_provinceBorderEl.addClass("m7p_validationFailed");
		}else{
			S3_provinceBorderEl.removeClass("m7p_validationFailed");
		}
		if( $.trim(S3_telEl.val()) == "" ){
			hasErr = true;
			S3_telBorderEl.addClass("m7p_validationFailed");
		}else{
			S3_telBorderEl.removeClass("m7p_validationFailed");
		}
		if(!hasErr){
			S3_waitEl.show();
			//请求服务
			S3_waitEl.hide();
			setStep(3);
		}
	});
	//--step04--
	var S4_addressTypeEl = $(".stepGroup>.shippingMethod input[type='radio']");
	var S4_addressIndex = S4_addressTypeEl.index( S4_addressTypeEl.filter(":checked") );
	var S4_continueBtnEl = $(".stepGroup>.shippingMethod button");	
	var S4_waitEl = $(".stepGroup>.shippingMethod .waitInfo");	
	S4_continueBtnEl.click(function(){
		S4_addressIndex = S4_addressTypeEl.index( S4_addressTypeEl.filter(":checked") );
		if( S4_addressIndex == -1 ){
			alert("Please specify shipping method.");
			return;
		}
		setStep(4);
	});
	//--step05--
	tInputEls =$(".stepGroup>.payment input");
	tBorderEls =$(".stepGroup>.payment .inputText");
	var tSelectEls = $(".stepGroup>.payment select");
	var tSelectBorderEls = $(".stepGroup>.payment .inputSelect");
	var S5_cardTypeEl = tSelectEls.eq(0);
	var S5_cardTypeBorderEl = tSelectBorderEls.eq(0);
	var S5_cardNumberEl = tInputEls.eq(0);
	var S5_cardNumberBorderEl = tBorderEls.eq(0);
	var S5_monthEl = tSelectEls.eq(1);
	var S5_monthBorderEl = tSelectBorderEls.eq(1);
	var S5_yearEl = tSelectEls.eq(2);
	var S5_yearBorderEl = tSelectBorderEls.eq(2);
	var S5_cardVerifyEl = tInputEls.eq(1);
	var S5_cardVerifyBorderEl = tBorderEls.eq(1);
	var S5_continueBtnEl = $(".stepGroup>.payment button");	
	var S5_waitEl = $(".stepGroup>.payment .waitInfo");
	S5_continueBtnEl.click(function(){
		var hasErr= false;	
		if( S5_cardTypeEl.val() == "" ){
			hasErr = true;
			S5_cardTypeBorderEl.addClass("m7p_validationFailed");
		}else{
			S5_cardTypeBorderEl.removeClass("m7p_validationFailed");
		}
		if( !cardReg.test(S5_cardNumberEl.val()) ){
			hasErr = true;
			S5_cardNumberBorderEl.addClass("m7p_validationFailed");
		}else{
			S5_cardNumberBorderEl.removeClass("m7p_validationFailed");
		}
		if( S5_yearEl.val() == "" ){
			hasErr = true;
			S5_yearBorderEl.addClass("m7p_validationFailed");
		}else{
			S5_yearBorderEl.removeClass("m7p_validationFailed");
			if( serverTimetamp > Date.parse(S5_yearEl.val()+"/"+S5_monthEl.val()+"/1 00:00:00")){
				hasErr = true;
				S5_monthBorderEl.addClass("m7p_validationFailed");
				S5_yearBorderEl.addClass("m7p_validationFailed");
			}else{
				S5_monthBorderEl.removeClass("m7p_validationFailed");
				S5_yearBorderEl.removeClass("m7p_validationFailed");
			}
	 	}
		if( !cardVerifyReg.test(S5_cardVerifyEl.val()) ){
			hasErr = true;
			S5_cardVerifyBorderEl.addClass("m7p_validationFailed");
		}else{
			S5_cardVerifyBorderEl.removeClass("m7p_validationFailed");
		}
		if(!hasErr){
			S5_waitEl.show();
			//请求服务器
			S5_waitEl.hide();
			setStep(5);
		}
	});
	//--step06--
	var S6_continueBtnEl = $(".stepGroup>.review button");	
	var S6_waitEl = $(".stepGroup>.review .waitInfo");

	S6_continueBtnEl.click(function(){
		S6_continueBtnEl.hide();
		S6_waitEl.show();
		//请求服务器
		S6_continueBtnEl.show();
		S6_waitEl.hide();
	});
});


