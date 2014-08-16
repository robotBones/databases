var mysql = require('mysql');
var mysql = require('mysql');
console.log('in db connection');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "kim",
  password: "pass",
  database: "test"
});
//database name is test, table name is messageTable

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/




exports.findAllMessages = function(cb){
  //on get requests, grab all data from database, and send back
  //to client
  var fetchAllMessages = "SELECT * FROM messageTable";
  dbConnection.query(fetchAllMessages, function(err, rows, fields){
    console.log(rows);
    cb(err,rows);//serverhelpers.sendResponses()
  });

};



exports.findUser = function(username, cb){
  dbConnection.query("SELECT username FROM messageTable WHERE username = '"+ username + "'", function(err, results){
    cb(err, results);
  });
  //query database for userID, return results
  //cb(err,results)
};

exports.saveUser = function(username, cb){

  //create new userName in database, and retrieves new userID
  //passes userID into cb and invokes cb
    //P.S. the cb creates a chat object and
    //then posts it to the database
};

exports.saveMessage = function(message, userid, roomname, cb){

};
