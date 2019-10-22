import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Booking } from "../customer.model";
import { CustomersService } from 'app/Services/customers.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" }
];

@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.html",
  styleUrls: ["./booking.component.scss"]
})
export class BookingComponent implements OnInit {
  booking: Booking;
  selectedCustomer:any
  customerbooking : any;
  constructor(
    public matDialogRef: MatDialogRef<BookingComponent>,
    private _formBuilder: FormBuilder,
    private _customerService : CustomersService
  ) {
   this.selectedCustomer = this._customerService.getSelectedcustomer();
   console.log(this.selectedCustomer);
   this.customerbooking = this.selectedCustomer.bookings;
  }
  

  displayedColumns: string[] = ["number", "price", "date", "description"];
  dataSource = ELEMENT_DATA;
  ngOnInit() {}

  createBookingForm(): FormGroup {
    return this._formBuilder.group({
      number: [this.booking.number],
      date: [this.booking.date],
      description: [this.booking.description],
      currency: [this.booking.price.currency],
      ticket: [this.booking.price.ticket],
      insurance: [this.booking.price.insurance],
      visa: [this.booking.price.visa],
      other: [this.booking.price.other],
      discount: [this.booking.price.discount],

      firstname: [this.booking.passengers.pfirstname],
      lastname: [this.booking.passengers.plastname],
      dob: [this.booking.passengers.pdob],
      passportno: [this.booking.passengers.ppassportnumber],
      invoiceno: [this.booking.payments.invoiceno],
      amount: [this.booking.payments.amount],
      dateofpayement: [this.booking.payments.dateofpayement],
      type: [this.booking.payments.type]
    });
  }

  onSubmit() {
    console.log(this.selectedCustomer.contact.email);
    this._customerService.addBooking(this.booking,this.selectedCustomer.contact.email).subscribe((data)=>{
      console.log(data);
    });
  }
}
