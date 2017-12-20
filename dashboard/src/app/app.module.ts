import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ROUTES } from "./app.routes";
import { RouterModule} from "@angular/router";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { AuthModule } from "./components/auth/auth.module";
import { HomeComponent } from './components/home/home.component';
import { DashboardModule } from "./components/dashboard/dashboard.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    AuthModule,
    DashboardModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
