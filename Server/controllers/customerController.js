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

router.get("/findbycustomernumber/:customernumber", async (req, res) => {
    try {
        const customer = await Customer.findOne({ customernumber: req.params.customernumber });
        if (!customer) {
            res.json({ message: `No customer with customernumber '${req.params.customernumber}' found` });
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
            res.json({ message: 'Customer not Added' });
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

        if (updatedcustomer.n === 0) res.json({ message: `Customer ${req.params.email} not found` });
        else if (updatedcustomer.nModified === 0) res.send(`Customer ${req.params.email} updated with no change`);
        else res.json(`Customer ${req.params.email} updated`);

    } catch (err) {
        res.json({ Error: err });
    }
});

router.patch('/addbooking/:email', async (req, res) => {
    const newbooking = {
        number: new ObjectId(),
        description: req.body.description,
        price: {
            currency: req.body.currency,
            ticket: req.body.ticket,
            insurance: req.body.insurance,
            visa: req.body.visa,
            other: req.body.other,
            discount: req.body.discount
        }
    }

    try {
        const customer = await Customer.update({ 'contact.email': req.params.email }, { $push: { bookings: newbooking } })
        if (customer.nModified === 0) res.json({ message: `Customer ${req.params.email} not found - Booking not added` })
        else res.send(`Booking added to cutomer id ${req.params.email}`)
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
        });

        if (updatedcustomer.n === 0) res.json({ message: `Customer ${req.params.email} and/or Booking ${req.params.bookingnumber} not found` });
        else if (updatedcustomer.nModified === 0) res.send(`Booking ${req.params.bookingnumber} of customer id ${req.params.email} updated with no change`);
        else res.send(`Booking ${req.params.bookingnumber} of customer id ${req.params.email} updated`);

    } catch (err) {
        res.send({ Error: err });
    }
});

router.patch('/addpayment/:email/:bookingnumber', async (req, res) => {
    const newpayment = {
        invoiceno: new ObjectId(),
        amount: req.body.amount,
        type: req.body.type
    }
    try {
        const updatedcustomer = await Customer.updateOne({ 'contact.email': req.params.email, 'bookings.number': req.params.bookingnumber }, { $push: { 'bookings.$.payments': newpayment } })
        if (updatedcustomer.n === 0) res.json({ message: `Customer ${req.params.email} not found - Payment not added` });
        else res.send(`Payment added to cutomer id ${req.params.email}`);

    } catch (err) {
        res.send({ Error: err });
    }

});

router.patch("/updatepayment/:email/:bookingnumber/:invoiceno", async (req, res) => {
    const bid = req.params.bookingnumber
    const pid = req.params.invoiceno
    try {
        const updatedcustomer = await Customer.updateOne(
            {
                'contacts.email': req.body.email,
                'bookings.number': bid,
                bookings: { $elemMatch: { 'payment.invoiceno': pid } }
                // 'bookings.payments': { $elemMatch: { invoiceno: req.body.invoiceno } }
                // 'bookings': {
                //     '$elemMatch': {
                //         pid: bid, "payments.invoiceno": pid
                //     }
                // }
            },
            {
                $set: {
                    'bookings.$[outer].payments.$[inner].amount': req.body.amount,
                    'bookings.$[outer].payments.$[inner].date': req.body.date,
                    'bookings.$[outer].payments.$[inner].type': req.body.type
                }
            }, { arrayFilters: [{ 'outer.number': bid }, { 'inner.invoiceno': pid }] });
        if (!updatedcustomer) {
            res.json({ message: `Invoice no ${req.params.invoiceno} did not update` });
        } else {
            res.send(updatedcustomer);//`Invoice no ${req.params.invoiceno} of customer id ${req.params.email} updated`
        }
    } catch (err) {
        res.send({ Error: err });
    }
});


router.patch('/addpassenger/:email/:bookingnumber', async (req, res) => {
    const newPassenger = {
        passengerno: new ObjectId(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        dob: req.body.dob,
        passportno: req.body.passportno,
        passportexpiry: req.body.passportexpiry
    }
    try {
        const updatedcustomer = await Customer.update({ 'contact.email': req.params.email, 'bookings.number': req.params.bookingnumber }, { $push: { 'bookings.$.passengers': newPassenger } })
        if (updatedcustomer.n === 0) res.json({ message: `Either Customer ${req.params.email} or Booking ${req.params.bookingnumber} not found / Passenger not added` });
        else res.send(`Passenger added to ${req.params.email} booking number ${req.params.bookingnumber}`);
    } catch (err) {
        res.send({ Error: err });
    }
})

router.delete("/remove/:email", async (req, res) => {
    try {
        const deletedcustomer = await Customer.deleteOne({ 'contact.email': req.params.email })
        if (deletedcustomer.n === 0) res.json({ message: `Customer ${req.params.email} not found` })
        else res.send(`Customer ${req.params.email} successfully removed`);//

    } catch (err) {
        res.send({ Error: err });
    }
})

router.patch("/removebooking/:email/:bookingnumber", async (req, res) => {
    try {
        const customer = await Customer.updateOne({ 'contact.email': req.params.email }, {
            $pull: { bookings: { number: req.params.bookingnumber } }
        });
        if (customer.nModified === 1) res.send(`Booking ${req.params.bookingnumber} successfully removed`)
        else if (customer.nModified === 0) res.send(`Either Customer ${req.params.email} or Booking ${req.params.bookingnumber} not found / No booking Removed`)
        else res.json({ message: `Remove Unseccesful` })
    } catch (err) {
        res.send({ Error: err });
    }
})

router.patch("/removepayment/:email/:bookingnumber/:invoiceno", async (req, res) => {
    try {
        const customer = await Customer.updateOne({ 'contact.email': req.params.email, 'bookings.number': req.params.bookingnumber }, {
            $pull: { 'bookings.$.payments': { invoiceno: req.params.invoiceno } }
        });
        if (customer.nModified === 1) res.send(`Payment ${req.params.invoiceno} successfully removed`)
        else if (customer.nModified === 0) res.send(`Either Customer ${req.params.email} or Booking ${req.params.bookingnumber} or Payment ${req.params.invoiceno} not found / No payment Removed`)
        else res.json({ message: `Remove Unseccesful` })
    } catch (err) {
        res.send({ Error: err });
    }
})

router.patch("/removepassenger/:email/:bookingnumber/:passengerno", async (req, res) => {
    try {
        const customer = await Customer.updateOne({ 'contact.email': req.params.email, 'bookings.number': req.params.bookingnumber }, {
            $pull: { 'bookings.$.passengers': { passengerno: req.params.passengerno } }
        });

        if (customer.nModified === 1) res.send(`Passenger ${req.params.passengerno} successfully removed`)
        else if (customer.nModified === 0) res.send(`Either Customer ${req.params.email} or Booking ${req.params.bookingnumber} or Passenger ${req.params.passengerno} not found / No Passenger Removed`)
        else res.json({ message: `Remove Unseccesful` })

    } catch (err) {
        res.send({ Error: err });
    }
})

module.exports = router;
