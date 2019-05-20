import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ArticleService } from '../../services/article.service';
var CreatePostComponent = /** @class */ (function () {
    function CreatePostComponent(articleService) {
        this.articleService = articleService;
    }
    CreatePostComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.articleService.getAllCategories().subscribe(function (response) {
            _this.categories = response;
            console.log(_this.categories[0]);
        });
    };
    CreatePostComponent.prototype.createNewPost = function (articleTitle, articleBody) {
        console.log(articleTitle + ", " + articleBody + ", " + this.categoryId);
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
        tslib_1.__metadata("design:paramtypes", [ArticleService])
    ], CreatePostComponent);
    return CreatePostComponent;
}());
export { CreatePostComponent };
//# sourceMappingURL=create-post.component.js.map