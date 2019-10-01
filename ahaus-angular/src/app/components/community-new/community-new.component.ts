import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Community} from "../../models/community";
import {global} from "../../services/global";

@Component({
  selector: 'app-community-new',
  templateUrl: './community-new.component.html',
  styleUrls: ['./community-new.component.scss']
})
export class CommunityNewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
