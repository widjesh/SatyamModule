// const ObjectID = require('mongodb').ObjectID;
export class Customer {
  // _id: ObjectID.;
  customernumber: string;
  title: string;
  firstname: string;
  lastname: string;
  dob: Date;
  profilepicture: string;
  nationality: string;
  contact: Contact;
  address: Address;
  passport: Passport;
  bookings: Booking[];
  modifiedby: Modifiedby;


  constructor(customer: Customer) {
    this.firstname = customer.firstname || "";
    this.lastname = customer.lastname || "";
    this.customernumber = customer.customernumber || "";
    this.title = customer.title || "";
    this.profilepicture =
      customer.profilepicture || "assets/images/avatars/profile.jpg";
    this.nationality = customer.nationality || "";
    this.contact = customer.contact || new Contact();
    this.address = customer.address || new Address();
    this.passport = customer.passport || new Passport();
    this.bookings = customer.bookings || [];
    this.modifiedby = customer.modifiedby || new Modifiedby();
  }
}

class Payment {
  invoiceno: string;
  amount: Number;
  dateofpayement: Date;
  type: string;
}

export class Contact {
  mobilenumber: string;
  sms_sr: string;
  sms_nl: string;
  email: string;
}

export class Passport {
  passportno: string;
  expirationdate: Date;
}
export class Address {
  zip: Number;
  city: string;
  street: string;
  country: string;
};
export class Booking {
  number: string;
  date: Date;
  description: string;
  price: {
    currency: string;
    ticket: Number;
    insurance: Number;
    visa: Number;
    other: Number;
    discount: Number;
  };

  passengers:
    {
      pfirstname: string;
      plastname: string;
      pdob: Date;
      ppassportnumber: string;
    }
  payments: Payment;
}

export class Modifiedby {
  user: Object;
  date: Date;
  default: Date;
};
