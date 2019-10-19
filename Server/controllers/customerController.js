const router = require("express").Router();
var ObjectId = require("mongoose").Types.ObjectId;
var Customer = require("../models/customer");

router.get("/", async (req, res) => {
    try {
        const customers = await Customer.find();
        if (!customers) {
            res.send("Customers Not Found");
        } else {
            res.send(customers);
        }
    } catch (err) {
        res.send({ Error: err });
    }
});

router.get("/findbyfirstname/:firstname", async (req, res) => {
    try {
        const customers = await Customer.find({ firstname: req.params.firstname });
        if (customers.length === 0) {
            res.send(`No customer with first name '${req.params.firstname}' found`);
        } else {
            res.send(customers);
        }
    } catch (err) {
        res.send({ Error: err });
    }
});

router.get("/findbylastname/:lastname", async (req, res) => {
    try {
        const customers = await Customer.find({ lastname: req.params.lastname });
        if (customers.length === 0) {
            res.send(`No customer with last name '${req.params.lastname}' found`);
        } else {
            res.send(customers);
        }
    } catch (err) {
        res.send({ Error: err });
    }
});

router.get("/findbynationality/:nationality", async (req, res) => {
    try {
        const customers = await Customer.find({ nationality: req.params.nationality });
        if (customers.length === 0) {
            res.send(`No customer with '${req.params.nationality}' nationality found`);
        } else {
            res.send(customers);
        }
    } catch (err) {
        res.send({ Error: err });
    }
});

router.get("/findbyemail/:email", async (req, res) => {
    try {
        const customer = await Customer.findOne({ 'contact.email': req.params.email });
        if (!customer) {
            res.send(`No customer with email address '${req.params.email}' found`);
        } else {
            res.send(customer);
        }
    } catch (err) {
        res.send({ Error: err });
    }
});

router.post("/", async (req, res) => {
    try {
        const customer = new Customer({
            customernumber: new ObjectId(),
            title: req.body.title,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            dob: req.body.dob,
            nationality: req.body.nationality,
            contact: {
                mobilenumber: req.body.mobilenumber,
                sms_sr: req.body.sms_sr,
                sms_nl: req.body.sms_sr,
                email: req.body.email
            },
            address: {
                zip: req.body.zip,
                city: req.body.city,
                street: req.body.street,
                country: req.body.country
            },
            passport: {
                passportno: req.body.passportno,
                expirationdate: req.body.expirationdate
            }
        });
        const newCustomer = await customer.save();
        if (!newCustomer) {
            res.send('Customer Cannot be Saved');
        } else {
            res.send(newCustomer);
        }
    } catch (err) {
        res.send({ Error: err });
    }
});

router.put('/addbooking/:email', async (req, res) => {
    const newbooking = {
        number: new ObjectId(),
        date: Date.now,
        description: req.body.description,
        price: {
            currency: req.body.currency,
            ticket: req.body.ticket,
            insurance: req.body.insurance,
            visa: req.body.visa,
            other: req.body.other,
            discount: req.body.discount
        },
        payments: [
            {
                invoiceno: { type: String },
                amount: { type: Number },
                date: { type: Date },
                type: { type: String }
            }
        ]
    }

    try {
        const customer = await Customer.update({ email: req.params.email }, { $push: { bookings: newbooking } })
        if (!customer) {
            res.send('Customer not found - Booking not added')
        } else {
            res.send(`Booking ref no ${customer.bookings.$.number} added to cutomer id ${customer.email}`)
        }
    } catch (err) {
        res.send({ Error: err });
    }

});

router.put('/addpassenger/:email/:bookingnumber', async (req, res) => {
    const newPassenger = req.body.newPassenger
    try {
        const customer = await Customer.update({ email: req.params.email, 'bookings.bookingnumber': req.params.number }, { $push: { 'bookings.$.passengers': newPassenger } })
        if (!customer) {
            res.send('Booking not found - Passenger not added')
        } else {
            res.send(`Booking ref no ${customer.bookings.$.number} added to cutomer id ${customer.email}`)
        }
    } catch (err) {
        res.send({ Error: err });
    }
})

router.delete("/remove/:email", async (req, res) => {
    try {
        const customer = await Customer.deleteOne({ 'contact.email': req.params.email })
        if (customer) res.send(`Customer ${customer.email} successfully removed`)
        else res.send('Remove Unseccesful')
    } catch (err) {
        res.send({ Error: err });
    }
})

module.exports = router;
