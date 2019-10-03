import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article.model';
import { ActivatedRoute } from '@angular/router';
var UserArticleEditComponent = /** @class */ (function () {
    function UserArticleEditComponent(articleService, route) {
        this.articleService = articleService;
        this.route = route;
        this.article = new Article();
        this.articleBody = "12345";
    }
    UserArticleEditComponent.prototype.ngOnInit = function () {
        this.articleId = this.getArticleIdFromUrl();
        this.getArticleDetail(this.articleId);
    };
    UserArticleEditComponent.prototype.getArticleDetail = function (articleId) {
        var _this = this;
        this.articleService.GetArticleDetail(articleId).subscribe(function (res) {
            _this.article = res;
            console.log(_this.article.articleTitle);
        });
    };
    UserArticleEditComponent.prototype.editArticle = function () {
        var _this = this;
        console.log("articleTitle: " + this.article.articleTitle);
        console.log("articleBody: " + this.article.articleBody);
        this.articleService.updateArticle(this.articleId, this.article).subscribe(function (res) {
            console.log("update successful on articleID: " + _this.articleId);
        });
    };
    UserArticleEditComponent.prototype.cancel = function () {
    };
    UserArticleEditComponent.prototype.getArticleIdFromUrl = function () {
        return parseInt(this.route.snapshot.paramMap.get('id'));
    };
    UserArticleEditComponent = tslib_1.__decorate([
        Component({
            selector: 'app-user-article-edit',
            templateUrl: './user-article-edit.component.html',
            styleUrls: ['./user-article-edit.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ArticleService, ActivatedRoute])
    ], UserArticleEditComponent);
    return UserArticleEditComponent;
}());
export { UserArticleEditComponent };
//# sourceMappingURL=user-article-edit.component.js.map