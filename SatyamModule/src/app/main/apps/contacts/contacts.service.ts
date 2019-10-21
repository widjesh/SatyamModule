import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import { Contact } from 'app/main/apps/contacts/contact.model';
import { Customer } from '../contacts/customer.model'

@Injectable()
export class ContactsService implements Resolve<any>
{
    onContactsChanged: BehaviorSubject<any>;
    onSelectedContactsChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    //contacts: Contact[];
    customers: Customer[];
    user: any;
    selectedContacts: string[] = [];

    searchText: string;
    filterBy: string;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        this.onContactsChanged = new BehaviorSubject([]);
        this.onSelectedContactsChanged = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getContacts(),
                this.getUserData()
            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getContacts();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getContacts();
                    });

                    resolve();

                },
                reject
            );
        });
    }

    /**
     * Get contacts
     *
     * @returns {Promise<any>}
     */

    async save(userData) {
        console.log("before save")
        console.log(userData);
        // let CustomerToSave = {
        //     title: userData.title,
        //     "firstname": userData.firstname,
        //     "lastname": userData.lastname,
        //     "dob": userData.dob,
        //     "nationality": userData.nationality,
        //     "mobilenumber": userData.contact.mobilenumber,
        //     "sms_sr": userData.contact.sms_sr,
        //     "sms_nl": userData.contact.sms_nl,
        //     "email": userData.contact.email,
        //     "zip": userData.address.zip,
        //     "city": userData.address.city,
        //     "street": userData.address.street,
        //     "country": userData.address.country,
        //     "passportno": userData.passport.passportno,
        //     "expirationdate": userData.passport.expirationdate
        // }

        return new Promise((resolve, reject) => {
            this._httpClient.post('http://172.19.142.76:3000/customers/', userData)
                .subscribe(response => {
                    this.getUserData();
                    this.getContacts();
                    resolve(response);
                });
        });
    }

    getContacts(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('http://172.19.142.76:3000/customers')
                .subscribe((response: any) => {

                    this.customers = response;

                    if (this.filterBy === 'starred') {
                        this.customers = this.customers.filter(_customer => {
                            return this.user.starred.includes(_customer.customernumber);
                        });
                    }

                    if (this.filterBy === 'frequent') {
                        this.customers = this.customers.filter(_customer => {
                            return this.user.frequentContacts.includes(_customer.customernumber);
                        });
                    }

                    if (this.searchText && this.searchText !== '') {
                        this.customers = FuseUtils.filterArrayByString(this.customers, this.searchText);
                        console.log(this.searchText);
                    }

                    this.customers = this.customers.map(customer => {
                        return new Customer(customer);
                    });

                    this.onContactsChanged.next(this.customers);
                    resolve(this.customers);
                }, reject);
        }
        );
    }

    /**
     * Get user data
     *
     * @returns {Promise<any>}
     */
    getUserData(): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log("get user data")
            this._httpClient.get('api/contacts-user/5725a6802d10e277a0f35724')
                .subscribe((response: any) => {
                    this.user = response;
                    console.log(this.user);
                    this.onUserDataChanged.next(this.user);
                    resolve(this.user);
                }, reject);
        }
        );
    }

    /**
     * Toggle selected contact by id
     *
     * @param id
     */
    toggleSelectedContact(id): void {
        // First, check if we already have that contact as selected...
        if (this.selectedContacts.length > 0) {
            const index = this.selectedContacts.indexOf(id);
            console.log("toggle selected")
            if (index !== -1) {
                this.selectedContacts.splice(index, 1);

                // Trigger the next event
                this.onSelectedContactsChanged.next(this.selectedContacts);

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedContacts.push(id);

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void {
        if (this.selectedContacts.length > 0) {
            this.deselectContacts();
        }
        else {
            this.selectContacts();
        }
    }

    /**
     * Select contacts
     *
     * @param filterParameter
     * @param filterValue
     */
    selectContacts(filterParameter?, filterValue?): void {
        this.selectedContacts = [];

        // If there is no filter, select all contacts
        if (filterParameter === undefined || filterValue === undefined) {
            this.selectedContacts = [];
            this.customers.map(_customer => {
                this.selectedContacts.push(_customer.contact.email);
                console.log("contact is " + _customer)
            });
        }

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }

    /**
     * Update contact
     *
     * @param contact
     * @returns {Promise<any>}
     */
    updateContact(customer): Promise<any> {
        // let customerToSave: Customer;
        // customerToSave.firstname = customer.firstname;
        // customerToSave.lastname = customer.lastname;
        // customerToSave.address.city = customer.city;
        // customerToSave.address.country = customer.country;
        // customerToSave.address.zip = customer.zip;
        // customerToSave.address.street = customer.street;
        // customerToSave.customernumber = customer.customernumber;
        // customerToSave.dob = customer.dob;
        // customerToSave.passport.passportno = customer.passportnumber;
        // customerToSave.passport.expirationdate = customer.expirationdate;
        // customerToSave.contact.mobilenumber = customer.phone;
        // customerToSave.contact.email = customer.email;
        // customerToSave.profilepicture = customer.profilepicture;
        // customerToSave.nationality = customer.nationality;



        // console.log(customerToSave);
        return new Promise((resolve, reject) => {
            console.log("customer before edit");
            console.log(customer);

            this._httpClient.patch('http://172.19.142.76:3000/customers/update/' + customer.email, customer)
                .subscribe(response => {
                    this.getContacts();
                    resolve(response);
                });
        });
    }

    /**
     * Update user data
     *
     * @param userData
     * @returns {Promise<any>}
     */
    updateUserData(userData): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/contacts-user/' + this.user.id, { ...userData })
                .subscribe(response => {
                    this.getUserData();
                    this.getContacts();
                    resolve(response);
                });
        });
    }

    /**
     * Deselect contacts
     */
    deselectContacts(): void {
        this.selectedContacts = [];

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }

    /**
     * Delete contact
     *
     * @param contact
     */
    deleteContact(contact): void {
        const contactIndex = this.customers.indexOf(contact);
        this.customers.splice(contactIndex, 1);
        this.onContactsChanged.next(this.customers);
    }

    /**
     * Delete selected contacts
     */
    deleteSelectedContacts(): void {
        for (const customernumber of this.selectedContacts) {
            const contact = this.customers.find(_customer => {
                return _customer.customernumber === customernumber;
            });
            const contactIndex = this.customers.indexOf(contact);
            this.customers.splice(contactIndex, 1);
        }
        this.onContactsChanged.next(this.customers);
        this.deselectContacts();
    }

}
