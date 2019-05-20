import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { throwError } from 'rxjs';
var ArticleService = /** @class */ (function () {
    function ArticleService(http, configService) {
        this.http = http;
        this.configService = configService;
        this.baseUrl = configService.getApiURI();
    }
    ArticleService.prototype.getAllCategories = function () {
        var requiredHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get(this.baseUrl + "categories", { headers: requiredHeader });
    };
    ArticleService.prototype.createNewPost = function () {
        var requiredHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(this.baseUrl + "categories", { headers: requiredHeader });
    };
    ArticleService.prototype.handleError = function (error) {
        console.log(error);
        return throwError(error);
    };
    ArticleService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient, ConfigService])
    ], ArticleService);
    return ArticleService;
}());
export { ArticleService };
//# sourceMappingURL=article.service.js.map