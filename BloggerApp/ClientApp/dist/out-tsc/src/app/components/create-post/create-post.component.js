import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Router } from '@angular/router';
var CreatePostComponent = /** @class */ (function () {
    function CreatePostComponent(articleService, route) {
        this.articleService = articleService;
        this.route = route;
        this.showSpinner = false;
    }
    CreatePostComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.articleService.getAllCategories().subscribe(function (response) {
            _this.categories = response;
            _this.categorySelected = _this.categories[0].categoryId;
        });
    };
    CreatePostComponent.prototype.createNewPost = function (articleTitle, articleBody) {
        var _this = this;
        this.showSpinner = true;
        this.articleService.createNewPost(articleTitle, articleBody, this.categorySelected).subscribe(function (result) {
            _this.showSpinner = false;
            _this.route.navigate(['/my-articles']);
        });
    };
    CreatePostComponent.prototype.getCategoryId = function (event) {
        this.categoryId = event.target.value;
    };
    CreatePostComponent = tslib_1.__decorate([
        Component({
            selector: 'app-create-post',
            templateUrl: './create-post.component.html',
            styleUrls: ['./create-post.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ArticleService, Router])
    ], CreatePostComponent);
    return CreatePostComponent;
}());
export { CreatePostComponent };
//# sourceMappingURL=create-post.component.js.map