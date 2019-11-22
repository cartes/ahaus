import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CommunityService } from "../../services/community.service";
import { Community } from "../../models/community";
import { global } from "../../services/global";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
  providers: [ CommunityService ]
})
export class CommunityComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public status;
  public community: Community;
  public url;

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _communityService: CommunityService
  ) {
    this.community = new Community(1, '','','','','',null);
    this.url = global.url;
    this.page_title = "Manejador de Comunidades";
  }

  ngOnInit() {
  }


  getCommunitites() {
    let id;
  }
}
