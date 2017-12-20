import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Realtor } from "../../../models/realtor";
import { Division } from "../../../models/division";
import { RealtorService } from "../../../services/realtorService";
import { DivisionService } from "../../../services/divisionService";

@Component({
    selector: 'app-realtor-edit',
    templateUrl: './realtor-edit.component.html'
})
export class RealtorEditComponent implements OnInit {

    realtorId: number;
    realtor: Realtor;
    divisions: Division[];
    error: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private realtorService: RealtorService,
        private divisionService: DivisionService
    ) {
        this.route.params.subscribe(req => {
            this.realtorId = req.realtorId;
        });
    }

    ngOnInit() {
        this.loadRealtorData();
    }

    /**
     * Загружаем данные риелтора для дальнейшего редактирования
     */
    loadRealtorData(): void {
        this.realtorService.getOne(this.realtorId)
            .subscribe(response => {
                this.realtor = response;
            });
        this.divisionService.list()
            .subscribe(response=> this.divisions = response);
    }

    /**
     * Обновляем данные риелтора
     * TODO Добавить вывод ошибки в виде всплывающего окна
     */
    updateRealtor() {
        this.realtorService.update(this.realtor)
            .subscribe(success => {
                if (success) {
                    this.error = "";
                    this.router.navigate(['dashboard/realtors/list'])
                } else {
                    this.error = "Failed to update";
                }
            })
    }
}