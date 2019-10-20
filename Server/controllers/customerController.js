const router = require("express").Router();
var ObjectId = require("mongoose").Types.ObjectId;
var Customer = require("../models/customer");

router.get("/", async (req, res) => {
    try {
        const customers = await Customer.find();
        if (!customers) {
            res.json({ message: "Customers Not Found" });
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
            res.json({ message: `No customer with first name '${req.params.firstname}' found` });
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
            res.json({ message: `No customer with last name '${req.params.lastname}' found` });
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
            res.json({ message: `No customer with '${req.params.nationality}' nationality found` });
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
            res.json({ message: `No customer with email address '${req.params.email}' found` });
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
            res.json({ message: 'Customer Cannot be Saved' });
        } else {
            res.send(newCustomer);
        }
    } catch (err) {
        res.send({ Error: err });
    }
});

router.patch("/update/:email", async (req, res) => {
    try {
        const updatedcustomer = await Customer.updateOne({ 'contact.email': req.params.email }, {
            $set: {
                title: req.body.title,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                dob: req.body.dob,
                nationality: req.body.nationality,
                'contact.mobilenumber': req.body.mobilenumber,
                'contact.sms_sr': req.body.sms_sr,
                'contact.sms_nl': req.body.sms_sr,
                'contact.email': req.body.email,
                'address.zip': req.body.zip,
                'address.city': req.body.city,
                'address.street': req.body.street,
                'address.country': req.body.country,
                'passport.passportno': req.body.passportno,
                'passport.expirationdate': req.body.expirationdate,
            }
        }, { upsert: true });

        if (!updatedcustomer) {
            res.json({ message: `Customer ${req.params.email} did not update` });
        } else {
            res.send(`Customer ${req.params.email} updated`);
        }
    } catch (err) {
        res.send({ Error: err });
    }
});

router.put('/addbooking/:email', async (req, res) => {
    const newbooking = {
        number: req.body.bookingnumber,
        date: req.body.date1,
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
                invoiceno: new ObjectId(),
                amount: req.body.amount,
                date: req.body.date2,
                type: req.body.type
            }
        ]
    }

    try {
        const customer = await Customer.update({ 'contact.email': req.params.email }, { $push: { bookings: newbooking } })
        if (!customer) {
            res.json({ message: `Customer ${req.params.email} not found - Booking not added` })
        } else {
            res.send(`Booking added to cutomer id ${req.params.email}`)
        }
    } catch (err) {
        res.send({ Error: err });
    }

});

router.patch("/updatebooking/:email/:bookingnumber", async (req, res) => {
    try {
        const updatedcustomer = await Customer.updateOne({ 'contact.email': req.params.email, 'bookings.number': req.params.bookingnumber }, {
            $set: {
                'bookings.$.price.currency': req.body.currency,
                'bookings.$.price.ticket': req.body.ticket,
                'bookings.$.price.insurance': req.body.insurance,
                'bookings.$.price.visa': req.body.visa,
                'bookings.$.price.other': req.body.other,
                'bookings.$.price.discount': req.body.discount,
                'bookings.$.description': req.body.description
            }
        }, { upsert: true });

        if (!updatedcustomer) {
            res.json({ message: `Booking ${req.params.bookingnumber} did not update` });
        } else {
            res.send(`Booking ${req.params.bookingnumber} of customer id ${req.params.email} updated`);
        }
    } catch (err) {
        res.send({ Error: err });
    }
});

router.patch('/addpayment/:email/:bookingnumber', async (req, res) => {
    const newpayment = {
        invoiceno: req.body.invoiceno,
        amount: req.body.amount,
        date: req.body.date,
        type: req.body.type
    }
    try {
        const customer = await Customer.updateOne({ 'contact.email': req.params.email, 'bookings.number': req.params.bookingnumber }, { $push: { 'bookings.$.payments': newpayment } })
        if (!customer) {
            res.json({ message: `Customer ${req.params.email} not found - Payment not added` })
        } else {
            res.send(`Payment added to cutomer id ${req.params.email}`)
        }
    } catch (err) {
        res.send({ Error: err });
    }

});

// router.patch("/updatepayment/:email/:bookingnumber/:invoiceno", async (req, res) => {
//     try {
//         const updatedcustomer = await Customer.updateOne({ 'contact.email': req.params.email, 'bookings.number': req.params.bookingnumber }, {
//             $set: {
//                 'bookings.$.payments.1.amount': req.body.amount,
//                 'bookings.$.payments.1.date': req.body.date,
//                 'bookings.$.payments.1.type': req.body.type
//             }
//         }, { upsert: true });

//         if (!updatedcustomer) {
//             res.json({ message: `Invoice no ${req.params.invoiceno} did not update` });
//         } else {
//             res.send(`Invoice no ${req.params.invoiceno} of customer id ${req.params.email} updated`);
//         }
//     } catch (err) {
//         res.send({ Error: err });
//     }
// });

router.put('/addpassenger/:email/:bookingnumber', async (req, res) => {
    const newPassenger = req.body.passenger
    try {
        const customer = await Customer.update({ 'contact.email': req.params.email, 'bookings.number': req.params.bookingnumber }, { $push: { 'bookings.$.passengers': newPassenger } })
        if (!customer) {
            res.json({ message: `Either Customer ${req.params.email} or Booking ${req.params.bookingnumber} not found / Passenger not added` })
        } else {
            res.send(`Passenger added to ${req.params.email} booking number ${req.params.bookingnumber}`)
        }
    } catch (err) {
        res.send({ Error: err });
    }
})

router.delete("/remove/:email", async (req, res) => {
    try {
        const customer = await Customer.deleteOne({ 'contact.email': req.params.email })
        if (customer) res.send(`Customer ${customer.email} successfully removed`)
        else res.json({ message: `Remove Unseccesful` })
    } catch (err) {
        res.send({ Error: err });
    }
})

// router.patch("/removebooking/:email/:bookingnumber", async (req, res) => {
//     try {
//         const customer = await Customer.updateOne({ 'contact.email': req.params.email, 'bookings.number': req.params.bookingnumber }, {
//             $pull: { bookings: 'bookings.$' }
//         });
//         if (customer) res.send(`Booking ${req.params.bookingnumber} successfully removed`)
//         else res.json({ message: `Remove Unseccesful` })
//     } catch (err) {
//         res.send({ Error: err });
//     }
// })

module.exports = router;
