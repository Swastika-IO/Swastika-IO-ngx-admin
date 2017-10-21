import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.services';
import { ArticleBackend } from '../article.viewmodels'
import '../../editors/ckeditor/ckeditor.loader';
import 'ckeditor';
import 'ngx-input-file'

@Component({
  selector: 'ngx-edit-article',
  styleUrls: ['./edit-article.component.scss'],
  templateUrl: './edit-article.component.html',
})
export class EditArticleComponent {

  id: string;
  private sub: any;
  data = new ArticleBackend();
  constructor(private route: ActivatedRoute, private service: ArticleService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
      this.fetchData();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  fetchData(): void {
    this.service.getArticleWithPromise('vi-vn', this.id)
      .then(data => { this.data = data; },
      error => { });
  }
}
