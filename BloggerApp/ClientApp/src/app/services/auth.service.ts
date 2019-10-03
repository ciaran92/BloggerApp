import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from './config.service';
import { CookieService } from 'ngx-cookie-service';
import { retry, map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Tokens } from '../models/tokens.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

    private readonly AccessToken = 'AccessToken';
    private readonly Refresh = 'RefreshToken';

    private baseUrl: string;

    constructor(private http: HttpClient, private configService: ConfigService, private cookie: CookieService) {
        this.baseUrl = configService.getApiURI();
    }

    login(loginCredentials: any): Observable<boolean> {
        //var requiredHeader = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.post<Tokens>(this.baseUrl + "users/login", loginCredentials)
        .pipe(
            map((tokens: Tokens) => {
                if(!!tokens.accessToken) {
                    this.setCookies(tokens);
                    return true;
                }
            })
        );
    }

    logout() {
        var body = {
            AccessToken: this.getAccessToken()
        };

        return this.http.post(this.baseUrl + 'users/logout', body);
    }

    refreshToken() {
        console.log(this.getAccessToken());
        var body = {
            AccessToken: this.getAccessToken()
        };

        return this.http.post<any>(this.baseUrl + 'users/refresh-token', body).pipe(
            tap((token: Tokens) => {
                this.setCookies(token);
            })
        );
    }
    
    setCookies(tokens: Tokens){
        console.log('access token to set:');
        //console.log(tokens.accessToken);
        let helper = new JwtHelperService();
        let decodedToken = helper.decodeToken(tokens.accessToken);
        console.log("decoded token: " + JSON.stringify(decodedToken));
        this.cookie.set(this.AccessToken, tokens.accessToken);
    }

    removeCookies(){
        this.cookie.delete(this.AccessToken);
    }

    logoutDeleteCookies(){
        this.cookie.delete(this.AccessToken);
    }

    getAccessToken() {
        return this.cookie.get(this.AccessToken);
    }

    isUserLoggedIn() {
        return !!this.cookie.get(this.AccessToken);
    }

    
}