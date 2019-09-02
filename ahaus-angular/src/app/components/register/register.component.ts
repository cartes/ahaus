import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers: [
        UserService
    ]
})
export class RegisterComponent implements OnInit {
    public page_title: string;
    public user: User

    constructor(
        private _userService: UserService
    ) {
        this.page_title = 'Regístrate';
        this.user = new User(1, '', '', '', '', '', '', '', '', 'ROLE_USER', '', '', '');

    }

    ngOnInit() {
    }

    onSubmit(form) {
        console.log(this.user);
        console.log(this._userService.test());
        form.reset();
    }
}
