import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article.model';
import { PaginationService } from 'src/app/shared/pagination.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articles: Article[];
  currentPage: number;
  pageSize: number = 5;
  totalPages: number;
  maxPages: number = 5;

  pages: number[];

  constructor(private articleService: ArticleService, private paginationService: PaginationService) { }

  ngOnInit() {
    this.currentPage = 1;
    this.getArticlesByPageNumber(this.currentPage);
  }

  getArticlesByPageNumber(page: number) {
    
    this.articleService.getAllArticles(page, this.pageSize).subscribe(res => {
      this.articles = res.articles;
      this.totalPages = res.articleCount;
      this.currentPage = page;
      this.pages = this.paginationService.updatePages(page, this.pageSize, this.totalPages, this.maxPages);
    });
    
  }

  
  

}
