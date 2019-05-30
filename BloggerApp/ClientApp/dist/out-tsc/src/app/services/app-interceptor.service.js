import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { Router } from '@angular/router';
var AppInterceptorService = /** @class */ (function () {
    function AppInterceptorService(authService, configService, route) {
        this.authService = authService;
        this.configService = configService;
        this.route = route;
        this.baseUrl = configService.getApiURI();
    }
    AppInterceptorService.prototype.intercept = function (req, next) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        if (this.authService.getAccessToken()) {
            console.log('token found');
            req = this.addTokenToRequest(req, this.authService.getAccessToken());
        }
        else {
            console.log('no token found');
            req = req.clone({
                headers: headers
            });
        }
        return next.handle(req).pipe(catchError(function (error) {
            // If a 401 unauthorized is returned, first attempt to refresh the access token
            if (error instanceof HttpErrorResponse && error.status == 401) {
                console.log("401 error");
                return _this.handleUnauthorizedError(req, next);
            }
            // if refresh token fails. log user out
            if (error.url == _this.baseUrl + 'users/refresh-token' && error.status == 400) {
                console.log("could not refresh token: " + error.error);
                _this.authService.logout().subscribe(function (res) {
                    _this.authService.removeCookies();
                    _this.route.navigate(['/home']);
                });
            }
            return throwError(error);
        }));
    };
    AppInterceptorService.prototype.addTokenToRequest = function (request, accessToken) {
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken
        });
        return request.clone({
            headers: headers
        });
    };
    AppInterceptorService.prototype.handleUnauthorizedError = function (request, next) {
        var _this = this;
        return this.authService.refreshToken().pipe(switchMap(function (token) {
            return next.handle(_this.addTokenToRequest(request, token.accessToken));
        }));
    };
    AppInterceptorService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AuthService, ConfigService, Router])
    ], AppInterceptorService);
    return AppInterceptorService;
}());
export { AppInterceptorService };
//# sourceMappingURL=app-interceptor.service.js.map