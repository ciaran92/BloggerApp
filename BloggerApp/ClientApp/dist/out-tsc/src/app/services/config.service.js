import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var ConfigService = /** @class */ (function () {
    function ConfigService() {
        this.apiURI = 'https://localhost:5001/api/';
    }
    ConfigService.prototype.getApiURI = function () {
        return this.apiURI;
    };
    ConfigService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], ConfigService);
    return ConfigService;
}());
export { ConfigService };
//# sourceMappingURL=config.service.js.map