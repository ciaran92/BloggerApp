import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Category } from 'src/app/models/category.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  categories: Category[];
  categoryId: number;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getAllCategories().subscribe(response => {
      this.categories = response;
      console.log(this.categories[0]);
    });
  }

  createNewPost(articleTitle: string, articleBody: string) {
    
    console.log(articleTitle + ", " + articleBody + ", " + this.categoryId);    
  }

  getCategoryId(event): void {
    this.categoryId = event.target.value;
  }

}
