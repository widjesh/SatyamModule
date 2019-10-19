const mongoose = require("mongoose");
var customer = mongoose.model("customer", {
  customernumber: { type: String },
  title: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  dob: { type: Date },
  nationality: { type: String },
  contact: {
    mobilenumber: { type: String },
    sms_sr: { type: String },
    sms_nl: { type: String },
    email: { type: String }
  },
  address: {
    zip: { type: Number },
    city: { type: String },
    street: { type: String },
    country: { type: String }
  },
  passport: {
    passportno: { type: String },
    expirationdate: { type: Date }
  },
  bookings: [
    {
      number: { type: String },
      date: { type: Date },
      description: { type: String },
      price: {
        currency: { type: String },
        ticket: { type: Number },
        insurance: { type: Number },
        visa: { type: Number },
        other: { type: Number },
        discount: { type: Number }
      },
      passengers: { type: Object },
      payments: [
        {
          invoiceno: { type: String },
          amount: { type: Number },
          date: { type: Date },
          type: { type: String }
        }
      ]
    }
  ],
  modifiedby: {
    user: { type: Object },
    date: { type: Date, default: Date.now }
  }
});

module.exports = customer;
