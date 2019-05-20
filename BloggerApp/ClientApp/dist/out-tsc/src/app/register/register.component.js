import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(userService, route) {
        this.userService = userService;
        this.route = route;
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.registerUser = function (form) {
        var _this = this;
        var userDetails = JSON.stringify(form.value);
        console.log(userDetails);
        this.userService.register(userDetails).subscribe(function (result) {
            if (result) {
                _this.route.navigate(['/login']);
            }
        }, function (error) {
            _this.error = error;
            console.log(_this.error);
        });
    };
    RegisterComponent = tslib_1.__decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [UserService, Router])
    ], RegisterComponent);
    return RegisterComponent;
}());
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map