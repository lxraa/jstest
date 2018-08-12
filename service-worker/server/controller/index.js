const express = require("express");
const webpush = require("web-push");
const router = express.Router();
const Log = require("log");




webpush.setVapidDetails("mailto:liu.yiyi0219@gmail.com","BN577ruXiNOXdDyoHi-wWvRDSaa7kcDa3-4PMs2uvm-aGu7SwSDJIwoNJi2SzyE869Dcd5rA4td408JLYhVkHHE","hWgpKrgQhPNQ9-oD2eMPR9ofGW2abd2mAU-B06EwzT0");

let log = new Log();
function pushSubscriptions(){
	
	log.info("Start push subscriptions",global._cache.subscriptions.length);
	for(let i = 0;i < global._cache.subscriptions.length;i++){
		let subscription = global._cache.subscriptions[i];
		webpush.sendNotification(subscription,JSON.stringify({
			msg : "test msg",
			url : "test url",
			icon : "test icon",
			title : "test title"
		}))
		.then(function(result){
			
		})
		.catch(function(err){
			log.info("Failed push num ",i);
		});
	}

}

function isExistingSubscription(endpoint){

	for(let subscription of global._cache.subscriptions){
		if(subscription.endpoint == endpoint){
			return true;
		}
	}
	return false;
}

// 10秒推送一次
setInterval(pushSubscriptions,10000);

router.get("clearSubscription",function(req,res){
	global._cache.subscriptions = new Array();
});

router.get("/sendSubscription",function(req,res){
	for(let i = 0;i < global._cache.subscriptions.length;i++){
		let subscription = global._cache.subscriptions[i];
		webpush.sendNotification(subscription,JSON.stringify({
			msg : "test msg",
			url : "test url",
			icon : "test icon",
			title : "test title"
		}))
		.then(function(result){
			res.send("ok");
		})
		.catch(function(err){
			console.log(err);
			res.send("err");
		});
	}
	
});

router.post("/setSubscription",function(req,res){

	if(isExistingSubscription(decodeURIComponent(req.body.endpoint))){
		res.send("existing subscription");
		return false;
	}

	const subscription = {
		endpoint : decodeURIComponent(req.body.endpoint),
		keys : {
			auth : decodeURIComponent(req.body.auth),
			p256dh : decodeURIComponent(req.body.p256dh)
		}
	}

	global._cache.subscriptions.push(subscription);
	res.send("ok")
	return true;
});

router.get("/alive",function(req,res){
	console.log("alive");
	res.send("ok");
})


module.exports = router;