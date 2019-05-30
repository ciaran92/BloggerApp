import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { CookieService } from 'ngx-cookie-service';
import { map, tap } from 'rxjs/operators';
var AuthService = /** @class */ (function () {
    function AuthService(http, configService, cookie) {
        this.http = http;
        this.configService = configService;
        this.cookie = cookie;
        this.AccessToken = 'AccessToken';
        this.Refresh = 'RefreshToken';
        this.baseUrl = configService.getApiURI();
    }
    AuthService.prototype.login = function (loginCredentials) {
        var _this = this;
        //var requiredHeader = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.post(this.baseUrl + "users/login", loginCredentials)
            .pipe(map(function (tokens) {
            if (!!tokens.accessToken) {
                _this.setCookies(tokens);
                return true;
            }
        }));
    };
    AuthService.prototype.logout = function () {
        var body = {
            AccessToken: this.getAccessToken()
        };
        return this.http.post(this.baseUrl + 'users/logout', body);
    };
    AuthService.prototype.refreshToken = function () {
        var _this = this;
        console.log(this.getAccessToken());
        var body = {
            AccessToken: this.getAccessToken()
        };
        return this.http.post(this.baseUrl + 'users/refresh-token', body).pipe(tap(function (token) {
            _this.setCookies(token);
        }));
    };
    AuthService.prototype.setCookies = function (tokens) {
        console.log('access token to set:');
        console.log(tokens.accessToken);
        this.cookie.set(this.AccessToken, tokens.accessToken);
    };
    AuthService.prototype.removeCookies = function () {
        this.cookie.delete(this.AccessToken);
    };
    AuthService.prototype.logoutDeleteCookies = function () {
        this.cookie.delete(this.AccessToken);
    };
    AuthService.prototype.getAccessToken = function () {
        return this.cookie.get(this.AccessToken);
    };
    AuthService.prototype.isUserLoggedIn = function () {
        return !!this.cookie.get(this.AccessToken);
    };
    AuthService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient, ConfigService, CookieService])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map