import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';
var ArticleService = /** @class */ (function () {
    function ArticleService(http, configService, authService) {
        this.http = http;
        this.configService = configService;
        this.authService = authService;
        this.baseUrl = configService.getApiURI();
    }
    ArticleService.prototype.getAllCategories = function () {
        return this.http.get(this.baseUrl + "categories");
    };
    ArticleService.prototype.getAllArticles = function (page, pageSize) {
        var apiEndpoint = this.baseUrl + "articles/trending/" + page + "/" + pageSize;
        return this.http.get(apiEndpoint);
    };
    ArticleService.prototype.GetAllArticlesForUserById = function () {
        return this.http.get(this.baseUrl + "articles" + "/my-articles/" + 1 + "/" + 5);
    };
    ArticleService.prototype.GetArticleDetail = function (articleId) {
        var apiEndpoint = this.baseUrl + "articles/" + articleId;
        return this.http.get(apiEndpoint);
    };
    ArticleService.prototype.updateArticle = function (articleId, articleUpdate) {
        var apiEndpoint = this.baseUrl + "articles/" + articleId;
        return this.http.put(apiEndpoint, articleUpdate);
    };
    ArticleService.prototype.createNewPost = function (articleTitle, articleBody, categoryId) {
        var body = {
            ArticleTitle: articleTitle,
            ArticleBody: articleBody,
            CategoryId: categoryId
        };
        var token = this.authService.getAccessToken();
        var requiredHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
        return this.http.post(this.baseUrl + "articles", body, { headers: requiredHeader });
    };
    ArticleService.prototype.deleteArticle = function (articleId) {
        var apiEndpoint = this.baseUrl + "articles/" + articleId;
        return this.http.delete(apiEndpoint);
    };
    ArticleService.prototype.handleError = function (error) {
        console.log(error);
        return throwError(error);
    };
    ArticleService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient, ConfigService, AuthService])
    ], ArticleService);
    return ArticleService;
}());
export { ArticleService };
//# sourceMappingURL=article.service.js.map