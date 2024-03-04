// Declaration
const express = require('express');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// Connect to file .js
const router = require('./routing.js');
const dbConnection = require('./database.js');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Rules of our API
// app.use((req, res, next) => {
//     // set the CORS policy
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5309');
//     // set the CORS headers
//     res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With, Content-Type,Accept, Authorization');
//     // set the CORS method headers
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
//         return res.status(200).json({});
//     }
//     next();
// });

// CORS options
let whiteList = ['http://localhost:4309', 'http://localhost:5309'];
let corOptions = {
    origin: whiteList,
    method: 'GET,POST,PUT,DELETE',
    credentials: true,
}
app.use(cors(corOptions));

////////////////////////////////////////// Routing here ///////////////////////////////////////////
// Public folder for CSS and Image files
app.use('/static', express.static('public'));

// Connect the external routes to the server
app.use('/', router);

// Search product with criteria
app.get('/search', function (req, res) {
    console.log(`request at ${req.url}`);
    res.sendFile(path.join(__dirname, './src/search.html'));
});

// app.get('/result', function (req, res){
//     console.log(`request at ${req.url}`);
//     res.sendFile(path.join(__dirname, './src/product_template.html'));
// });

app.get('/resultProduct/id=:id', function(req, res) {
    console.log(`request at ${req.url}`);
    
    let product;
    let product_id = req.params.id;
    dbConnection.query('SELECT * FROM product WHERE Product_ID = ?', product_id, function (error, results) {
        if (error) throw error;
        product = results[0];
        res.render('product_template', {
            title: product.Name_Of_Product,
            img: product.Img,
            name: product.Name_Of_Product,
            price: product.Price,
            information: product.Information
        });
    });
});

app.get('/resultUser/id=:id', function(req, res) {
    console.log(`request at ${req.url}`);
    
    let user;
    let user_id = req.params.id;
    dbConnection.query('SELECT * FROM customer WHERE Customer_ID = ?', user_id, function (error, results) {
        if (error) throw error;
        user = results[0];
        res.render('Info_template', {
            title: user.Title,
            fname: user.Firstname,
            lname: user.Lastname,
            phone: user.Phone,
            email: user.Email,
            dob: user.Date_Of_Birth
        });
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////// API ///////////////////////////////////////////////////
app.get('/searchResult=:id', (req, res) => {
    console.log(`request at ${req.url}`);
    let product_id = req.params.id;
    if (!product_id) {
        return res.status(400).send({ error: true, message: 'fail to retrieve the data' });
    }
    dbConnection.query('SELECT * FROM product WHERE Product_ID = ?', product_id, function (error, results) {
        if (error) throw error;
        return res.send(results);
    });
});

app.get('/searchProductType=:type', (req, res) => {
    console.log(`request at ${req.url}`);
    let product_type = req.params.type;
    if (!product_type) {
        return res.status(400).send({ error: true, message: 'fail to retrieve the data' });
    }
    dbConnection.query('SELECT * FROM product WHERE product_type = ?', product_type, function (error, results) {
        if (error) throw error;
        return res.send(results);
    });
});

app.get('/searchProductName=:name', (req, res) => {
    console.log(`request at ${req.url}`);
    let product_name = req.params.name;
    if (!product_name) {
        return res.status(400).send({ error: true, message: 'fail to retrieve the data' });
    }
    dbConnection.query(`SELECT * FROM product WHERE Name_Of_Product LIKE "%${product_name}%"`, function (error, results) {
        if (error) throw error;
        return res.send(results);
    });
});

app.get('/searchUser=:fname', (req, res) => {
    console.log(`request at ${req.url}`);
    let user_fname = req.params.fname;
    if (!user_fname) {
        return res.status(400).send({ error: true, message: 'fail to retrieve the data' });
    }
    dbConnection.query(`SELECT * FROM Customer WHERE Firstname LIKE "%${user_fname}%"`, function (error, results) {
        if (error) throw error;
        return res.send(results);
    });
});

app.get('/searchTitle=:title', (req, res) => {
    console.log(`request at ${req.url}`);
    let user_title = req.params.title;
    if (!user_title) {
        return res.status(400).send({ error: true, message: 'fail to retrieve the data' });
    }
    dbConnection.query('SELECT * FROM Customer WHERE Title = ?', user_title, function (error, results) {
        if (error) throw error;
        return res.send(results);
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/adminPanel", function (req, res) {
    res.sendFile(path.join(__dirname + "/src/AdminPanel.html"))
});

///////////////////////////////// Server listens on port 4309 /////////////////////////////////////
app.listen(4309, function(){
    console.log("Listen on port 4309");
});
///////////////////////////////////////////////////////////////////////////////////////////////////

