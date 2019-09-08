import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {__param} from "tslib";

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
        private _userService: UserService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        this.page_title = "Identifícate";
        this.user = new User(1, '', '', '', '', '', '', '', '', 1, null, null, '');
    }

    ngOnInit() {
        // Se ejecuta cuando cargo el componente
        this.logout();
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

                            // persistir Usuario

                            localStorage.setItem('token', this.token);
                            localStorage.setItem('identity', JSON.stringify(this.identity));

                            this._router.navigate(['/inicio']);
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

    logout() {
        this._route.params.subscribe(params => {
            let logout = +params['sure'];
            
            if (logout == 1) {
                localStorage.removeItem('identity');
                localStorage.removeItem('token');

                this.identity = null;
                this.token = null;

                this._router.navigate(['/inicio']);
            }
        })
    }

}
