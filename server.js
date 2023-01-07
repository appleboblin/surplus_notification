const express = require('express');
const mysql = require('mysql');

const app = express();

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Surplus-Notification9',
  database: 'notifi'
});

// Connect to the database
connection.connect((error) => {
    if (error) throw error;
    console.log('Connected to the database');
  });
  
// Use app.get() to handle GET requests at the '/' URL
app.get('/', function (req, res) {
    // Render the HTML file
    res.sendFile(__dirname + '/index.html');
  });
  
// Use app.post() to handle POST requests at the '/add-item' URL
app.post('/add-item', function (req, res) {
    // Connect to the MySQL database
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Surplus-Notification9',
      database: 'notifi'
    });
    connection.connect();
  
    // Insert the form data into the MySQL database
    var serialNumber = req.body.serialNumber;
    var ticketNumber = req.body.ticketNumber;
    var notificationDate = req.body.notificationDate;
    var sql = 'INSERT INTO items (serialNumber, ticketNumber, notificationDate) VALUES (?, ?, ?)';
    var values = [serialNumber, ticketNumber, notificationDate];
    connection.query(sql, values, function (error, results, fields) {
      if (error) throw error;
    });
  
    // Close the connection to the MySQL database
    connection.end();
  
    // Send a response to the client
    res.send('Item added successfully');
  });

// Use app.get() to handle GET requests at the '/' URL
app.get('/all', function (req, res) {
    // Connect to the MySQL database
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Surplus-Notification9',
        database: 'notifi'
    });
    connection.connect();
  
    // Retrieve all the items from the MySQL database
    connection.query('SELECT * FROM items', function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });
  
    // Close the connection to the MySQL database
    connection.end();
  });
  
  // Use app.get() to handle GET requests at the '/items' URL
  app.get('/items', function (req, res) {
    // Connect to the MySQL database
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'notifi'
    });
    connection.connect();
  
    // Retrieve the expired items from the MySQL database
    var currentDate = new Date().toISOString().slice(0, 10);
    connection.query('SELECT * FROM items WHERE notificationDate < ?', [currentDate], function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });
  
    // Close the connection to the MySQL database
    connection.end();
  });

// Define a route for /track.html
app.get('/track.html', function (req, res) {
    res.sendFile(__dirname + '/track.html');
  });

  app.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });