import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { DivisionListComponent } from "./division-list/division-list.component";
import { DivisionCreateComponent } from "./division-create/division-create.component";
import { DivisionEditComponent } from "./division-edit/division-edit.component";
import { DataTablesModule } from "angular-datatables";
import { DivisionService } from "../../services/divisionService";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        DivisionListComponent,
        DivisionCreateComponent,
        DivisionEditComponent
    ],
    imports: [
        BrowserModule,
        DataTablesModule,
        FormsModule
    ],
    providers: [
        DivisionService
    ],
    exports: [
        DivisionListComponent,
        DivisionCreateComponent,
        DivisionEditComponent
    ]
})
export class DivisionModule {}