import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
var UserArticleListComponent = /** @class */ (function () {
    function UserArticleListComponent(articleService) {
        this.articleService = articleService;
    }
    UserArticleListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.articleService.GetAllArticlesForUserById().subscribe(function (res) {
            console.log(res);
            _this.myArticles = res;
            console.log(_this.myArticles[0].firstName);
        });
    };
    UserArticleListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-user-article-list',
            templateUrl: './user-article-list.component.html',
            styleUrls: ['./user-article-list.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ArticleService])
    ], UserArticleListComponent);
    return UserArticleListComponent;
}());
export { UserArticleListComponent };
//# sourceMappingURL=user-article-list.component.js.map