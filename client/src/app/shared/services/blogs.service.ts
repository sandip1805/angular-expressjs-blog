import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(
    private api: ApiService
  ) {}

  getBlogs() {
    const politics = this.api.get(`politics`);
    const business = this.api.get(`business`);
    return forkJoin({politics: politics, business: business});
  }

  addBlog(body: any, blogType: any) {
    return this.api.post(`${blogType}`, body);
  }
}
