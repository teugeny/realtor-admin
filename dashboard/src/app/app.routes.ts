import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AuthComponent } from "./components/auth/auth.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component"

import { RealtorListComponent } from "./components/realtor/realtor-list/realtor-list.component";
import { RealtorCreateComponent } from "./components/realtor/realtor-create/realtor-create.component";
import { RealtorEditComponent } from "./components/realtor/realtor-edit/realtor-edit.component";

import { DivisionListComponent } from "./components/division/division-list/division-list.component";
import { DivisionCreateComponent } from "./components/division/division-create/division-create.component";
import { DivisionEditComponent } from "./components/division/division-edit/division-edit.component";


export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: AuthComponent},
    {path: 'dashboard', component:DashboardComponent,  children:[
        {path: 'realtors', children: [
            {path: 'list', component: RealtorListComponent},
            {path: 'create', component: RealtorCreateComponent},
            {path: 'edit/:realtorId', component: RealtorEditComponent}
        ]},
        {path: 'division', children: [
            {path: 'list', component: DivisionListComponent},
            {path: 'create', component: DivisionCreateComponent},
            {path: 'edit/:divisionId', component: DivisionEditComponent}
        ]}
    ]}
];