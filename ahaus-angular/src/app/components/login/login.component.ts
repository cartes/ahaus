import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public page_title: string;
    public user: User;

    constructor() {
        this.page_title = "Identifícate";
        this.user = new User(1, '','','', '', '', '', '', '', 'ROLE_USER', '', '', '');
    }

    ngOnInit() {
    }

}
