import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {global} from "../../services/global";

@Component({
    selector: 'app-user-new',
    templateUrl: './user-new.component.html',
    styleUrls: ['./user-new.component.scss'],
    providers: [
        UserService
    ]
})
export class UserNewComponent implements OnInit {

    public page_title: string;
    public identity;
    public token;
    public user: User;
    public userList: Array<User>;
    public status: string;
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
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ) {
        this.user = new User(1, '', '', '', '', '', '', '', '', 1, null, null, null);

        this.page_title = "Crear Nuevo usuario";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();

        this.status = null;
        this.url = global.url;
    }

    ngOnInit() {
        this.getUsers();
    }

    onSubmit(form){
        this._userService.register(this.token, this.user).subscribe(
            response => {
                this.status = 'success';
                console.log(response);

                form.reset();
            },
            error =>  {
                this.status = 'error';
                console.log(<any>error);
            }
        );
    }

    avatarUpload(avatar) {
        let data = JSON.parse(avatar.response);
        this.user.picture = data.image;
    }

    getUsers() {
        let id = this.identity.community_id;

        this._userService.getCopropietarios(id, this.token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.userList = response.users;
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }

}
