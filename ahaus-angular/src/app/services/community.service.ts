import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Community} from "../models/community";
import {global} from "./global";

@Injectable()
export class CommunityService {
    public url: string;
    public identity;
    public token;


    constructor(
        public _http: HttpClient
    ) {
        this.url = global.url;
    }

    index(token): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.get(this.url + 'community/', {headers: headers});
    }

    create(token, community):Observable<any>{
        let json = JSON.stringify(community);
        let params = "json=" + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.post(this.url + 'community/', {headewrs: headers});
    }
}
