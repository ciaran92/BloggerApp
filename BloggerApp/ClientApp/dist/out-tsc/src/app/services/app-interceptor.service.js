import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var AppInterceptorService = /** @class */ (function () {
    function AppInterceptorService() {
    }
    AppInterceptorService.prototype.intercept = function (req, next) {
        throw new Error("Method not implemented.");
    };
    AppInterceptorService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], AppInterceptorService);
    return AppInterceptorService;
}());
export { AppInterceptorService };
//# sourceMappingURL=app-interceptor.service.js.map