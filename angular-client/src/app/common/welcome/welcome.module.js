
import {WelcomeAcceptInviteComponent} from './welcome-accept-invite/welcome-accept-invite.component';
import {WelcomeAlexaComponent} from './welcome-alexa/welcome-alexa.component';
import {WelcomeAlexaTermsComponent} from './welcome-alexa-terms/welcome-alexa-terms.component';
import {WelcomeContactComponent} from './welcome-contact/welcome-contact.component';
import {WelcomeHowComponent} from './welcome-how/welcome-how.component';
import {WelcomeSigninComponent} from './welcome-signin/welcome-signin.component';
import {WelcomeSignupComponent} from './welcome-signup/welcome-signup.component';
import {WelcomeComponent} from './welcome.component';
import {WelcomeWhoComponent} from './welcome-who/welcome-who.component';
import {WelcomePasswordResetComponent} from './welcome-password-reset/welcome-password-reset.component';
import {WelcomePrivacyComponent} from './welcome-privacy/welcome-privacy.component';
import {WelcomeWhyComponent} from './welcome-why/welcome-why.component';
import {WelcomeConfig} from './welcome.config';
import {WelcomeConstants} from './welcome.constants';


export const WelcomeModule = angular
  .module('welcome',[])
  .component('welcome', WelcomeComponent)
  .component('welcomeAcceptInvite', WelcomeAcceptInviteComponent)
  .component('welcomeAlexa', WelcomeAlexaComponent)
  .component('welcomeAlexaTerms', WelcomeAlexaTermsComponent)
  .component('welcomeContact', WelcomeContactComponent)
  .component('welcomeHow', WelcomeHowComponent)
  .component('welcomePasswordReset', WelcomePasswordResetComponent)
  .component('welcomePrivacy', WelcomePrivacyComponent)
  .component('welcomeSignin', WelcomeSigninComponent)
  .component('welcomeSignup', WelcomeSignupComponent)
  .component('welcomeWho', WelcomeWhoComponent)
  .component('welcomeWhy', WelcomeWhyComponent)
  .constant('welcomeConstants', WelcomeConstants)
  .config(WelcomeConfig)
  .name;
