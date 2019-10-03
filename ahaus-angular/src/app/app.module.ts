import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {appRoutingProvider, routing} from "./app.routing";
import {FroalaEditorModule, FroalaViewModule} from "angular-froala-wysiwyg";
import {AngularFileUploaderModule} from "angular-file-uploader";

import { MatInputModule, MatButtonModule } from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from './app.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ErrorComponent} from './components/error/error.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';
import {UserNewComponent} from './components/user-new/user-new.component';
import {UnitNewComponent} from './components/unit-new/unit-new.component';
import {CommunityNewComponent} from './components/community-new/community-new.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        ErrorComponent,
        UserEditComponent,
        UserNewComponent,
        UnitNewComponent,
        CommunityNewComponent
    ],
    imports: [
        BrowserModule,
        routing,
        FormsModule,
        MatInputModule, MatButtonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),
        AngularFileUploaderModule,
        BrowserAnimationsModule,
        NgbModule,
    ],
    providers: [
        appRoutingProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
