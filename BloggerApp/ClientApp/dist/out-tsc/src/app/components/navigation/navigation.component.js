import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
var NavigationComponent = /** @class */ (function () {
    function NavigationComponent(authService, route) {
        this.authService = authService;
        this.route = route;
    }
    NavigationComponent.prototype.ngOnInit = function () {
    };
    NavigationComponent.prototype.loggedIn = function () {
        return this.authService.isUserLoggedIn();
    };
    NavigationComponent.prototype.logout = function () {
        var _this = this;
        console.log("logout called");
        this.authService.logout().subscribe(function (res) {
            _this.authService.removeCookies();
            _this.route.navigate(['/home']);
        });
    };
    NavigationComponent = tslib_1.__decorate([
        Component({
            selector: 'navigation',
            templateUrl: './navigation.component.html',
            styleUrls: ['./navigation.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService, Router])
    ], NavigationComponent);
    return NavigationComponent;
}());
export { NavigationComponent };
//# sourceMappingURL=navigation.component.js.map