import { AccessTokenViewModel } from "app/@swastika-io/viewmodels/article.viewmodels";

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,  
  isBusy: false,
  apiUrl: "http://localhost:65493/api/",
  domain: "http://localhost:65493/",
  culture: 'vi-vn',//'en-UK',//
  pagingConfig: {
    endPoint: "http://localhost:65493/api/vi-vn/moduleData/",
    dataKey: 'data.items',
    pagerLimitKey: 'data.pageSize',
    pagerPageKey: 'data.pageIndex',
    totalKey: 'data.totalItems',

  },
  localStorageKeys:{
    accessToken: 'accessToken'
  },
  listSupportedCulture:[
    'vi-vn', 
    'en-UK',
  ]
};
