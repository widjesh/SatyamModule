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
    contact: {
        mobilenumber: string;
        sms_sr: string;
        sms_nl: string;
        email: string;
    };
    address: {
        zip: Number;
        city: string;
        street: string;
        country: string;
    };
    passport: {
        passportno: string;
        expirationdate: Date;
    };
    bookings: [
        {
            number: string;
            date: Date;
            description: string;
            price: {
                currency: string;
                ticket: Number;
                insurance: Number;
                visa: Number;
                other: Number;
                discount: Number
            };

            passengers: Object[];
            payments: Payment[];
        }
    ];
    modifiedby: {
        user: Object;
        date: Date;
        default: Date;
    };

    constructor(customer) {
        this.firstname = customer.firstname || '';
        this.lastname = customer.lastname || '';
        this.customernumber = customer.customer || '';
        this.title = customer.title || '';
        this.profilepicture = customer.profilepicture || 'assets/images/avatars/profile.jpg';
        this.nationality = customer.nationality || '';
        this.contact = customer.contact || {};
        this.address = customer.address || {};
        this.passport = customer.passport || {};
        this.bookings = customer.bookings || [];
        this.modifiedby = customer.modifiedby || {};
    }
};


class Payment {
    invoiceno: string;
    amount: Number;
    date: Date;
    type: string
};
