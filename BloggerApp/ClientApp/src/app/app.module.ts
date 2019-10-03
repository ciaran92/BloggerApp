import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserArticleListComponent } from './components/users-articles/user-article-list/user-article-list.component';
import { UserArticleEditComponent } from './components/users-articles/user-article-edit/user-article-edit.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { ArticlesComponent } from './components/articles/articles.component';

// Services
import { ConfigService } from './services/config.service';
import { UserService } from './services/user.service';
import { ArticleService } from './services/article.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth.service';
import { AppInterceptorService } from './services/app-interceptor.service';

// Helper Services
import { PaginationService } from './shared/pagination.service';

// Used to decode jwt
import { JwtHelperService } from '@auth0/angular-jwt';
import { MaterialModule } from './shared/modules/material/material.module';
import { DialogComponent } from './shared/dialog/dialog.component';
import { ProgressSpinnerComponent } from './shared/dialog/progress-spinner/progress-spinner.component';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CreatePostComponent,
    ArticlesComponent,
    UserArticleListComponent,
    UserArticleEditComponent,
    DialogComponent,
    ProgressSpinnerComponent
  ],
  entryComponents: [
    DialogComponent,
    ProgressSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],

  providers: [
    UserService, 
    ConfigService, 
    CookieService, 
    ArticleService, 
    AuthService,
    JwtHelperService,
    PaginationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
