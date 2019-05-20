import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

// Services
import { ConfigService } from './services/config.service';
import { UserService } from './services/user.service';
import { ArticleService } from './services/article.service';
import { PostsComponent } from './components/posts/posts.component';
import { CookieService } from 'ngx-cookie-service';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { AuthService } from './services/auth.service';
import { AppInterceptorService } from './services/app-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PostsComponent,
    CreatePostComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],

  providers: [
    UserService, 
    ConfigService, 
    CookieService, 
    ArticleService, 
    AuthService,
    AppInterceptorService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
