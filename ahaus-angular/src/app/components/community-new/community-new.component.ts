import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {CommunityService} from "../../services/community.service";
import {Community} from "../../models/community";
import {global} from "../../services/global";

@Component({
  selector: 'app-community-new',
  templateUrl: './community-new.component.html',
  styleUrls: ['./community-new.component.scss'],
  providers: [
      CommunityService
  ]
})
export class CommunityNewComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public community: Community;

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _communityService: CommunityService
  ) {
    this.community = new Community(1,'','','','','',1);
  }

  ngOnInit() {
  }

}
