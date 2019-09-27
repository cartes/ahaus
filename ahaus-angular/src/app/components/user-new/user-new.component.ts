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
  public url;

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService
  ) {
    this.page_title = "Crear Nuevo usuario";
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
          this.identity.role_id,
          this.identity.community,
          this.identity.unit_id,
          this.identity.picture
      );

      this.url = global.url;
  }

  ngOnInit() {
  }

}
