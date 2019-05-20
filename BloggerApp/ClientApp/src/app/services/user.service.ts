import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map, catchError, retry } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { throwError, Observable } from 'rxjs';

@Injectable()
export class UserService {

    private loggedIn = false;
    private baseUrl: string;
    error: string;

    constructor(private http: HttpClient, private configService: ConfigService, private cookie: CookieService) { 
        this.baseUrl = configService.getApiURI();
    }

    register(userDetails: any) {
        var requiredHeader = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.post(this.baseUrl + "users/register", userDetails, { headers: requiredHeader });
    }

    

    setAccessToken(accessToken: any) {
        this.cookie.set("jwt", accessToken);
    }

    handleError(error: HttpErrorResponse) {
        console.log(error);
        return throwError(error);
    }
}