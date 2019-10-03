import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map, catchError, retry } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { throwError, Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { AuthService } from './auth.service';
import { Article } from '../models/article.model';
import { TrendingArticles } from '../models/trending.articles.model';

@Injectable()
export class ArticleService {

    page: number;
    private baseUrl: string;

    constructor(private http: HttpClient, private configService: ConfigService, private authService: AuthService) { 
        this.baseUrl = configService.getApiURI();
    }

    getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.baseUrl + "categories");
    }

    getAllArticles(page: number, pageSize: number): Observable<TrendingArticles> {
        const apiEndpoint = `${this.baseUrl}articles/trending/${page}/${pageSize}`;
        return this.http.get<TrendingArticles>(apiEndpoint);
    }

    GetAllArticlesForUserById(): Observable<Article[]> {
        return this.http.get<Article[]>(this.baseUrl + "articles" + "/my-articles/" + 1 + "/" + 5);
    }

    GetArticleDetail(articleId: number): Observable<Article> {
        const apiEndpoint = `${this.baseUrl}articles/${articleId}`;    
        return this.http.get<Article>(apiEndpoint);
    }

    updateArticle(articleId: number, articleUpdate: Article) {
        const apiEndpoint = `${this.baseUrl}articles/${articleId}`;
        return this.http.put(apiEndpoint, articleUpdate);
    }

    createNewPost(articleTitle: string, articleBody: string, categoryId: number) {
        var body = {
            ArticleTitle: articleTitle,
            ArticleBody: articleBody,
            CategoryId: categoryId
        };
        let token = this.authService.getAccessToken();
        var requiredHeader = new HttpHeaders({'Content-Type':'application/json', 'Authorization': 'Bearer ' + token });
        return this.http.post(this.baseUrl + "articles", body, { headers: requiredHeader });
    }

    deleteArticle(articleId: number): Observable<Article[]> {
        const apiEndpoint = `${this.baseUrl}articles/${articleId}`;
        return this.http.delete<Article[]>(apiEndpoint);
    }

    handleError(error: HttpErrorResponse) {
        console.log(error);
        return throwError(error);
    }
}