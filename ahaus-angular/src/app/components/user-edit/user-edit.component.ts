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
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        if (!this.identity) {
            this.identity = { sub: 1, name: '', surname: '', tax_id: '', email: '', birthDate: '', profesion: '', institute: '', password: '', role_id: 1, community_id: null, unit_id: null, picture: '' };
        }
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
            this.identity.role_id,
            this.identity.community_id,
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
                if (response && response.status) {
                    this.status = 'success';

                    if (response.changes.name) {
                        this.user.name = response.changes.name;
                    }

                    if (response.changes.surname) {
                        this.user.surname = response.changes.surname;
                    }

                    if (response.changes.email) {
                        this.user.email = response.changes.email;
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

                    if (response.changes.role_id) {
                        this.user.role_id = response.changes.role_id;
                    }

                    if (response.changes.community) {
                        this.user.community_id = response.changes.community_id;
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
        if(avatar && avatar.response) {
            let data = JSON.parse(avatar.response);
            console.log(data.image);
            this.user.picture = data.image;
        }
    }

}
