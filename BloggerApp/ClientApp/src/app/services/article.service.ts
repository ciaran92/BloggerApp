import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map, catchError, retry } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { throwError, Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable()
export class ArticleService {

    private baseUrl: string;

    constructor(private http: HttpClient, private configService: ConfigService) { 
        this.baseUrl = configService.getApiURI();
    }

    getAllCategories(): Observable<Category[]> {
        var requiredHeader = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.get<Category[]>(this.baseUrl + "categories", { headers: requiredHeader });
    }

    createNewPost() {
        var requiredHeader = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.post(this.baseUrl + "categories", { headers: requiredHeader });
    }

    handleError(error: HttpErrorResponse) {
        console.log(error);
        return throwError(error);
    }
}