# SatyamModule

ROUTES
userController - completed

| Verb     | URL                                         | Function                                   |
| :------- |:--------------------------------------------| :------------------------------------------|
| `GET`    | users/                                      | Get all users                              |
| `GET`    | users/:email/                               | Get a user by email                        |
| `POST`   | users/                                      | Add a user                                 |
| `POST`   | users/login/                                | user login                                 |
| `PUT`    | users/updatepassword/:email/                | update user password                       |
| `PUT`    | users/updaterole/:email/                    | update user role (isadmin - true/false)    |
| `DELETE` | users/remove/:email/                        | delete user                                |

customerController - completed

| Verb     | URL                                                         | Function                         |
| :------- |:------------------------------------------------------------| :--------------------------------|
| `GET`    | customers/                                                  | Get all customers                |
| `GET`    | customers/:email/                                           | Get a customer by email          |
| `GET`    | customers/:firstname/                                       | Get a customer by firstname      |
| `GET`    | customers/:lastname/                                        | Get a customer by lastname       |
| `GET`    | customers/:nationality/                                     | Get a customer by nationality    |
| `POST`   | customers/                                                  | Add a customer                   |
| `PATCH`  | customers/addbooking/:email/                                | Add booking to a customer        |
| `PATCH`  | customers/addpassenger/:email/:bookingnumber                | Add passenger to a booking       |
| `DELETE` | customers/remove/:email/                                    | delete whole customer            |
| `PATCH`  | customers/update/:email/                                    | Update a customer                |
| `PATCH`  | customers/addpayment/:email/:bookingnumber                  | Add payment to a booking         |
| `PATCH`  | customers/updatebooking/:email/:bookingnumber/              | Update booking of a customer     |
| `PATCH`  | customers/removebooking/:email/:bookingnumber               | delete booking of a customer     |
| `PATCH`  | customers/removepayment/:email/:bookingnumber/:paymentid    | delete booking of a customer     |
| `PATCH`  | customers/removepassenger/:email/:bookingnumber/:passengerid| delete a passenger from a booking|

customerController - on progress

| Verb     | URL                                                | Function                                  |
| :------- |:---------------------------------------------------| :-----------------------------------------|
| `PUT`    | customers/updatepayment/:email/:bookingnumber/:invoiceno | update payment                      |




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
