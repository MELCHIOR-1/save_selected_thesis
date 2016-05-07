[].map.call(document.getElementsByClassName('selectedRow'), function(selectedRow){
	var art_meta = (selectedRow.getElementsByClassName('art_meta')[0]).textContent;	//获取含有时间的标签，一般在出版信息里面
	var titleName = (selectedRow.getElementsByClassName('hlFld-Title')[0]).textContent;		//获取文章的标题
	var formatTitleName = titleName.replace(/\W/g,' ');		//格式化标题，将字母数字和下划线以外的字符替换成空格
	var yearStr = art_meta.match(/\d{4}/);		//提取年份，这里认为年份是4个数字组成的字符串
	//console.log('title = '+formatTitleName);
	return {access:(selectedRow.getElementsByClassName('accessIcon')[0]).alt == "full access",year:yearStr,title:formatTitleName,url:(selectedRow.getElementsByClassName('ref nowrap pdf')[0]).href};
});
