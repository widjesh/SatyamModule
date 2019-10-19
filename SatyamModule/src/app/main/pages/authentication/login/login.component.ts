import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { UserService } from 'app/Services/user.service';
import { SwalService } from 'app/Services/swal.service';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private userService : UserService,
        private swalService : SwalService
    )
    {
        this.loginForm = this._formBuilder.group({
            email: [
              "",
              [Validators.required, Validators.email]
            ],
            password: ["", Validators.required]
          });

        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
       
    }

    onSubmit(){
        let user = this.loginForm.value;
        this.userService.loginUser(user).subscribe(data=>{
            console.log(data.message);
            if(data.message === "Auth Failed"){
                this.swalService.notify("Failed",`${data.message}`,"error");            
            }else{
                //
                this.swalService.notify(`Welcome ${data.email}`,"You're logged in","success");
                console.log(data);
            }
        });
        console.log(this.loginForm.value);
    }

    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : [''],
            password: ['', Validators.required]
        }); 
    }
}
