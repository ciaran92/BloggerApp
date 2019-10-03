import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { AuthGuardService } from './security/auth-guard.service';
import { ArticlesComponent } from './components/articles/articles.component';
import { UserArticleListComponent } from './components/users-articles/user-article-list/user-article-list.component';
import { UserArticleEditComponent } from './components/users-articles/user-article-edit/user-article-edit.component';
var routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'articles', component: ArticlesComponent },
    { path: 'my-articles', component: UserArticleListComponent, canActivate: [AuthGuardService] },
    { path: 'new-article', component: CreatePostComponent, canActivate: [AuthGuardService] },
    { path: 'edit-article/:id', component: UserArticleEditComponent, canActivate: [AuthGuardService] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map