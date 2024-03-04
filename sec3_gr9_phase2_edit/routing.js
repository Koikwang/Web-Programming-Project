const express = require('express');
const path = require('path');

const dbConnection = require('./database.js');
const generateAccessToken = require('./generateAccessToken');
const cookieJwtAuth = require('./cookieJwtAuth');

const router = express.Router();
const cors = require('cors');


////////////////////////////////////////// Customers /////////////////////////////////////////////

// Testing Get all Customers
// method: get
// URL: http://25.13.241.170:4309/customer

// Select all customers
router.get('/customer', function (req, res) {
    console.log(`request at ${req.url}`);

    dbConnection.query(`SELECT * from customer`, 
    function (error, results) {
        if(error) throw error;
        return res.send({ 'status': true, 'customer': results, 'message': 'retrieved all customers' });
    });
});

// Testing Get a Customer
// method: get
// URL1: http://25.13.241.170:4309/customer/125031
// URL2: http://25.13.241.170:4309/customer/143002

// Select a customer
router.get('/customer/:id', function (req, res) {
    console.log(`request at ${req.url}`);
    let customer_id = req.params.id;
    if (!customer_id) {
        return res.status(400).send({ error: true, message: 'Please provide Customer_ID.' });
    }
    dbConnection.query('SELECT * FROM Customer WHERE Customer_ID = ?', customer_id, function (error, results) {
    if (error) throw error;
        //return res.send({ error: false, data: results[0], message: 'Customer retrieved' });
        return res.send(results);
    });
});

// Testing Delete a Customer
// method: delete
// URL: http://25.13.241.170:4309/customer
// body: raw JSON
// {
//    "Customer_ID": "4"
// }
// {
//    "Customer_ID": "5"
// }

// Delete data of customers
router.delete('/customer', function (req, res) {
    console.log(`request at ${req.url}`);
    let customer_id = req.body.Customer_ID;  // <= This format (CustomerID)
    if (!customer_id) {
        return res.status(400).send({ error: true, message: 'Please provide CustomerID' });
    }
    dbConnection.query('DELETE FROM customer WHERE Customer_id = ?', [customer_id], function (error, results)
    {
    if (error) throw error;
        // return res.send({ error: false, data: results.affectedRows, message: 'Customer has been deleted successfully.' });
        return res.send(results);
    });
});

// Testing Update a Customer
// method: put
// URL: http://25.13.241.170:4309/customer
// body: raw JSON
// {
//     "customer":
//     {
//         "Customer_ID": "4",
//         "Title": "Miss",
//         "Firstname": "Elsa",
//         "Lastname": "Arendelle",
//         "Phone": "0814567892",
//         "Email": "elsa@gmail.com",
//         "Date_Of_Birth": "2000-07-23"
//     }
// }
// {
//     "customer":
//     {
//         "Customer_ID": "5",
//         "Title": "Mr",
//         "Firstname": "Euro",
//         "Lastname": "Smith",
//         "Phone": "0956312578",
//         "Email": "euro@gmail.com",
//         "Date_Of_Birth": "1998-04-12"
//     }
// }

// Update data of customers
router.put('/customer', function (req, res) {
    console.log(`request at ${req.url}`);
    let customer_id = req.body.customer.Customer_ID; // <= This format (customerID)
    let customer = req.body.customer;
    if (!customer_id || !customer) 
    {
        return res.status(400).send({ error: customer, message: 'Please provide customer information' });
    }
    dbConnection.query("UPDATE customer SET ? WHERE Customer_ID = ?", [customer, customer_id], function (error,results) 
    {
        if (error) throw error;
        // return res.send({error: false, data: results.affectedRows, message: 'Customers has been updated successfully.'})
        return res.send(results);
    });
});

// Testing Insert a Customer
// method: post
// URL: http://25.13.241.170:4309/customer
// body: raw JSON
// {
//     "customer":
//     {
//         "Customer_ID": "4",
//         "Title": "Miss",
//         "Firstname": "Wimonrat",
//         "Lastname": "Teerawongpairoj",
//         "Phone": "0870790053",
//         "Email": "wimonrat@gmail.com",
//         "Date_Of_Birth": "1965-05-02"
//     }
// }
// {
//     "customer":
//     {
//         "Customer_ID": "5",
//         "Title": "Miss",
//         "Firstname": "Jeno",
//         "Lastname": "Lee",
//         "Phone": "0960254154",
//         "Email": "jeno@gmail.com",
//         "Date_Of_Birth": "1998-03-12"
//     }
// }

