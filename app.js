const http = require("http");

const PORT = 3000;

http.createServer(function (req, res) {
	res.write("On the way to become a full snack engineer!!!");
	res.end();
}).listen(PORT);

console.log("Listening on port " + PORT);