# SatyamModule

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
    PUT     customers/addpassenger/:email/:bookingnumber----add passenger to a booking of a customer
    DELETE  customers/remove/:email/-----------------delete whole customer

| Tables        | VERB           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | `right-aligned` | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

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
