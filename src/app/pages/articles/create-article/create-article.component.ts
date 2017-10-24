
import { Component, OnInit } from '@angular/core';
import { CKEditorComponent } from '../../editors/ckeditor/ckeditor.component'
import '../../editors/ckeditor/ckeditor.loader';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.services';
import { ArticleBackend, Template } from '../article.viewmodels'
import { NotificationService } from '../../components/notifications/notifications.service'
import 'style-loader!angular2-toaster/toaster.css';
import 'style-loader!ng2-file-input/ng2-file-input.scss';

@Component({
  selector: 'ngx-create-article',
  styleUrls: ['./create-article.component.scss'],
  templateUrl: './create-article.component.html',
})
export class CreateArticleComponent implements OnInit {

  id: string;
  errors: string[] = ['test 1', 'test 2', 'test 3'];
  ex: any;
  private sub: any;
  data = new ArticleBackend();
  constructor(private route: ActivatedRoute
    , private service: ArticleService
    , private notificationService: NotificationService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      // In a real app: dispatch action to load the details here.
      this.data.id = params['id']; // (+) converts string 'id' to a number      
      if (this.data.id != undefined) {
        this.fetchData();
      }
      else {
        this.getDefaultArticle();
      }
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getDefaultArticle(): void {
    this.service.getDefaultArticleWithPromise('vi-vn')
      .then(result => {
        if (result.isSucceed) {
          this.data = result.data;
        } else {
          this.errors = result.errors;
          this.ex = result.ex;
          this.showErrors();
        }
      },
      error => { });
  }
  fetchData(): void {
    this.service.getArticleWithPromise('vi-vn', this.data.id)
      .then(result => {
        if (result.isSucceed) {
          this.data = result.data;
        } else {
          this.errors = result.errors;
          this.ex = result.ex;
          this.showErrors();
        }
      },
      error => { });
  }
  setView(view: Template) {
    this.data.view = view;
  }
  submit(): void {
    console.log(this.data);
    this.showErrors();
  }
  showErrors(): void {
    this.errors.forEach(element => {
      this.notificationService.makeToast('error', '', element);
    });
  }
  onSelectFile(type: string, event: any): void {
    var myReader: FileReader = new FileReader();
    if (event.action === 1) {
      if (type === 'image') {
        myReader.readAsDataURL(event.file);
        myReader.onloadend = (e) => {
          this.data.image = myReader.result;
          this.data.imageFileStream = myReader.result;
        }
      } else {
        myReader.readAsDataURL(event.file);
        myReader.onloadend = (e) => {
          this.data.thumbnail = myReader.result;
          this.data.thumbnailFileStream = myReader.result;
        }

      }
    }
  }
}
