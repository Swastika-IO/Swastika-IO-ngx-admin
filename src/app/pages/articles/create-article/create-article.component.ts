
import { Component, OnInit } from '@angular/core';
import '../../editors/ckeditor/ckeditor.loader';
import 'ckeditor';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.services';
import { ModuleDetailsService } from '../../../@swastika-io/components/module-details/module.details.service';
import { ModuleService } from '../../modules/module.service';
import { ModuleFullDetails, ArticleModuleNav, ArticleBackend, Template } from '../../../@swastika-io/viewmodels/article.viewmodels'
import { NotificationService } from '../../components/notifications/notifications.service'
import 'style-loader!angular2-toaster/toaster.css';
import 'style-loader!ng2-file-input/ng2-file-input.scss';

// import { CategoryNavsComponent } from '../../../@swastika-io/components/category-navigations/category-navigations'
// import { ModuleNavsComponent } from '../../../@swastika-io/components/module-navigations/module-navigations'
// import { ModuleDetailsComponent } from '../../../@swastika-io/components/module-details/module-details'
// import { ListModuleDetailsComponent } from '../../../@swastika-io/components/list-module-details/list-module-details'

@Component({
  selector: 'ngx-create-article',
  styleUrls: ['./create-article.component.scss'],
  templateUrl: './create-article.component.html',
  entryComponents: [
    // CategoryNavsComponent,
    // ModuleNavsComponent,
    // ModuleDetailsComponent,
    // ListModuleDetailsComponent,
  ]
})
export class CreateArticleComponent implements OnInit {

  id: string;
  errors: string[] = ['test 1', 'test 2', 'test 3'];
  ex: any;
  private sub: any;
  data = new ArticleBackend();
  activedModules: ModuleFullDetails[] = [];
  activedModule: ModuleFullDetails;
  constructor(private route: ActivatedRoute
    , private service: ArticleService
    , private moduleService: ModuleService
    , private moduleDetailsService: ModuleDetailsService
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
          result.data.activedModules.forEach(module => {
            this.moduleDetailsService.initModuleDetails(module, this.data.id);
          });
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
          result.data.activedModules.forEach(module => {
            this.moduleDetailsService.initModuleDetails(module, this.data.id);
          });
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

  onChange(navigation: ArticleModuleNav) {
    if (this.data.id != null) {
      const addUrl = 'api/' + navigation.specificulture + '/modules/addToArticle';
      this.moduleDetailsService.addToArticle(addUrl, navigation).then(addResult => {
        if (addResult.isSucceed) {
          this.modifyActivedModules(navigation);
        } else {
          this.errors = addResult.errors;
          this.ex = addResult.ex;
          this.showErrors();
        }
      });
    } else {
      this.modifyActivedModules(navigation);
    }

  }
  modifyActivedModules(navigation: ArticleModuleNav): void {
    this.moduleService.getFullModuleWithPromise(navigation.specificulture, navigation.moduleId)
      .then(result => {
        if (result.isSucceed) {
          if (navigation.isActived) {
            this.moduleDetailsService.initModuleDetails(result.data, this.data.id);
            this.data.activedModules.push(result.data);
          } else {
            var index = this.data.activedModules.findIndex(a => a.id == navigation.moduleId);
            if (index > -1) {
              this.data.activedModules.splice(index, 1);
            }
          }
        } else {
          this.errors = result.errors;
          this.ex = result.ex;
          this.showErrors();
        }
      });
  }

}
