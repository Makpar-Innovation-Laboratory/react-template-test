// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { News } from "src/app/models/news";

export const environment = {
  host: '/api',
  mock: false,
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

export const TEST_ID = 57;
export const TEST_NEWS : News = {
    news_id: TEST_ID, 
    submitted: null,
    subject: null,
    title: null,
    snippet: null,
    content: null,
    comments: [],
    author: null
}
export const TEST_RESULT={
  results: [ TEST_NEWS ]
}