// Insert data of customers
router.post('/customer', function (req, res) {
    console.log(`request at ${req.url}`);
    let customer = req.body.customer;
    console.log(customer);
    if (!customer) {
        return res.status(400).send({ error: true, message: 'Please provide customer information' });
    }
    dbConnection.query("INSERT INTO customer SET ? ", customer, function (error, results) {
    if (error) throw error;
        // return res.send({error: false, data: results.affectedRows, message: 'New customer has been created successfully.'});
        return res.send(results);
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////// Employees ///////////////////////////////////////////////

// Testing Get all Employee
// method: get
// URL: http://25.13.241.170:4309/employee

// Select all employees
router.get('/employee', function (req, res) {
    console.log(`request at ${req.url}`);

    dbConnection.query(`select * from employee`, 
    function (error, results) {
        if(error) throw error;
        return res.send({ 'status': true, 'employee': results, 'message': 'retrieved all products' });
    });
});

// Testing Get all Employee
// method: get
// URL: http://25.13.241.170:4309/employee/0
// URL: http://25.13.241.170:4309/employee/1

// Select a employee
router.get('/employee/:id', function (req, res) {
    console.log(`request at ${req.url}`);
    let employee_id = req.params.id;
    if (!employee_id) {
        return res.status(400).send({ error: true, message: 'Please provide Employee_ID.' });
    }
    dbConnection.query('SELECT * FROM employee WHERE Employee_ID =?', employee_id, function (error, results) {
    if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Employee retrieved' });
    });
});

// Testing Delete Employee
// method: delete
// URL: http://25.13.241.170:4309/employee
// body: raw JSON
// {
//      "Employee_ID": "0"
// }
// {
//      "Employee_ID": "1"
// }

// Delete data of employees
router.delete('/employee', function (req, res) {
    console.log(`request at ${req.url}`);
    let employee_id = req.body.Employee_ID;
    if (!employee_id) {
        return res.status(400).send({ error: true, message: 'Please provide Employee_ID' });
    }
    dbConnection.query("DELETE FROM employee WHERE Employee_ID = ?", [employee_id], function (error, results)
    {
    if (error) throw error;
        return res.send({ error: false, data: results.affectedRows, message: 'Employee has been deleted successfully.' });
    });
});

// Testing Update Employee
// method: put
// URL: http://25.13.241.170:4309/employee
// Update data of employees
// body: raw JSON
// {
//     "Employee":
//     {
//         "Employee_ID": "0",
//         "Title": "Mr",
//         "Firstname": "Olaf",
//         "Lastname": "Arendelle",
//         "Phone": "0987456452",
//         "Email": "olaf@gmail.com",
//         "Date_Of_Birth": "1997-03-14"
//     }
// }
// {
//     "Employee":
//     {
//         "Employee_ID": "1",
//         "Title": "Miss",
//         "Firstname": "Peter",
//         "Lastname": "Parker",
//         "Phone": "0962623267",
//         "Email": "peter_park@gmail.com",
//         "Date_Of_Birth": "1999-02-20"
//     }   
// }

// Update data of employees
router.put('/employee', function (req, res) {
    console.log(`request at ${req.url}`);
    let employee_id = req.body.Employee.Employee_ID; // <= This format (employeetID)
    let employee = req.body.Employee;
    if (!employee_id || !employee) 
    {
        return res.status(400).send({ error: employee, message: 'Please provide employee information' });
    }
    dbConnection.query("UPDATE employee SET ? WHERE Employee_ID = ?", [employee, employee_id], function (error,results) 
    {
        if (error) throw error;
        return res.send({error: false, data: results.affectedRows, message: 'Employees has been updated successfully.'})
    });
});
// Testing Insert Employee
// method: post
// URL: http://25.13.241.170:4309/employee
// body: raw JSON
// {
//     "Employee":
//         {
//             "Employee_ID": "0",
//             "Title": "Miss",
//             "Firstname": "Anna",
//             "Lastname": "Arendelle",
//             "Phone": "0817425478",
//             "Email": "anna@gmail.com",
//             "Date_Of_Birth": "2001-12-25"
//         }
// }
// {
//     "Employee":
//     {
//         "Employee_ID": "1",
//         "Title": "Mr",
//         "Firstname": "Jay",
//         "Lastname": "Park",
//         "Phone": "0916737951",
//         "Email": "jay@gmail.com",
//         "Date_Of_Birth": "1987-01-12"
//     }   
// }

// Insert data of employees
router.post('/employee', function (req, res) {
    console.log(`request at ${req.url}`);
    let employee = req.body.Employee;
    console.log(employee);
    if (!employee) {
        return res.status(400).send({ error: true, message: 'Please provide employee information' });
    }
    dbConnection.query("INSERT INTO Employee SET ? ", employee, function (error, results) {
    if (error) throw error;
        return res.send({error: false, data: results.affectedRows, message: 'New employee has been created successfully.'});
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////// Products ////////////////////////////////////////////////

// Testing Select all Products
// method: get
// URL: http://25.13.241.170:4309/product

// Select all products
router.get('/product', function (req, res) {
    console.log(`request at ${req.url}`);

    dbConnection.query(`select * from product`, 
    function (error, results) {
        if(error) throw error;
        return res.send(results);
    });
});

// Testing Select Product
// method: get
// URL: http://25.13.241.170:4309/product/8891491947194
// URL: http://25.13.241.170:4309/product/8851351151253

// Search a product by ID
router.get('/product/:id',cors(),function (req, res) {
    console.log(`request at ${req.url}`);
    let product_id = req.params.id;
    if (!product_id) {
        return res.status(400).send({ error: true, message: 'Please provide Product_ID.' });
    }
    dbConnection.query('SELECT * FROM product WHERE Product_ID = ?', product_id, function (error, results) {
        if (error) throw error;
        return res.send(results);
    });
});

// Testing Delete Product
// method: delete
// URL: http://25.13.241.170:4309/product
// body: raw JSON
// {
//    "Product_ID": "8869454507152"
// }
// {
//    "Product_ID": "8897651254234"
// }

// Delete data of products
router.delete('/product', function (req, res) {
    console.log(`request at ${req.url}`);
    let product_id = req.body.Product_ID;
    if (!product_id) {
        return res.status(400).send({ error: true, message: 'Please provide Product_ID' });
    }
    dbConnection.query("DELETE FROM Product WHERE Product_ID = ?", [product_id], function (error, results)
    {
    if (error) throw error;
        return res.send({ error: false, data: results.affectedRows, message: 'Product has been deleted successfully.' });
    });
});

// Testing Update Product
// method: put
// URL: http://25.13.241.170:4309/product
// Update data of Product
// body: raw JSON
// {
//    "Product":
//    {
//        "Product_ID": "8891491947194",
//        "Name_Of_Product": "TARO Fish Snack",
//        "Member_Point": 5,
//        "Price": 50,
//        "Product_Type": "snack",
//        "Information": "Update the taste!",
//        "Img": "https://imgkub.com/images/2022/03/23/taro-removebg-preview-removebg-preview.png"
//    }
// }
// {
//    "Product":
//    {
//        "Product_ID": "8869454507152",
//        "Name_Of_Product": "Roller Coaster",
//        "Member_Point": 10,
//        "Price": 100,
//        "Product_Type": "snack",
//        "Information": "Update the taste!",
//        "Img": "https://imgkub.com/images/2022/03/23/roller_coster-removebg-preview8d0345e492ee62fe.png"
//    }
// }

// Update data of product
router.put('/product', function (req, res) {
    console.log(`request at ${req.url}`);
    let product_id = req.body.Product.Product_ID; // <= This format (productID)
    let product = req.body.Product;
    if (!product_id || !product) 
    {
        return res.status(400).send({ error: product, message: 'Please provide product information' });
    }
    dbConnection.query("UPDATE product SET ? WHERE Product_ID = ?", [product, product_id], function (error,results) 
    {
        if (error) throw error;
        return res.send({error: false, data: results.affectedRows, message: 'Products has been updated successfully.'})
    });
});

// Testing Insert Product
// method: post
// URL: http://25.13.241.170:4309/product
// body: raw JSON
// {
//    "Product":
//    {
//        "Product_ID": "8891491947195",
//        "Name_Of_Product": "TARO Fish Snack v.2",
//        "Member_Point": 6,
//        "Price": 60,
//        "Product_Type": "snack",
//        "Information": "Long Long Long fish ago",
//        "Img": "https://imgkub.com/images/2022/03/23/taro-removebg-preview-removebg-preview.png"
//    }
// }
// {
//    "Product":
//    {
//        "Product_ID": "8869454507153",
//        "Name_Of_Product": "Roller Coaster v.2",
//        "Member_Point": 11,
//        "Price": 110,
//        "Product_Type": "snack",
//        "Information": "Really tasty!!!",
//        "Img": "https://imgkub.com/images/2022/03/23/roller_coster-removebg-preview8d0345e492ee62fe.png"
//    }
// }

// Insert data of products
router.post('/product', function (req, res) {
    // res.json({msg: 'This is CORS-enabled for a single Route'})
    console.log(`request at ${req.url}`);
    let product = req.body.Product;
    console.log(product);
    if (!product) {
        return res.status(400).send({ error: true, message: 'Please provide product information' });
    }
    dbConnection.query("INSERT INTO Product SET ? ", product, function (error, results) {
    if (error) throw error;
        return res.send({error: false, data: results.affectedRows, message: 'New product has been created successfully.'});
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////// Account ///////////////////////////////////////////////////

// Testing Select all Accounts
// method: get
// URL: http://25.13.241.170:4309/account

// Select all account
router.get('/account', function (req, res) {
    console.log(`request at ${req.url}`);

    dbConnection.query(`select * from account`, 
    function (error, results) {
        if(error) throw error;
        return res.send({ 'status': true, 'account': results, 'message': 'retrieved all accounts' });
    });
});

// Testing Select a Account
// method: get
// URL1: http://25.13.241.170:4309/account/id=115342
// URL2: http://25.13.241.170:4309/account/id=178001

// Search a account by ID
router.get('/account/id=:id', function (req, res) {
    console.log(`request at ${req.url}`);
    let customer_id = req.params.id;
    if (!customer_id) {
        return res.status(400).send({ error: true, message: 'Please provide customer_ID.' });
    }
    dbConnection.query('SELECT * FROM account WHERE Customer_ID = ?', customer_id, function (error, results) {
    if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Account ID retrieved' });
    });
});

// Testing Delete a Account
// method: get
// URL: http://25.13.241.170:4309/account
// body: raw JSON
// {
//     "Customer_ID": "4"
// }
// {
//     "Customer_ID": "5"
// }

// Delete data of accounts
router.delete('/account', function (req, res) {
    console.log(`request at ${req.url}`);
    let customer_id = req.body.Customer_ID;
    if (!customer_id) {
        return res.status(400).send({ error: true, message: 'Please provide Customer_ID' });
    }
    
    dbConnection.query("DELETE FROM account WHERE customer_ID = ?", [customer_id], function (error, results)
    {
    if (error) throw error;
        return res.send({ error: false, data: results.affectedRows, message: 'Account has been deleted successfully.' });
    });
});

// Testing Insert a Account
// method: post
// URL: http://25.13.241.170:4309/account
// body: raw JSON
// {
//     "Account":
//     {
//         "Username": "test01",
//         "Customer_ID": "4",
//         "User_Password": "BsTD2hgH",
//         "User_Role": "user"
//     }
// }
// {
//     "Account":
//     {
//         "Username": "Adam",
//         "Customer_ID": "5",
//         "User_Password": "H2jadY5p",
//         "User_Role": "admin"
//     }
// }

// Insert data of accounts
router.post('/account', function (req, res) {
    console.log(`request at ${req.url}`);
    let account = req.body.Account;
    if (!account) {
        return res.status(400).send({ error: true, message: 'Please provide account information' });
    }
    dbConnection.query("INSERT INTO Account SET ? ", account, function (error, results) {
    if (error) throw error;
        return res.send({error: false, data: results.affectedRows, message: 'New account has been created successfully.'});
    });
});

// Testing Update a Account
// method: put
// URL: http://25.13.241.170:4309/account
// body: raw JSON
// {
//     "Account":
//     {
//         "Username": "Bob",
//         "Customer_ID": "4",
//         "User_Password": "G2hju8po",
//         "User_Role": "user"
//     }
// }
// {
//     "Account":
//     {
//         "Username": "Alex",
//         "Customer_ID": "5",
//         "User_Password": "Ayu57pos",
//         "User_Role": "admin"
//     }
// }

// Update data of accounts
router.put('/account', function (req, res) {
    console.log(`request at ${req.url}`);
    let customer_id = req.body.Account.Customer_ID; 
    let account = req.body.Account;
    if (!customer_id || !account) 
    {
        return res.status(400).send({ error: account, message: 'Please provide account information' });
    }
    dbConnection.query("UPDATE Account SET ? WHERE Customer_ID = ?", [account, customer_id], function (error,results) 
    {
        if (error) throw error;
        return res.send({error: false, data: results.affectedRows, message: 'Accounts has been updated successfully.'})
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////// Login /////////////////////////////////////////////////
router.get('/home', cookieJwtAuth, (req, res) => {
    console.log(`request at ${req.url}`);
    res.send('login successfully\n' + 'username: ' + req.user.username + '\nrole: ' + req.user.role);
});

router.get('/login', (req, res) => {
    console.log(`request at ${req.url}`);
    res.sendFile(path.join(__dirname, './src/signin.html'));
});

router.post('/login-submit', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    dbConnection.query(`
    select customer_id, username, user_password, user_role from account where username = ?
    `,username,
    (err, result) => {
        if(err) throw err;
        
        const port = 5309; // port to determine whether a route would go to the WS route or REACT route. (WS - 4309 | REACT - 5309)
        const route = `http://localhost:${port}`
        
        if(result.length == 0) {
            res.redirect(route + '/login');
        } else {
            if(password == result[0].user_password) {
                const user = {
                    id: result[0].customer_id, 
                    username: result[0].username, 
                    role: result[0].user_role
                }
                const jwtToken = generateAccessToken(user);
                res.cookie('jwtToken', jwtToken);
                res.redirect(route + '/');
            } else {
                res.redirect(route + '/login');
            }
        }
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router;