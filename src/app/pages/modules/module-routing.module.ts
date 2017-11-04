import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesComponent } from './articles.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { ListDraftArticlesComponent } from './list-draft-articles/list-draft-articles.component';

const routes: Routes = [{
  path: '',
  component: ArticlesComponent,
  children: [
    {
      path: 'list-articles',
      component: ListArticlesComponent,
    },
    {
      path: 'list-draft-articles',
      component: ListDraftArticlesComponent,
    },
    {
      path: 'create-article',
      component: CreateArticleComponent,
    },
    {
      path: 'create-article/:id',
      component: CreateArticleComponent,
    },    
    {
      path: 'edit-article/:id',
      component: EditArticleComponent,
    },
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
  EditArticleComponent,
  ListArticlesComponent,
  ListDraftArticlesComponent,
];
