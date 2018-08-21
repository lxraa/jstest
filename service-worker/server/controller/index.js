const express = require("express");
const webpush = require("web-push");
const router = express.Router();
const Log = require("log");




webpush.setVapidDetails("mailto:liu.yiyi0219@gmail.com","BN577ruXiNOXdDyoHi-wWvRDSaa7kcDa3-4PMs2uvm-aGu7SwSDJIwoNJi2SzyE869Dcd5rA4td408JLYhVkHHE","hWgpKrgQhPNQ9-oD2eMPR9ofGW2abd2mAU-B06EwzT0");

let log = new Log();

function checkAlive(){
	let current_time = new Date().getTime();
	for(let i = 0;i < global._cache.alives.length;i++){
		let alive = global._cache.alives[i];
		// 60s未发送心跳包，则认为已经断连
		if(current_time - alive.create_time > 60000){
			global._cache.alives.splice(i,1);
		}
	}
	return true;
}

function pushSubscriptions(){
	
	// log.info("Start push subscriptions",global._cache.subscriptions.length);
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
// 10秒钟检查一次存活的端
setInterval(checkAlive,10000);

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
	let client = new Object();
	client.ip = req.ip;
	client.hash = req.query.hash;
	client.create_time = new Date().getTime();
	let has_exist = false;
	for(let alive of global._cache.alives){
		if(client.hash == alive.hash){
			alive.create_time = client.create_time;
			has_exist = true;
			break;
		}
	}
	has_exist ? 1 : global._cache.alives.push(client);

	res.send("ok");
});

router.get("/showAlives",function(req,res){
	res.append("Content-type","application/json");
	res.send(global._cache.alives);
})


module.exports = router;