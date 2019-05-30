import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { Router } from '@angular/router';

@Injectable()
export class AppInterceptorService implements HttpInterceptor{

    private baseUrl: string;

    constructor(private authService: AuthService, private configService: ConfigService, private route: Router) {
        this.baseUrl = configService.getApiURI();
     }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = new HttpHeaders({
            'Content-Type':'application/json'
        });

        if(this.authService.getAccessToken()) {
            console.log('token found');
            req = this.addTokenToRequest(req, this.authService.getAccessToken());
        } else {
            console.log('no token found');
            req = req.clone({
                headers: headers
            });
        }

        return next.handle(req).pipe(catchError(error => {
                // If a 401 unauthorized is returned, first attempt to refresh the access token
                if(error instanceof HttpErrorResponse && error.status == 401) {
                    console.log("401 error");
                    return this.handleUnauthorizedError(req, next);
                }
                // if refresh token fails. log user out
                if(error.url == this.baseUrl + 'users/refresh-token' && error.status == 400) {
                    console.log("could not refresh token: " + error.error);
                    this.authService.logout().subscribe(
                        res => 
                        {
                            this.authService.removeCookies();
                            this.route.navigate(['/home']);
                        }
                    );
                }
                return throwError(error);
            }));
    }

    addTokenToRequest(request: HttpRequest<any>, accessToken: string) {
        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization': `Bearer ${accessToken}`
        });

        return request.clone({
            headers: headers
        });
    }

    handleUnauthorizedError(request: HttpRequest<any>, next: HttpHandler) {
        return this.authService.refreshToken().pipe(
            switchMap((token: any) => {
                return next.handle(this.addTokenToRequest(request, token.accessToken));
            })
        );
    }
}