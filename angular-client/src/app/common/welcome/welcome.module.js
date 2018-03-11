
import {WelcomeAcceptInviteComponent} from './welcome-accept-invite/welcome-accept-invite.component';
import {WelcomeSigninComponent} from './welcome-signin/welcome-signin.component';
import {WelcomeSignupComponent} from './welcome-signup/welcome-signup.component';
import {WelcomeComponent} from './welcome.component';
import {WelcomePrivacyComponent} from './welcome-privacy/welcome-privacy.component';
import {WelcomeConfig} from './welcome.config';


export const WelcomeModule = angular
  .module('welcome',[])
  .component('welcome', WelcomeComponent)
  .component('welcomeAcceptInvite', WelcomeAcceptInviteComponent)
  .component('welcomePrivacy', WelcomePrivacyComponent)
  .component('welcomeSignin', WelcomeSigninComponent)
  .component('welcomeSignup', WelcomeSignupComponent)
  .config(WelcomeConfig)
  .name;
