
// import {WelcomeService} from './welcome.service';
import {WelcomeSigninComponent} from './welcome-signin/welcome-signin.component';
import {WelcomeComponent} from './welcome.component';
import {WelcomeConfig} from './welcome.config';


export const WelcomeModule = angular
  .module('welcome',[])
  .component('welcome', WelcomeComponent)
  .component('welcomeSignin', WelcomeSigninComponent)
  .config(WelcomeConfig)
  .name;
