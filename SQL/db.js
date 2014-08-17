var mysql = require('mysql');
console.log('in db connection');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
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
  var fetchAllMessages = "SELECT * FROM messages";
  dbConnection.query(fetchAllMessages, function(err, rows, fields){
    console.log('rows',rows);
    cb(err,rows);//serverhelpers.sendResponses()
  });

};



exports.findUser = function(username, cb){
  dbConnection.query("SELECT * FROM users WHERE username = '"+ username + "'", function(err, results){
    cb(err, results);//change results to userID
  });
  //query database for userID, return results
  //cb(err,results)
};

exports.saveUser = function(username, cb){
  console.log('save user');
  //create new userName in database, and retrieves new userID
  dbConnection.query("INSERT INTO users (username) VALUES ('" + username + "')", function(err, results){
    console.log('saving user',results);
    // after creating user, find user and send those results into resultsCallback() in request-handler.js.
    // where resultsCallback() calls saveMessage();
    exports.findUser(username, function(err, results){
      console.log('sending resultsCallback some user object', results);
      cb(results);
    });
  });
  //passes userID into cb and invokes cb
    //P.S. the cb creates a chat object and
    //then posts it to the database
};

exports.saveMessage = function(message, userid, roomname, cb){
  console.log('INSERT INTO messages (user_id, message,roomname) values ('+"'"+ userid + "','" + message + "','" + roomname + "')");
  dbConnection.query('INSERT INTO messages (user_id, message,roomname) VALUES ('+"'"+ userid + "','" + message + "','" + roomname + "')", function(err, results){
    console.log('save query',results);
    cb('message stored.');
  });
};
