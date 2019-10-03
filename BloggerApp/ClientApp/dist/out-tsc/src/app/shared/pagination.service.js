import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var PaginationService = /** @class */ (function () {
    function PaginationService() {
    }
    /**
   * Method used to return an array of current viewable pages
   * @param currentPage current page the user is on
   * @param pageSize how many articles will be displayed per page
   * @param totalPages the total number of pages that there will be based off of the amount of articles
   * @param maxPages the max amount of pages that will be shown in the pagination nav area
   */
    PaginationService.prototype.updatePages = function (currentPage, pageSize, totalPages, maxPages) {
        if (currentPage < 1) {
            currentPage = 1;
        }
        else if (currentPage > totalPages) {
            currentPage = totalPages;
        }
        var startPage, endPage;
        if (totalPages <= maxPages) {
            startPage = 1;
            endPage = totalPages;
        }
        else {
            var maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
            var maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
            if (currentPage <= maxPagesBeforeCurrentPage) {
                startPage = 1;
                endPage = maxPages;
            }
            else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
                startPage = totalPages - maxPages + 1;
                endPage = totalPages;
            }
            else {
                startPage = currentPage - maxPagesBeforeCurrentPage;
                endPage = currentPage + maxPagesAfterCurrentPage;
            }
        }
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, 100);
        return Array.from(Array((endPage + 1) - startPage).keys()).map(function (i) { return startPage + i; });
    };
    PaginationService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], PaginationService);
    return PaginationService;
}());
export { PaginationService };
//# sourceMappingURL=pagination.service.js.map