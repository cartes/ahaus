import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

//Componentes

import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";

//Rutas

const appRoutes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'inicio', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}
];


//Exportar rutas
export const appRoutingProvider: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);