chrome.runtime.onInstalled.addListener(function(){
  chrome.contextMenus.create({
    'id':'saveall',
    'type':'normal',
    'title':'下载选中文章',
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab){
  if(info.menuItemId == 'saveall'){
	
    chrome.tabs.executeScript(tab.id, {file: 'js/main.js'}, function(results){
		var residueThesis = new Array();
		console.log(results);
		  if (results && results[0] && results[0].length){
			results[0].forEach(function(item) {
				console.log('access = '+item.access)
				console.log('year = '+item.year)
				console.log('title = '+item.title)
				console.log('url = '+item.url)
				if(item.access){	//首先判断是否具有下载权限，若有再下载
					chrome.downloads.download({
					url:item.url,
					filename:'【'+item.year+'】'+item.title+'.pdf',
					conflictAction: 'uniquify',
					saveAs: false
				  });	//将文件以【年份】标题 的形式命名
				}
				else{
					//alert('Cannot download 《'+item.title+' 》\n You have no access authority!');
					residueThesis.push('《'+item.title+'》');
				}
			});
		  }
	console.log(residueThesis.length);
	if(residueThesis.length > 0){
		alert('Cannot download \n'+residueThesis.join('\n')+' \n You have no access authority!');
	}
    });
	
	
  }
});
