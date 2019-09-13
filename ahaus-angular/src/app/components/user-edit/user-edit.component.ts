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


        this.user = new User(
            this.identity.sub,
            this.identity.name,
            this.identity.surname,
            this.identity.tax_id,
            this.identity.email,
            this.identity.birthDate,
            this.identity.profesion,
            this.identity.institute,
            this.identity.password,
            this.identity.roleId,
            this.identity.community,
            this.identity.unitId,
            this.identity.picture
        );

    }

    ngOnInit() {
    }

    onSubmit(form) {
        this._userService.update(this.token, this.user).subscribe(
            (response: any) => {

                if (response && response.status && response.status == 'success') {
                    this.status = 'success';

                    response.changes.sub = this.identity.sub;

                    // Actualizando el usuario en sesión

                    this.identity = response.changes;
                    localStorage.setItem('identity', JSON.stringify(this.identity));
                } else {
                    this.status = 'error';
                }
            },
            error => {
                this.status = 'error';
                console.log(<any>error);
            }
        )
    }

}
