import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { FuseConfigService } from "@fuse/services/config.service";
import { fuseAnimations } from "@fuse/animations";
import { UserService } from "app/Services/user.service";
import { SwalService } from "app/Services/swal.service";
import { Router } from "@angular/router";
import { CookieService } from "app/Services/cookie.service"

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class LoginComponent implements OnInit {
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
    private userService: UserService,
    private swalService: SwalService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.loginForm = this._formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });

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
  }

  onSubmit() {
    let user = this.loginForm.value;
    this.userService.loginUser(user).subscribe(async data => {
      console.log(data.message);
      if (data.message === "Auth Failed") {
        this.swalService.notify("Failed", `${data.message}`, "error");
      } else {
        await this.swalService.notify(
          `Welcome ${data.name}`,
          "You're logged in",
          "success"
        );
        this.router.navigate(["/apps/dashboards/project"]);
        this.cookieService.setAuth(data.name)
      }
    });
    console.log(this.loginForm.value);
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: [""],
      password: ["", Validators.required]
    });
  }
}
