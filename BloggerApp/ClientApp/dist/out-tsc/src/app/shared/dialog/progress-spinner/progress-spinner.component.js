import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
var ProgressSpinnerComponent = /** @class */ (function () {
    function ProgressSpinnerComponent(data) {
        this.data = data;
    }
    ProgressSpinnerComponent.prototype.ngOnInit = function () {
    };
    ProgressSpinnerComponent = tslib_1.__decorate([
        Component({
            selector: 'app-progress-spinner',
            templateUrl: './progress-spinner.component.html',
            styleUrls: ['./progress-spinner.component.scss']
        }),
        tslib_1.__param(0, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ProgressSpinnerComponent);
    return ProgressSpinnerComponent;
}());
export { ProgressSpinnerComponent };
//# sourceMappingURL=progress-spinner.component.js.map