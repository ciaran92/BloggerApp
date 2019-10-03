import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService, route) {
        this.authService = authService;
        this.route = route;
        this.error = "";
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function (form) {
        var _this = this;
        console.log("called");
        var loginCredentials = JSON.stringify(form.value);
        this.authService.login(loginCredentials).subscribe(function (result) {
            if (result) {
                _this.route.navigate(['/new-article']);
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
        tslib_1.__metadata("design:paramtypes", [AuthService, Router])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map