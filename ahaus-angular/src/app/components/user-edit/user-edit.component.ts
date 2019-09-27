import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {global} from "../../services/global";

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
    public afuConfig = {
        multiple: false,
        formatsAllowed: ".jpg,.png,.gif,.jpeg",
        maxSize: "20",
        uploadAPI:  {
            url: global.url + 'user/upload',
            headers: {
                "Authorization" : this._userService.getToken()
            }
        },
        theme: "attachPin",
        hideProgressBar: false,
        hideResetBtn: true,
        hideSelectBtn: false,
        replaceTexts: {
            attachPinBtn: "Sube tu avatar..."
        }
    };
    public url;

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
            this.identity.unit_id,
            this.identity.picture
        );

        this.url = global.url;
    }

    ngOnInit() {
    }

    onSubmit(form) {
        this._userService.update(this.token, this.user).subscribe(
            (response: any) => {

                console.log(response);

                if (response && response.status && response.status == 'success') {
                    this.status = 'success';

                    if (response.changes.name) {
                        this.user.name = response.changes.name;
                    }

                    if (response.changes.surname) {
                        this.user.surname = response.changes.name;
                    }

                    if (response.changes.email) {
                        this.user.email = response.changes.email;
                    }

                    if (response.changes.birthDate) {
                        this.user.birthDate = response.changes.birthDate;
                    }

                    if (response.changes.birthDate) {
                        this.user.birthDate = response.changes.birthDate;
                    }

                    if (response.changes.profesion) {
                        this.user.profesion = response.changes.profesion;
                    }

                    if (response.changes.institute) {
                        this.user.institute = response.changes.institute;
                    }

                    if (response.changes.roleId) {
                        this.user.roleId = response.changes.roleId;
                    }

                    if (response.changes.community) {
                        this.user.community = response.changes.community;
                    }

                    if (response.changes.unit_id) {
                        this.user.unit_id = response.changes.unit_id;
                    }

                    if (response.changes.picture) {
                        this.user.picture = response.changes.picture;
                    }

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

    avatarUpload(avatar) {
        let data = JSON.parse(avatar.response);

        this.user.picture = data.image;
    }

}
