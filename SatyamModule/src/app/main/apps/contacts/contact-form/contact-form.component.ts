import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { Contact } from "app/main/apps/contacts/contact.model";
import { Customer, Booking } from "../customer.model";

export interface Choice {
  value: string;
  viewValue: string;
}

@Component({
  selector: "contacts-contact-form-dialog",
  templateUrl: "./contact-form.component.html",
  styleUrls: ["./contact-form.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ContactsContactFormDialogComponent {
  action: string;
  contact: Contact;
  customer: Customer;
  contactForm: FormGroup;
  dialogTitle: string;
  value: string;
  viewValue: string;

  choices: Choice[] = [
    { value: "MR", viewValue: "MR" },
    { value: "MRS", viewValue: "MRS" },
    { value: "MISS", viewValue: "MISS" },
    { value: "MSTR", viewValue: "MSTR" }
  ];

  /**
   * Constructor
   *
   * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
   * @param _data
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    public matDialogRef: MatDialogRef<ContactsContactFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder
  ) {
    // Set the defaults
    this.action = _data.action;

    if (this.action === "edit") {
        console.log('Edit')
      this.dialogTitle = "Edit Customer";
      this.contact = _data.contact;
    } else {
        console.log('New')
      this.dialogTitle = "New Customer";
      this.customer = new Customer({});
    }

    this.contactForm = this.createContactForm();
  }

  onSubmit() {
    console.log(this.contactForm.value);
  }

  /**
   * Create contact form
   *
   * @returns {FormGroup}
   */
  createContactForm(): FormGroup {
    return this._formBuilder.group({
      title: [this.customer.title],
      profilepicture: [this.customer.profilepicture],
      firstname: [this.customer.firstname],
      lastname: [this.customer.lastname],
      dob: [this.customer.dob],
      nationality: [this.customer.nationality],
      contact: {
        mobilenumber: [this.customer.contact.mobilenumber],
        email: [this.customer.contact.email],
        sms_sr: [this.customer.contact.sms_sr],
        sms_nl: [this.customer.contact.sms_nl]
      },
      address: {
        zip: [this.customer.address.zip],
        city: [this.customer.address.city],
        street: [this.customer.address.street],
        country: [this.customer.address.country]
      },
      passport: {
        passportnumber: [this.customer.passport.passportno],
        expirationdate: [this.customer.passport.expirationdate]
      },
      bookings: this.customer.bookings?[
        {
          date: [this.customer.bookings[0].date],
          description:[this.customer.bookings[0].description],
          price: {
            currency: [this.customer.bookings[0].price.currency],
            ticket: [this.customer.bookings[0].price.ticket],
            insurance: [this.customer.bookings[0].price.insurance],
            visa: [this.customer.bookings[0].price.visa],
            other: [this.customer.bookings[0].price.other],
            discount: [this.customer.bookings[0].price.discount]
          },
          passengers: [
            {
              pfirstname: [this.customer.bookings[0].passengers[0].pfirstname],
              plastname: [this.customer.bookings[0].passengers[0].plastname],
              pdob: [this.customer.bookings[0].passengers[0].pdob],
              ppassportnumber: [
                this.customer.bookings[0].passengers[0].ppassportnumber
              ]
            }
          ],

          payments: [
            {
              invoiceno: [this.customer.bookings[0].payments[0].invoiceno],
              amount: [this.customer.bookings[0].payments[0].amount],
              dateofpayment: [
                this.customer.bookings[0].payments[0].dateofpayement
              ],
              type: [this.customer.bookings[0].payments[0].type]
            }
          ]
        }||{}
      ]:new Booking()
    });
  }
  // id      : [this.contact.id],
  // name    : [this.contact.name],
  // lastName: [this.contact.lastName],
  // avatar  : [this.contact.avatar],
  // nickname: [this.contact.nickname],
  // company : [this.contact.company],
  // jobTitle: [this.contact.jobTitle],
  // email   : [this.contact.email],
  // phone   : [this.contact.phone],
  // address : [this.contact.address],
  // birthday: [this.contact.birthday],
  // notes   : [this.contact.notes]
}
