
self.addEventListener("push",function(event){
    
    if(self._workering){

    }
    else{
        self._workering = true;
        importScripts("./oneworker.js");
    }
    
	console.log('[Service Worker] Push Received.');

});


