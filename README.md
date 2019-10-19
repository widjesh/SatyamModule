# SatyamModule
<<<<<<< HEAD

ROUTES
userController
    GET     users/--------------------------get all users
    GET     users/:email/-------------------get a user by email
    POST    users/--------------------------add a user
    POST    users/login/--------------------user login
    PUT     users/updatepassword/:email/----update user password
    PUT     users/updaterole/:email/--------update user role (isadmin - true/false)
    DELETE  users/remove/:email/------------delete user

customerController
    GET     customers/-------------------------------get all customers
    GET     customers/:email/------------------------get a customer by email
    GET     customers/:firstname/--------------------get a customer by firstname
    GET     customers/:lastname/---------------------get a customer by lastname
    GET     customers/:nationality/------------------get a customer by nationality
    PUT     customers/addbooking/:email/-------------add booking to a customer
    PUT     customers/addpassenger/:email/:number----add passenger to a booking of a customer
    DELETE  customers/remove/:email/-----------------delete whole customer


=======
User Cases : (Admin)
- Register a user
- Update a user
- Delete a user
- Get all User

Users : 
- Register a Customer
- Search a Customer
- Update a Customer
- Delete a Customer
- Add a booking to the customer
- Add a payment to the customer
- Update the booking 
- Update the payment
>>>>>>> 9e9b83e86f2c499ac7ee38ca7655871207633562
