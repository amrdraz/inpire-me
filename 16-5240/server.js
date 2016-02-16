var app = require('./app.js');
var db = require('./db.js');

var PORT=8080;
db.connect(function (err, db) {
    if (err) throw err;
    app.listen(PORT, function(){
        console.log("Server listening on: http://localhost:%s", PORT);
    });
});