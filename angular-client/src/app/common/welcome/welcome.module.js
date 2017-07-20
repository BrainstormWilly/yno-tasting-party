
// import {WelcomeService} from './welcome.service';
import {WelcomeSigninComponent} from './welcome-signin/welcome-signin.component';
import {WelcomeSignupComponent} from './welcome-signup/welcome-signup.component';
import {WelcomeComponent} from './welcome.component';
import {WelcomeConfig} from './welcome.config';


export const WelcomeModule = angular
  .module('welcome',[])
  .component('welcome', WelcomeComponent)
  .component('welcomeSignin', WelcomeSigninComponent)
  .component('welcomeSignup', WelcomeSignupComponent)
  .config(WelcomeConfig)
  .name;
