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

        this.url = global.url;
    }

    ngOnInit() {
    }

    onSubmit(form){
        console.log(this.user);
    }

    avatarUpload(avatar) {
        let data = JSON.parse(avatar.response);

        this.user.picture = data.image;
    }

}
