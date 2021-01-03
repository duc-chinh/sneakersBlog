import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articles?: Article[];
  currentArticle?: Article;
  currentIndex = -1;
  title = '';

  constructor(private articleService: ArticleService, public authService: AuthService) { }

  ngOnInit(): void
  {
    this.retrieveArticles();
  }

  retrieveArticles(): void
  {
    this.articleService.getAllPublished().subscribe(
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

  searchTitle(): void
  {
    this.articleService.findByTitle(this.title).subscribe(
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
}
