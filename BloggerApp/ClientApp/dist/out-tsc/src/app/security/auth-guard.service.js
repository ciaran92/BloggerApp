import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(authService) {
        this.authService = authService;
    }
    AuthGuardService.prototype.canActivate = function () {
        //if(this.authService.isLoggedIn()) {
        //return true;
        //}
        return true;
    };
    AuthGuardService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService])
    ], AuthGuardService);
    return AuthGuardService;
}());
export { AuthGuardService };
//# sourceMappingURL=auth-guard.service.js.map