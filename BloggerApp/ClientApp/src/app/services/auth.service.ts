import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from './config.service';
import { CookieService } from 'ngx-cookie-service';
import { retry, map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Tokens } from '../models/tokens.model';

@Injectable()
export class AuthService {

    private readonly Jwt = 'AccessToken';
    private readonly Refresh = 'RefreshToken';

    private baseUrl: string;

    constructor(private http: HttpClient, private configService: ConfigService, private cookie: CookieService) {
        this.baseUrl = configService.getApiURI();
    }

    login(loginCredentials: any): Observable<boolean> {
        var requiredHeader = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.post<Tokens>(this.baseUrl + "users/login", loginCredentials, { headers: requiredHeader })
        .pipe(
            retry(3),
            map((tokens: Tokens) => {
                if(!!tokens.accessToken) {
                    this.setCookies(tokens);
                    return true;
                }
            }),      
            catchError(this.handleError)
        );
    }
    
    setCookies(tokens: Tokens){
        console.log('$Jwt: {tokens.accessToken}');
    }

    getAccessToken() {

    }

    handleError(error: HttpErrorResponse) {
        console.log(error);
        return throwError(error);
    }

    

    
}