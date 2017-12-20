import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";

import { RealtorListComponent } from "./realtor-list/realtor-list.component";
import { RealtorCreateComponent } from "./realtor-create/realtor-create.component";
import { RealtorEditComponent } from "./realtor-edit/realtor-edit.component";
import { RealtorService } from "../../services/realtorService";
import { DataTablesModule } from "angular-datatables";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        RealtorListComponent,
        RealtorCreateComponent,
        RealtorEditComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        DataTablesModule
    ],
    providers: [
        RealtorService
    ],
    exports: [
        RealtorListComponent,
        RealtorCreateComponent,
        RealtorEditComponent
    ]
})
export class RealtorModule {}