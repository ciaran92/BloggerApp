import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
var DialogService = /** @class */ (function () {
    function DialogService(dialog) {
        this.dialog = dialog;
    }
    DialogService.prototype.openConfirmDialog = function () {
        //this.dialog.open(ConfirmDialogComponent)
    };
    DialogService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [ConfirmDialogComponent])
    ], DialogService);
    return DialogService;
}());
export { DialogService };
//# sourceMappingURL=dialog.service.js.map