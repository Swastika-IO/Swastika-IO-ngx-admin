/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  production: true,
  apiUrl: "http://localhost:61136/",
  domain: "http://localhost:61136/",
  culture: 'vi-vn',
  pagingConfig: {
    endPoint: this.apiUrl,
    dataKey: 'data.items',
    pagerLimitKey: 'data.pageSize',
    pagerPageKey: 'data.pageIndex',
    totalKey: 'data.totalItems',

  }
};
