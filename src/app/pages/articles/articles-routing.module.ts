import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesComponent } from './articles.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ListArticlesComponent } from './list-articles/list-articles.component';

const routes: Routes = [{
  path: '',
  component: ArticlesComponent,
  children: [
    {
      path: 'list-articles',
      component: ListArticlesComponent,
    },
    {
      path: 'create-article',
      component: CreateArticleComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesRoutingModule { }

export const routedComponents = [
  ArticlesComponent,
  CreateArticleComponent,
  ListArticlesComponent,
];
