import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [
        UserService
    ]
})
export class LoginComponent implements OnInit {
    public page_title: string;
    public user: User;
    public status: string;
    public token;
    public identity;

    constructor(
        private _userService: UserService
    ) {
        this.page_title = "Identifícate";
        this.user = new User(1, '', '', '', '', '', '', '', '', 1, null, null, '');
    }

    ngOnInit() {
    }

    onSubmit(form) {
        this._userService.signup(this.user).subscribe(
            response => {
                // Token
                if (response.status != 'error') {
                    this.status = 'success';
                    this.token = response;

                    //Usuario identificado
                    this._userService.signup(this.user, true).subscribe(
                        response => {
                            this.identity = response;

                            console.log(this.token);
                            console.log(this.identity);
                        },
                        error => {
                            this.status = 'error';
                            console.log(<any>error);
                        }
                    );

                }
            },
            error => {
                this.status = 'error';
                console.log(<any>error);
            }
        );
    }

}
