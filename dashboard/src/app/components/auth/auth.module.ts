import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AuthComponent } from "./auth.component";
import { AuthService } from "../../services/authService";

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports:[
        BrowserModule,
        FormsModule,
        RouterModule
    ],
    providers: [
        AuthService
    ],
    exports: [
        AuthComponent
    ]
})
export class AuthModule {}