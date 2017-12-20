import { Component, OnInit } from "@angular/core";
import {Realtor} from "../../../models/realtor";
import {Router} from "@angular/router";
import {RealtorService} from "../../../services/realtorService";
import {DivisionService} from "../../../services/divisionService";
import {Division} from "../../../models/division";

@Component({
    selector: 'app-realtor-create',
    templateUrl: './realtor-create.component.html'
})
export class RealtorCreateComponent implements OnInit {

    realtor: any = {};
    error: string;
    divisions: Division[];

    constructor(
        private router: Router,
        private realtorService: RealtorService,
        private divisionService: DivisionService
    ) { }

    ngOnInit() {
        this.loadDivisions();
    }

    loadDivisions() {
        this.divisionService.list()
            .subscribe(response => this.divisions = response);
    }

    createRealtor() {
        this.realtorService.addOne(this.realtor)
            .subscribe(success => {
                if (success) {
                    this.router.navigate(['dashboard/realtors/list'])
                } else {
                    this.error = "Failed to create";
                }
            })
    }
}