import { Component, OnInit } from "@angular/core";
import {Router} from "@angular/router";
import {DivisionService} from "../../../services/divisionService";

@Component({
    selector: 'app-division-create',
    templateUrl: './division-create.component.html'
})
export class DivisionCreateComponent implements OnInit {

    division: any = {};
    error: string;

    constructor(
        private router: Router,
        private divisionService: DivisionService
    ) {}

    ngOnInit() {

    }

    createDivision() {
        this.divisionService.addOne(this.division)
            .subscribe(success => {
                console.log(success);
                if (success) {
                    this.router.navigate(['dashboard/division/list'])
                } else {
                    this.error = "Failed to create";
                }
            })
    }

}