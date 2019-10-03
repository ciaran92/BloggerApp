import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { ProgressSpinnerComponent } from 'src/app/shared/dialog/progress-spinner/progress-spinner.component';
var UserArticleListComponent = /** @class */ (function () {
    function UserArticleListComponent(articleService, dialog, route) {
        this.articleService = articleService;
        this.dialog = dialog;
        this.route = route;
    }
    UserArticleListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.articleService.GetAllArticlesForUserById().subscribe(function (res) {
            console.log(res);
            _this.myArticles = res;
            console.log(_this.myArticles[0].firstName);
        });
    };
    UserArticleListComponent.prototype.editArticle = function (articleId) {
        console.log("articleId: " + articleId);
        this.route.navigate(['/edit-article', articleId]);
    };
    UserArticleListComponent.prototype.deleteArticle = function (articleId) {
        var _this = this;
        console.log("deleting the article");
        this.openProgressSpinner();
        this.articleService.deleteArticle(articleId).subscribe(function (res) {
            console.log("Article with ArticleId: " + articleId + " has been deleted");
            _this.myArticles = res;
            _this.closeProgressSpinner();
        });
    };
    UserArticleListComponent.prototype.confirmDeleteArticle = function (articleId) {
        var _this = this;
        var dialogRef = this.dialog.open(DialogComponent, { autoFocus: false });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === "true") {
                _this.deleteArticle(articleId);
            }
            else {
                console.log("cancelling the delete request");
            }
        });
    };
    UserArticleListComponent.prototype.openProgressSpinner = function () {
        var dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.data = { title: "Deleting the Article" };
        this.dialog.open(ProgressSpinnerComponent, dialogConfig);
    };
    UserArticleListComponent.prototype.closeProgressSpinner = function () {
        this.dialog.closeAll();
    };
    UserArticleListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-user-article-list',
            templateUrl: './user-article-list.component.html',
            styleUrls: ['./user-article-list.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ArticleService, MatDialog, Router])
    ], UserArticleListComponent);
    return UserArticleListComponent;
}());
export { UserArticleListComponent };
//# sourceMappingURL=user-article-list.component.js.map