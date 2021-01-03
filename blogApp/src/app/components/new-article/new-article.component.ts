import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {
  article: Article =
  {
    title: '',
    description: '',
    image: '',
    content: '',
    published: false
  };
  submitted = false;

  constructor(private articleService: ArticleService, private authService: AuthService, private router: Router)
  {
    if(!this.authService.connectedUser)
      this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }

  saveArticle(): void
  {
    const data =
    {
      title: this.article.title,
      description: this.article.description,
      image: this.article.image,
      content: this.article.content
    };
    this.articleService.create(data).subscribe(
      res =>
      {
        console.log(res);
        this.submitted = true;
      },
      err =>
      {
        console.log(err);
      }
    );
  }

  newArticle(): void
  {
    this.submitted = false;
    this.article =
    {
      title: '',
      description: '',
      image: '',
      content: '',
      published: false
    };
  }
}
