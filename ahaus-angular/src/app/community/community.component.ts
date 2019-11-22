import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CommunityService } from "../services/community.service";
import { Community } from "../models/community";
import { global } from "../services/global";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
  providers: [ CommunityService ]
})
export class CommunityComponent implements OnInit {

  public page_title: string;
  public identity;
  public community: Community;

  constructor() { }

  ngOnInit() {
  }


  getCommunitites() {
    let id;
  }
}
