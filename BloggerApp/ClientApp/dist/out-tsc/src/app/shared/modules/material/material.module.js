import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule, MatDialogModule, MatButtonModule } from '@angular/material';
var MaterialComponents = [
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule
];
var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = tslib_1.__decorate([
        NgModule({
            imports: [MaterialComponents],
            exports: [MaterialComponents]
        })
    ], MaterialModule);
    return MaterialModule;
}());
export { MaterialModule };
//# sourceMappingURL=material.module.js.map