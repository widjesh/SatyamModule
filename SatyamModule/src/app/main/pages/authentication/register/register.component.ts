import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
  FormControl
} from "@angular/forms";
import { Subject, Observable } from "rxjs";
import { takeUntil } from "rxjs/internal/operators";

import { FuseConfigService } from "@fuse/services/config.service";
import { fuseAnimations } from "@fuse/animations";
import { UserService } from "app/Services/user.service";
import { SwalService } from 'app/Services/swal.service';
import { Router } from '@angular/router';


@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private swalService: SwalService,
    private router : Router
  ) {
    // Configure the layout
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  onSubmit() {
    const newUser = this.registerForm.value;
    console.log(newUser);
    this.userService.registerUser(newUser).subscribe(async data => {
      await this.swalService.notify("Registered!", `Successfully registered ${data.name}`, "success");
      this.router.navigate(["/app/dashboards/project"]);
    });
  }

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      email: [
        "",
        [Validators.required, Validators.email],
        [this.asyncEmailValidator.bind(this)]
      ],
      password: ["", Validators.required],
      passwordConfirm: ["", [Validators.required, confirmPasswordValidator]],
      position: ["", Validators.required],
      isadmin: [false]
    });

    // Update the validity of the 'passwordConfirm' field
    // when the 'password' field changes
    this.registerForm
      .get("password")
      .valueChanges.pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.registerForm.get("passwordConfirm").updateValueAndValidity();
      });
  }



  asyncEmailValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
            this.userService.getUserByEmail(control.value).subscribe(data => {
                if (data.email) {
                  console.log("Invalid");
                  this.swalService.notify("We're sorry!", "You have chosen an existing email", "error");
                  resolve("Test");
                } else {
                  console.log("Valid");
                  resolve(null);
                }
              });

    });
    return promise;
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get("password");
  const passwordConfirm = control.parent.get("passwordConfirm");

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.value === "") {
    return null;
  }

  if (password.value === passwordConfirm.value) {
    return null;
  }

  return { passwordsNotMatching: true };
};
