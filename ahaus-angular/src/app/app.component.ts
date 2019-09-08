import {Component, OnInit, DoCheck} from '@angular/core';
import {UserService} from "./services/user.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        UserService
    ]
})
export class AppComponent implements OnInit, DoCheck{
    public title = 'Sistema Administración Ahaus';
    public identity;
    public token;

    constructor(
        public _userService: UserService
    ) {
        this.loadUser();
    }

    ngOnInit() {
        console.log('webapp cargado');
    }

    ngDoCheck(){
        this.loadUser();
    }

    loadUser() {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }
}
