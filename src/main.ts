/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { IUser } from './app/user-profile/user';
import axios from 'axios';



declare global {
  interface Window {
    isAuthenticated: boolean;
    userData: IUser;
  }
}


window.isAuthenticated = false

axios.defaults.withCredentials = true
  
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.isAuthenticated = false;
      // TODO: ADD REDIRECTION
    }
    return Promise.reject(error);
  }
);

axios
  .get('http://localhost:8000/api/user')
  .then( (response) => {
    window.isAuthenticated = true
    window.userData = response.data
  })
  .catch((e) => {
    window.isAuthenticated = false
  }).finally(() => {
    platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
  });