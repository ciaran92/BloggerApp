import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
var MyArticlesComponent = /** @class */ (function () {
    function MyArticlesComponent(articleService) {
        this.articleService = articleService;
    }
    MyArticlesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.articleService.GetArticlesForUserById().subscribe(function (res) {
            console.log(res);
            _this.myArticles = res;
            console.log(_this.myArticles[0].firstName);
        });
    };
    MyArticlesComponent = tslib_1.__decorate([
        Component({
            selector: 'app-my-articles',
            templateUrl: './my-articles.component.html',
            styleUrls: ['./my-articles.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ArticleService])
    ], MyArticlesComponent);
    return MyArticlesComponent;
}());
export { MyArticlesComponent };
//# sourceMappingURL=my-articles.component.js.map