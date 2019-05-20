import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { CookieService } from 'ngx-cookie-service';
import { throwError } from 'rxjs';
var UserService = /** @class */ (function () {
    function UserService(http, configService, cookie) {
        this.http = http;
        this.configService = configService;
        this.cookie = cookie;
        this.loggedIn = false;
        this.baseUrl = configService.getApiURI();
    }
    UserService.prototype.register = function (userDetails) {
        var requiredHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(this.baseUrl + "users/register", userDetails, { headers: requiredHeader });
    };
    UserService.prototype.setAccessToken = function (accessToken) {
        this.cookie.set("jwt", accessToken);
    };
    UserService.prototype.handleError = function (error) {
        console.log(error);
        return throwError(error);
    };
    UserService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient, ConfigService, CookieService])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map