import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-article-edit',
  templateUrl: './user-article-edit.component.html',
  styleUrls: ['./user-article-edit.component.scss']
})
export class UserArticleEditComponent implements OnInit {

  article = new Article();
  articleId: number;
  articleBody: string = "12345";

  constructor(private articleService: ArticleService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.articleId = this.getArticleIdFromUrl();
    this.getArticleDetail(this.articleId);
  }

  getArticleDetail(articleId: number) {
    this.articleService.GetArticleDetail(articleId).subscribe( 
      res => {
        this.article = res;
        console.log(this.article.articleTitle);
    });
  }

  editArticle() {
    console.log("articleTitle: " + this.article.articleTitle);
    console.log("articleBody: " + this.article.articleBody);
    this.articleService.updateArticle(this.articleId, this.article).subscribe(res => {
      console.log("update successful on articleID: " + this.articleId);
    });
  }

  cancel() {

  }

  getArticleIdFromUrl(): number {
    return parseInt(this.route.snapshot.paramMap.get('id'));
  }



}
