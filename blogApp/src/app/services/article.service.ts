import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

const URL = 'http://localhost:3000/api/articles';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Article[]>
  {
    return this.http.get<Article[]>(URL);
  }

  getAllPublished(): Observable<Article[]>
  {
    return this.http.get<Article[]>(`${URL}/published`);
  }

  get(id: any): Observable<Article>
  {
    return this.http.get(`${URL}/${id}`);
  }

  create(data: any): Observable<any>
  {
    return this.http.post(URL, data);
  }

  update(id: any, data: any): Observable<any>
  {
    return this.http.put(`${URL}/${id}`, data);
  }

  delete(id: any): Observable<any>
  {
    return this.http.delete(`${URL}/${id}`);
  }

  findByTitle(title: any): Observable<Article[]>
  {
    return this.http.get<Article[]>(`${URL}?title=${title}`);
  }
}
