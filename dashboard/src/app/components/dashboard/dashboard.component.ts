import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/filter'
import "rxjs/add/operator/pairwise";
import {AuthService} from "../../services/authService";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService) {
        //
    }

    ngOnInit() {
        this.route.url
            .subscribe(url => {
                if (localStorage.getItem('ajax-access-token') === null) {
                    this.router.navigate(['login'])
                }
            })
    }

    logout() {
        this.auth.logout();
        this.router.navigate(['login']);
    }

}
