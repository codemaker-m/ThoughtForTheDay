
// Create a chrome extension
var ChromeExtThought4Today = function(){
	this.title = "Thought for the day";
	this.listURLS = ['http://www.oracle.com/technetwork/java/javase/jdk7-relnotes-418459.html',
			'https://training.github.com/kit/downloads/github-git-cheat-sheet.pdf',
			'http://blog.takipi.com/5-features-in-java-8-that-will-change-how-you-code/',
			'http://www.javacodegeeks.com/2014/03/8-new-features-for-java-8.html',
			'http://java.dzone.com/articles/java-7-vs-java-8-performance',
			'http://www.w3schools.com/js/js_array_methods.asp',
			'http://www.brainmetrix.com/memory-game/'];
};

ChromeExtThought4Today.prototype.openUrlInCurTab = function(){
	var self = this;
	chrome.windows.getCurrent(function(win){
		//console.log(win.id);
		var id = win.id;
		chrome.tabs.query({'active': true}, function(tabs) {
			console.log('tabs.size::'+tabs.length);
			for(var i=0; i< tabs.length; i++){
				if(tabs[i].windowId === win.id){
					var urlList = self.shuffleUrls();
					chrome.tabs.update(tabs[i].id, {url: urlList[0]});
				}
			};
        });
	});
};

ChromeExtThought4Today.prototype.shuffleUrls = function(){
	var arr = this.listURLS;
	var i = arr.length-1;
	while(i!==0){
		var randomIndex = Math.floor(Math.random()*i);
		var temp = arr[randomIndex];
		arr[randomIndex] = arr[i];
		arr[i] = temp;
		i--;
	}
	return arr;
};

ChromeExtThought4Today.prototype.display = function(){
	document.getElementById('displayDiv').innerHTML = 'Going to '+this.urlList[0];
};

// Run script as soon as the DOM is ready
document.addEventListener('DOMContentLoaded', function(){
	var ext = new ChromeExtThought4Today();
	ext.openUrlInCurTab();
	bindext.display();
});
