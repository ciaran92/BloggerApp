import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(authService, route) {
        this.authService = authService;
        this.route = route;
    }
    AuthGuardService.prototype.canActivate = function () {
        console.log(this.authService.isUserLoggedIn());
        if (this.authService.isUserLoggedIn()) {
            return true;
        }
        this.route.navigate(['/home']);
        return false;
    };
    AuthGuardService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService, Router])
    ], AuthGuardService);
    return AuthGuardService;
}());
export { AuthGuardService };
//# sourceMappingURL=auth-guard.service.js.map