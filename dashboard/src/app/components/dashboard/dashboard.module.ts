import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { RealtorModule } from "../realtor/realtor.module";
import { DivisionModule } from "../division/division.module";
import { RouterModule } from "@angular/router";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptor } from "../../token.interceptor";

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        RouterModule,
        RealtorModule,
        DivisionModule,
        BrowserModule,
        HttpClientModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    }],
    exports: [
        DashboardComponent,
        RealtorModule,
        DivisionModule
    ]
})
export class DashboardModule {}