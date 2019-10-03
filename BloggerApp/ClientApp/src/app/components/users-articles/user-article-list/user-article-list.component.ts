import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article.model';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';  
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { ProgressSpinnerComponent } from 'src/app/shared/dialog/progress-spinner/progress-spinner.component';

@Component({
  selector: 'app-user-article-list',
  templateUrl: './user-article-list.component.html',
  styleUrls: ['./user-article-list.component.scss']
})
export class UserArticleListComponent implements OnInit {

  private myArticles: Article[];
  
  constructor(private articleService: ArticleService, public dialog: MatDialog, private route: Router) { }

  ngOnInit() {
    this.articleService.GetAllArticlesForUserById().subscribe( res => {
      console.log(res);
      this.myArticles = res;
      console.log(this.myArticles[0].firstName);
    })
  }

  editArticle(articleId: number) {
    console.log("articleId: " + articleId);
    this.route.navigate(['/edit-article', articleId]);
  }

  deleteArticle(articleId: number) {
    console.log("deleting the article");
    this.openProgressSpinner();
    this.articleService.deleteArticle(articleId).subscribe( res => {
      console.log("Article with ArticleId: " + articleId + " has been deleted");
      this.myArticles = res;
      this.closeProgressSpinner();
    });
  }

  confirmDeleteArticle(articleId: number) {
    let dialogRef = this.dialog.open(DialogComponent, {autoFocus: false});
    dialogRef.afterClosed().subscribe(result => {
      if(result === "true") {
        this.deleteArticle(articleId); 
      } else{
        console.log("cancelling the delete request");
      }
    });
  }

  openProgressSpinner() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { title: "Deleting the Article" };
    this.dialog.open(ProgressSpinnerComponent, dialogConfig);
  }

  closeProgressSpinner() {
    this.dialog.closeAll();
  }

}
