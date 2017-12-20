import { Component, OnInit } from "@angular/core";
import { RealtorService } from "../../../services/realtorService";
import { Realtor } from "../../../models/realtor";
import { Router } from "@angular/router";
import { Subject } from "rxjs/Subject";
import { RussianDtLanguage } from "../../../helpers/helper.languageDt";

@Component({
    selector: 'app-realtor-list',
    templateUrl: './realtor-list.component.html'
})
export class RealtorListComponent implements OnInit {

    dtOptions: DataTables.Settings = {};
    realtors: Realtor[];
    dtTrigger: Subject<any> = new Subject();

    constructor(private realtorService: RealtorService, private router: Router) { }

    ngOnInit() {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 2,
            language: RussianDtLanguage
        };
        this.getRealtors()
    }

    /**
     *
     */
    getRealtors(): void {
        this.realtorService.list()
            .subscribe(realtors => {
                this.realtors = realtors;
                this.dtTrigger.next();
            });
    }

    /**
     *
     * @param {number} id
     */
    getRealtor(id: number): void {
        this.router.navigate(['dashboard/realtors/edit',id])
    }

    /**
     *
     * @param {number} id
     */
    removeRealtor(id: number): void {
        this.realtorService.removeOne(id)
            .subscribe(success => {
                if (success) {
                    this.realtors.forEach((item, index) => {
                        if (item.id === id) {
                            this.realtors.splice(index,1);
                        }
                    });
                }
            });
    }

}
