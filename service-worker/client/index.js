let origin;
let _DEBUG = true;
(function setOrigin(){
	if(_DEBUG){
		origin = "http://127.0.0.1:3333";
	}
	else{
		origin = "https://jquery.website:3333"
	}
})();


function urlB64ToUint8Array(base64_string){
	// 补全等号
	const padding = "=".repeat((4 - base64_string.length % 4) % 4);
	// 替换代替符号，应该是url传输中转换的
	const base64 = (base64_string + padding).replace(/\-/g, '+').replace(/_/g, '/');
	const raw_data = window.atob(base64);
	const output_array = new Uint8Array(raw_data.length);

	for(let i = 0; i < raw_data.length; i++){
		output_array[i] = raw_data.charCodeAt(i);
	}

	return output_array;
}

function ArraybufferToEncodedBase64(arraybuffer){
	// arraybuffer 转 base64
	return encodeURIComponent(window.btoa(String.fromCharCode.apply(null, new Uint8Array(arraybuffer))));
}

function sendSubscriptionToServer(subscription){
	let subscription_object = new Object();
	subscription_object.endpoint = subscription.endpoint;
	subscription_object.p256dh = ArraybufferToEncodedBase64(subscription.getKey("p256dh"));
	subscription_object.auth = ArraybufferToEncodedBase64(subscription.getKey("auth"));
	console.log(subscription_object);
	let url = origin + "/setSubscription"
	let xhr = new XMLHttpRequest();
	xhr.open("POST",origin + "/setSubscription");
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	let data = `auth=${subscription_object.auth}&p256dh=${subscription_object.p256dh}&endpoint=${subscription_object.endpoint}`;
	console.log(data);
	xhr.send(data);
	return true;
}

function createSubscription(reg){
	// 这里是自己生成的public key
	const applicationServerPublicKey = "BN577ruXiNOXdDyoHi-wWvRDSaa7kcDa3-4PMs2uvm-aGu7SwSDJIwoNJi2SzyE869Dcd5rA4td408JLYhVkHHE";
	const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
	reg.pushManager.subscribe({
		userVisibleOnly : true,
		applicationServerKey : applicationServerKey
	})
	.then(function(subscription){
		console.log("订阅成功");
		sendSubscriptionToServer(subscription);
	})
	.catch(function(e){
		console.log("订阅失败");
	});
}


function main(){
	if(!"serviceWorker" in navigator){
		console.log("need serviceWorker object");
		return false;
	}	

	navigator.serviceWorker.register("./service_worker.js")
	.then(function(reg){
		console.log("注册service-worker成功");
		if(window.PushManager){
			reg.pushManager.getSubscription()
			.then(function(subscription){
				if(!subscription){
					// 如果获取订阅为空，则给service-worker新生成一个订阅
					createSubscription(reg);
				}
				else{
					// 如果获取订阅不为空，则将该订阅的信息传递给server，并存起来，这样server就可以通过这个订阅对象给client传信息了
					sendSubscriptionToServer(subscription);
				}
			})
			.catch(function(e){
				console.log("获取subscription失败",e);
			});

		}
	})
	.catch(function(e){
		console.log("注册service-worker失败",e);
	})


}

main();