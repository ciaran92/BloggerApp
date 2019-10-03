import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Category } from '../../models/category.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  categories: Category[];
  categoryId: number;
  categorySelected: number;
  showSpinner: boolean = false;

  constructor(private articleService: ArticleService, private route: Router) { }

  ngOnInit() {
    this.articleService.getAllCategories().subscribe(response => {
      this.categories = response;
      this.categorySelected = this.categories[0].categoryId;
    });
  }

  createNewPost(articleTitle: string, articleBody) {
    this.showSpinner = true;
    this.articleService.createNewPost(articleTitle, articleBody, this.categorySelected).subscribe(result => {
      this.showSpinner = false;
      this.route.navigate(['/my-articles']);
    });
  }

  getCategoryId(event): void {
    this.categoryId = event.target.value;
  }

}
