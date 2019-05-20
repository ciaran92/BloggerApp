import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(userService, route) {
        this.userService = userService;
        this.route = route;
        this.error = "";
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function (form) {
        var _this = this;
        var loginCredentials = JSON.stringify(form.value);
        this.userService.login(loginCredentials).subscribe(function (result) {
            if (result) {
                _this.route.navigate(['/create-post']);
            }
        }, function (error) {
            _this.error = error;
            if (error.status == 400) {
                _this.error = error.error;
                console.log(error.statusText);
            }
            else {
                console.log("error occurred: " + error.statusText + ": " + error.status);
            }
        });
    };
    LoginComponent = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [UserService, Router])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map