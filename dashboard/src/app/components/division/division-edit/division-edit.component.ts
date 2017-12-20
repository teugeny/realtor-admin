import { Component, OnInit } from "@angular/core";
import { Division } from "../../../models/division";
import { ActivatedRoute, Router } from "@angular/router";
import { DivisionService } from "../../../services/divisionService";

@Component({
    selector: 'app-division-edit',
    templateUrl: './division-edit.component.html'
})
export class DivisionEditComponent implements OnInit {

    divisionId: number;
    division: Division;
    error: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private divisionService: DivisionService
    ) {
        this.route.params.subscribe(req => {
            this.divisionId = req.divisionId;
        })
    }

    ngOnInit() {
        this.loadDivisionData();
    }

    /**
     * Загрузить данные подразделения
     */
    loadDivisionData(): void {
        this.divisionService.getOne(this.divisionId)
            .subscribe(response => {
                this.division = response
            })
    }

    /**
     * Обновить данные подразделения
     */
    updateDivision() {
        this.divisionService.update(this.division)
            .subscribe(success => {
                if (success) {
                    this.error = "";
                    this.router.navigate(['dashboard/division/list']);
                } else {
                    this.error = "Failed to update"
                }
            })
    }

}