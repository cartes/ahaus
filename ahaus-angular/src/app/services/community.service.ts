import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
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
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);

        return this._http.get(this.url + 'community/', {headers: headers});
    }
}