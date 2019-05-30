import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
var ArticlesComponent = /** @class */ (function () {
    function ArticlesComponent(articleService) {
        this.articleService = articleService;
    }
    ArticlesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.articleService.getAllArticles().subscribe(function (res) {
            console.log(res);
            _this.articles = res;
            console.log(_this.articles[0].firstName);
        });
    };
    ArticlesComponent = tslib_1.__decorate([
        Component({
            selector: 'app-articles',
            templateUrl: './articles.component.html',
            styleUrls: ['./articles.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ArticleService])
    ], ArticlesComponent);
    return ArticlesComponent;
}());
export { ArticlesComponent };
//# sourceMappingURL=articles.component.js.map