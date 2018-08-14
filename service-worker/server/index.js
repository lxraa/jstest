const express = require("express");
const body_parser = require("body-parser");
const cors = require("cors");
const app = express();



function initCache(){
	global._cache = new Object();
	global._cache.subscriptions = new Array();
	global._cache.alives = new Array();
}
initCache();


app.use(cors());
app.use(body_parser.urlencoded({
	extended : true
}))
app.use(body_parser.json());
app.use(require("./controller"))

let port = 3333;
app.listen(port,function(){
	console.log("[*] Listening  ",port);
})