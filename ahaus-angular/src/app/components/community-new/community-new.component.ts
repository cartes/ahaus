import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommunityService} from "../../services/community.service";
import {UserService} from "../../services/user.service";
import {Community} from "../../models/community";

@Component({
    selector: 'app-community-new',
    templateUrl: './community-new.component.html',
    styleUrls: ['./community-new.component.scss'],
    providers: [
        CommunityService,
        UserService
    ]
})
export class CommunityNewComponent implements OnInit {
    public page_title: string;
    public identity;
    public token;
    public status;
    public community: Community;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _communityService: CommunityService,
        private _userService: UserService
    ) {
        this.community = new Community(1, '', '', '', '', '', 1);
    }

    ngOnInit() {
    }


    onSubmit(form) {
      this._communityService.create(this.token, this.community).subscribe(
          response => {
            if (response.status == 'success') {
              console.log(response);
            } else {
              console.log(response);
            }
          },
          error => {
              this.status = 'error';
              console.log(<any>error)
          }
      )
    }
}
