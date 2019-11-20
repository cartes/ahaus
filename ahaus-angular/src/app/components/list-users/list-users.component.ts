import { Component, Input, OnInit } from '@angular/core';
import { User } from "../../models/user";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  @Input() listUsers: Array<User>;

  constructor() {
  }

  ngOnInit() {
    console.log(this.listUsers);
  }

}
