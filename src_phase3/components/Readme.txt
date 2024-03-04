- Read Me -
Web Project Phase 3 Group 9

Our team members
    1. 6388063	Nuttapat	Sumransilp
    2. 6388113	Poomrapee	Wareeboutr
    3. 6388133	Pitchaya	Teerawongpairoj
    4. 6388196	Sasima	    Srijanya

- Changed Things In Phase 2 -
    For phase 3 we add lines 629, 630, in routing.js in phase 2 which is port 4309 is for phase 2(web service) and phase 3 (react)
    
    For phase 3 we have had to change line 643 in routing.js in phase 2. If you already sign in, it will automatically link to the Home page.
We change at line 643 from res.redirect('/home'); to res.redirect(route + '/');

    For phase 3 we have changed lines 34-162 about the way of returning the data from customers in routing.js of phase 2.

    For phase 3 we have added lines 32-39 in project_service.js of phase 2 to use the CORS policy and allow a new react path to be able to use 
the web service in phase 2.

    For phase 3 we have added lines 122-156 in project_service.js of phase 2 for the search criteria, such as search by product name, user first name,
and user title.

    For phase 3 we have created a new info_template.ejs of phase 2 and use that to be our template for the user insight information.
    
Task 1: Develop your Web Application for Administrators
- Description and Detail -
    We use React to design web applications including Home Page, Login Page, Page for managing products, and Page for managing users which is our API from phase 2.
        1. For Login Page we continue from phase 2 which is authentication. We set that if your username and password have information in the database, it will automatically
           go to the Home page and the user can access another page.
        2. For the home page is the main page place where you can see our current promotion, the account information of the user from the database, and all of the output history
           that you have done in the admin panel.
        3. For the page for managing products and users we continue from phase 2 which is to update, delete, insert, select, and select all in the database by using Postman. In phase 3 you can 
           update, delete, insert, select, and select all and the output will you below the admin panel. For a product, you can click on the product's image for more detail about that product. 
           For users you can at "Provide more information" to see more information about that user.

How to run the program in task 1
    1. Start the program by typing "npm start"
    2. Then it will link to our home page and tell the user to log in first. Otherwise, the user cannot access another page. 
    3. After the user has already login, it will redirect to our home page.
    4. Then you can now finally see all of the pages.




