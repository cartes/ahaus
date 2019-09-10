import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss'],
    providers: [
        UserService
    ]
})
export class UserEditComponent implements OnInit {

    public page_title;
    public user: User;
    public identity;
    public token;
    public status;

    constructor(
        private _userService: UserService
    ) {
        this.page_title = 'Ajustes de usuario';
        this.user = new User(1, '', '', '', '', '', '', '', '', 1, null, null, '');

        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();


        this.user = this.identity;

    }

    ngOnInit() {
    }

    onSubmit(form) {
        console.log(this.user);
        this._userService.update(this.token, this.user).subscribe(
            response => {
                console.log(response);
            },
            error => {
                this.status = 'error';
                console.log(<any>error);
            }
        )
    }

}
