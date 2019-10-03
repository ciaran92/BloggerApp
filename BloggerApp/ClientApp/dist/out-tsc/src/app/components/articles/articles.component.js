import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { PaginationService } from 'src/app/shared/pagination.service';
var ArticlesComponent = /** @class */ (function () {
    function ArticlesComponent(articleService, paginationService) {
        this.articleService = articleService;
        this.paginationService = paginationService;
        this.pageSize = 5;
        this.maxPages = 5;
    }
    ArticlesComponent.prototype.ngOnInit = function () {
        this.currentPage = 1;
        this.getArticlesByPageNumber(this.currentPage);
    };
    ArticlesComponent.prototype.getArticlesByPageNumber = function (page) {
        var _this = this;
        this.articleService.getAllArticles(page, this.pageSize).subscribe(function (res) {
            _this.articles = res.articles;
            _this.totalPages = res.articleCount;
            _this.currentPage = page;
            _this.pages = _this.paginationService.updatePages(page, _this.pageSize, _this.totalPages, _this.maxPages);
        });
    };
    ArticlesComponent = tslib_1.__decorate([
        Component({
            selector: 'app-articles',
            templateUrl: './articles.component.html',
            styleUrls: ['./articles.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ArticleService, PaginationService])
    ], ArticlesComponent);
    return ArticlesComponent;
}());
export { ArticlesComponent };
//# sourceMappingURL=articles.component.js.map