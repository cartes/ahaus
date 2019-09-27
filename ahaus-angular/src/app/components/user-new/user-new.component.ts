import { Component, OnInit } from '@angular/core';
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

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService
  ) {
    this.page_title = "Crear Nuevo usuario";
    this.identity = this._userService.getIdentity();
  }

  ngOnInit() {
  }

}
