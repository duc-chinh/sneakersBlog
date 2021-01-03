import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  currentArticle: Article =
  {
    title: '',
    description: '',
    image: '',
    content: '',
    published: false
  };
  message = '';

  constructor(private articleService: ArticleService, private route: ActivatedRoute, private router: Router, public authService: AuthService)
  {
    
  }

  ngOnInit(): void
  {
    this.message = '';
    this.getArticle(this.route.snapshot.params.id);
  }

  getArticle(id: string): void
  {
    this.articleService.get(id)
      .subscribe(
        data =>
        {
          this.currentArticle = data;
          console.log(data);
        },
        err =>
        {
          console.log(err);
        }
    );
  }

  updatePublished(status: boolean): void
  {
    const data =
    {
      title: this.currentArticle.title,
      description: this.currentArticle.description,
      image: this.currentArticle.image,
      content: this.currentArticle.content,
      published: status
    };

    this.articleService.update(this.currentArticle.id, data).subscribe(
      res =>
      {
        this.currentArticle.published = status;
        console.log(res);
        this.message = res.message;
      },
      err =>
      {
        console.log(err);
      }
    );
  }

  updateArticle(): void
  {
    this.articleService.update(this.currentArticle.id, this.currentArticle).subscribe(
      res =>
      {
        console.log(res);
        this.message = res.message;
      },
      err =>
      {
        console.log(err);
      }
    );
  }

  deleteArticle(): void
  {
    this.articleService.delete(this.currentArticle.id).subscribe(
      res =>
      {
        console.log(res);
        this.router.navigate(['/articles']);
      },
      err =>
      {
        console.log(err);
      }
    );
  }
}
