import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {routing, appRoutingProvider} from "./app.routing";

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        routing
    ],
    providers: [
        appRoutingProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
