import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map, catchError, retry } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { throwError, Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { AuthService } from './auth.service';
import { Article } from '../models/article.model';

@Injectable()
export class ArticleService {

    private baseUrl: string;

    constructor(private http: HttpClient, private configService: ConfigService, private authService: AuthService) { 
        this.baseUrl = configService.getApiURI();
    }

    getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.baseUrl + "categories");
    }

    getAllArticles(): Observable<Article[]> {
        return this.http.get<Article[]>(this.baseUrl + "articles");
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

    handleError(error: HttpErrorResponse) {
        console.log(error);
        return throwError(error);
    }
}