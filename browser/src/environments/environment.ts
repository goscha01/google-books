// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import  auth_config  from '../../../auth_config.json'
import app_config from '../../../app.config.json'

// const domain = "dev-relylk80.us.auth0.com"
// const clientId = "ndNhCuwDakrsOWU63ilo2DcRhfh6fePo"
const domain = auth_config.domain
const clientId = auth_config.clientId
const API_KEY = app_config.API_KEY
const BOOKS_URL = app_config.BOOKS_URL
const POSTGRES_URL = app_config.POSTGRES_URL

export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin
  },
  api: {
    API_KEY,
    BOOKS_URL,
    POSTGRES_URL
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
