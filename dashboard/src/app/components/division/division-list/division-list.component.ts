import { Component, OnInit } from "@angular/core";
import { DivisionService } from "../../../services/divisionService";
import { Division } from "../../../models/division";
import { Router } from "@angular/router";
import { Subject } from "rxjs/Subject";
import { RussianDtLanguage } from "../../../helpers/helper.languageDt";

@Component({
    selector: 'app-division-list',
    templateUrl: './division-list.component.html'
})
export class DivisionListComponent implements  OnInit {
    dtOptions: DataTables.Settings = {};
    divisions: Division[];
    dtTrigger: Subject<any> = new Subject();

    constructor(private divisionService: DivisionService, private router: Router) { }

    ngOnInit() {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 2,
            language: RussianDtLanguage
        };
        this.getDivisions();
    }

    /**
     *
     */
    getDivisions(): void {
        this.divisionService.list()
            .subscribe(divisions => {
                this.divisions = divisions;
                this.dtTrigger.next();
            });
    }

    /**
     *
     * @param {number} id
     */
    getDivision(id: number): void {
        this.router.navigate(['dashboard/division/edit',id]);
    }

    /**
     *
     * @param {number} id
     */
    removeDivision(id: number): void {
        this.divisionService.removeOne(id)
            .subscribe(success => {
                if (success) {
                    this.divisions.forEach((item, index) => {
                        if (item.id === id) {
                            this.divisions.splice(index, 1);
                        }
                    })
                }
            })
    }
}