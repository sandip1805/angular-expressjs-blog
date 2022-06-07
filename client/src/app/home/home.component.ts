import { Component, OnInit } from '@angular/core';
import { Blog, Blogs } from '../shared/models/blog.model';
import { BlogsService } from '../shared/services/blogs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  politicsData!: Blog[];
  businessData!: Blog[];

  constructor(
    private blogSvc: BlogsService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.blogSvc.getBlogs().subscribe((res: Blogs) => {
      console.log(res);
      this.politicsData = res?.politics;
      this.businessData = res?.business;
    })
  }

  onSaveBlog() {
    this.loadData();
  }
}
