import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

//Componentes

import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ErrorComponent} from "./components/error/error.component";
import {UserEditComponent} from "./components/user-edit/user-edit.component";

//Rutas

const appRoutes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'inicio', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout/:sure', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'ajustes', component:UserEditComponent},
    {path: '**', component: ErrorComponent}
];


//Exportar rutas
export const appRoutingProvider: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);