import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ContentChild
} from "@angular/core";
import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";
import * as shape from "d3-shape";

import { fuseAnimations } from "@fuse/animations";

<<<<<<< HEAD
import { ProjectDashboardService } from 'app/main/apps/dashboards/project/project.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FormGroup } from '@angular/forms';
import { ContactsContactFormDialogComponent } from '../../contacts/contact-form/contact-form.component';
import { CustomersService } from "app/Services/customers.service";

@Component({
    selector: 'project-dashboard',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProjectDashboardComponent implements OnInit {
    // dialogRef: any;
    projects: any[];
    selectedProject: any;

    widgets: any;
    widget5: any = {};
    widget6: any = {};
    widget7: any = {};
    widget8: any = {};
    widget9: any = {};
    widget11: any = {};

    dateNow = Date.now();
    customers$: Observable<any>;
    customerscount: number = 0;

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {ProjectDashboardService} _projectDashboardService
     * @param {CustomersService} _customersService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _projectDashboardService: ProjectDashboardService,
        private _customersService: CustomersService,
    ) {
        /**
         * Widget 5
         */
        this.widget5 = {
            currentRange: 'TW',
            xAxis: true,
            yAxis: true,
            gradient: false,
            legend: false,
            showXAxisLabel: false,
            xAxisLabel: 'Days',
            showYAxisLabel: false,
            yAxisLabel: 'Isues',
            scheme: {
                domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
            },
            onSelect: (ev) => {
                console.log(ev);
            },
            supporting: {
                currentRange: '',
                xAxis: false,
                yAxis: false,
                gradient: false,
                legend: false,
                showXAxisLabel: false,
                xAxisLabel: 'Days',
                showYAxisLabel: false,
                yAxisLabel: 'Isues',
                scheme: {
                    domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
                },
                curve: shape.curveBasis
            }
        };

        /**
         * Widget 6
         */
        this.widget6 = {
            currentRange: 'TW',
            legend: false,
            explodeSlices: false,
            labels: true,
            doughnut: true,
            gradient: false,
            scheme: {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63']
            },
            onSelect: (ev) => {
                console.log(ev);
            }
        };

        /**
         * Widget 7
         */
        this.widget7 = {
            currentRange: 'T'
        };

        /**
         * Widget 8
         */
        this.widget8 = {
            legend: false,
            explodeSlices: false,
            labels: true,
            doughnut: false,
            gradient: false,
            scheme: {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63', '#ffc107']
            },
            onSelect: (ev) => {
                console.log(ev);
            }
        };

        /**
         * Widget 9
         */
        this.widget9 = {
            currentRange: 'TW',
            xAxis: false,
            yAxis: false,
            gradient: false,
            legend: false,
            showXAxisLabel: false,
            xAxisLabel: 'Days',
            showYAxisLabel: false,
            yAxisLabel: 'Isues',
            scheme: {
                domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
            },
            curve: shape.curveBasis
        };

        setInterval(() => {
            this.dateNow = Date.now();
        }, 1000);

    }
    ngOnInit(): void {
        this.projects = this._projectDashboardService.projects;
        this.selectedProject = this.projects[0];
        this.widgets = this._projectDashboardService.widgets;

        /**
         * Widget 11
         */
        this.widget11.onContactsChanged = new BehaviorSubject({});
        this.widget11.onContactsChanged.next(this.widgets.widget11.table.rows);
        this.widget11.dataSource = new FilesDataSource(this.widget11);

        this._customersService.getCustomers().subscribe(data => {
            this.customerscount = data.length;
        })

    }
=======
import { ProjectDashboardService } from "app/main/apps/dashboards/project/project.service";
import { FuseSidebarService } from "@fuse/components/sidebar/sidebar.service";
import { FormGroup } from "@angular/forms";
import { ContactsContactFormDialogComponent } from "../../contacts/contact-form/contact-form.component";
import { WeatherService } from "app/Services/weather.service";
import { UserService } from "app/Services/user.service";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { Router } from "@angular/router";
import { SwalService } from "app/Services/swal.service";

export interface PeriodicElement {
  name: string;
  position: string;
  weight: number;
  symbol: string;
  isadmin: boolean;
  phone: string;
  email: string;
}

@Component({
  selector: "project-dashboard",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ProjectDashboardComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "position",
    "email",
    "phone",
    "admin",
    "action"
  ];
  @ContentChild("myId", { static: true }) emailId;

  projects: any[];
  selectedProject: any;
  weather: any;
  users: any;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  widgets: any;
  widget5: any = {};
  widget6: any = {};
  widget7: any = {};
  widget8: any = {};
  widget9: any = {};
  widget11: any = {};
>>>>>>> 1da4c7aea2c63802af37f0caa275b5299aba20e2

  dateNow = Date.now();

  /**
   * Constructor
   *
   * @param {FuseSidebarService} _fuseSidebarService
   * @param {ProjectDashboardService} _projectDashboardService
   */
  constructor(
    private _fuseSidebarService: FuseSidebarService,
    private _projectDashboardService: ProjectDashboardService,
    private weaterService: WeatherService,
    private userService: UserService,
    public _matDialog: MatDialog,
    public router: Router,
    public swalService: SwalService
  ) {
    /**
     * Widget 5
     */
<<<<<<< HEAD
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
=======
    this.widget5 = {
      currentRange: "TW",
      xAxis: true,
      yAxis: true,
      gradient: false,
      legend: false,
      showXAxisLabel: false,
      xAxisLabel: "Days",
      showYAxisLabel: false,
      yAxisLabel: "Isues",
      scheme: {
        domain: ["#42BFF7", "#C6ECFD", "#C7B42C", "#AAAAAA"]
      },
      onSelect: ev => {
        console.log(ev);
      },
      supporting: {
        currentRange: "",
        xAxis: false,
        yAxis: false,
        gradient: false,
        legend: false,
        showXAxisLabel: false,
        xAxisLabel: "Days",
        showYAxisLabel: false,
        yAxisLabel: "Isues",
        scheme: {
          domain: ["#42BFF7", "#C6ECFD", "#C7B42C", "#AAAAAA"]
        },
        curve: shape.curveBasis
      }
    };
>>>>>>> 1da4c7aea2c63802af37f0caa275b5299aba20e2

    /**
     * Widget 6
     */
<<<<<<< HEAD
    constructor(private _widget11) {
        super();
    }
=======
    this.widget6 = {
      currentRange: "TW",
      legend: false,
      explodeSlices: false,
      labels: true,
      doughnut: true,
      gradient: false,
      scheme: {
        domain: ["#f44336", "#9c27b0", "#03a9f4", "#e91e63"]
      },
      onSelect: ev => {
        console.log(ev);
      }
    };
>>>>>>> 1da4c7aea2c63802af37f0caa275b5299aba20e2

    /**
     * Widget 7
     */
<<<<<<< HEAD
    connect(): Observable<any[]> {
        return this._widget11.onContactsChanged;
    }
=======
    this.widget7 = {
      currentRange: "T"
    };

    /**
     * Widget 8
     */
    this.widget8 = {
      legend: false,
      explodeSlices: false,
      labels: true,
      doughnut: false,
      gradient: false,
      scheme: {
        domain: ["#f44336", "#9c27b0", "#03a9f4", "#e91e63", "#ffc107"]
      },
      onSelect: ev => {
        console.log(ev);
      }
    };
>>>>>>> 1da4c7aea2c63802af37f0caa275b5299aba20e2

    /**
     * Widget 9
     */
<<<<<<< HEAD
    disconnect(): void {
=======
    this.widget9 = {
      currentRange: "TW",
      xAxis: false,
      yAxis: false,
      gradient: false,
      legend: false,
      showXAxisLabel: false,
      xAxisLabel: "Days",
      showYAxisLabel: false,
      yAxisLabel: "Isues",
      scheme: {
        domain: ["#42BFF7", "#C6ECFD", "#C7B42C", "#AAAAAA"]
      },
      curve: shape.curveBasis
    };

    setInterval(() => {
      this.dateNow = Date.now();
    }, 1000);
  }

  deleteContact(user) {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false,
      width: "250px",
      height: "250px"
    });
    this.confirmDialogRef.componentInstance.confirmMessage =
      "Are you sure you want to delete?";
    this.confirmDialogRef.afterClosed().subscribe(async result => {
      if (result) {
        console.log(user);
        this.userService.deleteUser(user).subscribe();
        await this.swalService.notify(
          "Success!",
          `User ${user} has been deleted!`,
          "success"
        );
         window.location.reload();
      }
      this.confirmDialogRef = null;
    });
  }
  ngOnInit(): void {
    this.projects = this._projectDashboardService.projects;
    this.selectedProject = this.projects[0];
    this.widgets = this._projectDashboardService.widgets;
    this.widget11.onContactsChanged = new BehaviorSubject({});
    this.widget11.onContactsChanged.next(this.widgets.widget11.table.rows);
    this.widget11.dataSource = new FilesDataSource(this.widget11);
    this.weaterService.getWeather().subscribe(w => {
      if (w) {
        this.weather = parseInt(w.list[0].main.temp);
      }
    });

    if (this.weather === undefined) {
      this.weather = "27";
>>>>>>> 1da4c7aea2c63802af37f0caa275b5299aba20e2
    }
    this.userService.getAllUsers().subscribe(u => {
      console.log(u);
      this.users = u;
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }
}

export class FilesDataSource extends DataSource<any> {
  /**
   * Constructor
   *
   * @param _widget11
   */
  constructor(private _widget11) {
    super();
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   *
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]> {
    return this._widget11.onContactsChanged;
  }

  /**
   * Disconnect
   */
  disconnect(): void {}
}
