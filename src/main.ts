/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { IUser } from './app/user-profile/user';
import { Router } from '@angular/router';
import axios from 'axios';



declare global {
  interface Window {
    isAuthenticated: boolean;
    userData: IUser;
  }
}


window.isAuthenticated = false

axios.defaults.withCredentials = true

let router : Router
  
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.isAuthenticated = false;
      
      // TODO: ADD REDIRECTION
      if (router) {
        router.navigate(['login'])
      }
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
  .catch(() => {
    window.isAuthenticated = false
  }).finally(() => {
    platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
  });