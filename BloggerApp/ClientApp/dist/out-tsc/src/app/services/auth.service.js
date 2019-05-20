import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { CookieService } from 'ngx-cookie-service';
import { retry, map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
var AuthService = /** @class */ (function () {
    function AuthService(http, configService, cookie) {
        this.http = http;
        this.configService = configService;
        this.cookie = cookie;
        this.Jwt = 'AccessToken';
        this.Refresh = 'RefreshToken';
        this.baseUrl = configService.getApiURI();
    }
    AuthService.prototype.login = function (loginCredentials) {
        var _this = this;
        var requiredHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(this.baseUrl + "users/login", loginCredentials, { headers: requiredHeader })
            .pipe(retry(3), map(function (tokens) {
            if (!!tokens.accessToken) {
                _this.setCookies(tokens);
                return true;
            }
        }), catchError(this.handleError));
    };
    AuthService.prototype.setCookies = function (tokens) {
        console.log('$Jwt: {tokens.accessToken}');
    };
    AuthService.prototype.getAccessToken = function () {
    };
    AuthService.prototype.handleError = function (error) {
        console.log(error);
        return throwError(error);
    };
    AuthService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient, ConfigService, CookieService])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map