
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import '../../editors/ckeditor/ckeditor.loader';
import 'ckeditor';
import 'ngx-input-file'

import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.services';
import { ArticleBackend } from '../article.viewmodels'


@Component({
  selector: 'ngx-create-article',
  styleUrls: ['./create-article.component.scss'],
  templateUrl: './create-article.component.html',
})
export class CreateArticleComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  id: string;
  private sub: any;
  data = new ArticleBackend();
  constructor(private route: ActivatedRoute, private service: ArticleService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      // In a real app: dispatch action to load the details here.
      this.data.id = params['id']; // (+) converts string 'id' to a number
      if (this.id !== undefined) {
        this.fetchData();
      } else {
        this.getDefaultArticle();
      }
    });
  }
  getDefaultArticle(): void {
    this.service.getDefaultArticleWithPromise('vi-vn')
      .then(result => { this.data = result.data; },
      error => { });
  }
  fetchData(): void {
    this.service.getArticleWithPromise('vi-vn', this.data.id)
      .then(result => { this.data = result.data; },
      error => { });
  }
  submit(): void {
  }
}
