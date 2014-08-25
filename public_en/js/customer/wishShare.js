$(function(){
	var eMailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
	var eMailEls = $(".m7p_contentMainPanel textarea:eq(0)");
	var eMailBorderEls = $(".m7p_contentMainPanel .inputTextarea:eq(0)");

	$(".m7p_contentMainPanel form").submit(function(){
		var i,str,count=0,eMails = eMailEls.val().split(",");
		for( i=0; i < eMails.length ;i++ ){
			str = $.trim( eMails[i] );
			if( str == ""){
				continue;
			}
			if( eMailReg.test(str) ){
				count++;
			}else{
			   eMailBorderEls.addClass("m7p_validationFailed");
			   return false;
			}
			
		}
		return count==0?false:true;
	});
});
