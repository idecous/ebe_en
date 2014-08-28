$(function(){
	var moreBtnEl = $(".mainPanel .more");
	var listEl = $(".mainPanel .listPanel ul");
	
	function buildCell(url,img01Url,img02Url){
		return $("<li><a class='contentBlock' href='"+url+
		"''><img src='"+img01Url+"' /><img class='overrImg' src='"+
		img02Url+"' /><div class='descriptBlock'><i></i><p>ZHOUJIE ZHANG</p></div></a></li>");
	}
	moreBtnEl.click(function(){
		for(var i=0;i<6;i++){
			listEl.append( buildCell("#","public_en/source/art/t_001.jpg",
			"public_en/source/art/t_004.jpg" ) );
		}
	});
});
