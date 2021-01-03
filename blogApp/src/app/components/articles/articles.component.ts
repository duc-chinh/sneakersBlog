import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles?: Article[];
  currentArticle?: Article;
  currentIndex = -1;
  title = '';

  constructor(private articleService: ArticleService, public authService: AuthService, private router: Router)
  { 
    if(!this.authService.connectedUser)
      this.router.navigate(['/']);
  }

  ngOnInit(): void
  {
    this.retrieveArticles();
  }

  retrieveArticles(): void
  {
    this.articleService.getAll().subscribe(
      data =>
      {
        this.articles = data;
        console.log(data);
      },
      err =>
      {
        console.log(err);
      }
    );
  }

  setActiveArticle(article: Article, index: number): void
  {
    this.currentArticle = article;
    this.currentIndex = index;
  }
}
