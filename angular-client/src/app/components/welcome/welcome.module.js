import {WelcomeComponent} from './welcome-header.component';
import {WelcomeService} from './welcome.service';
import {WelcomeConfig} from './welcome.config';

export const WelcomeModule = angular
  .module('welcome',[
    'ui.router'
  ])
  .component('welcome', WelcomeComponent)
  .service('WelcomeService', WelcomeService)
  .config(WelcomeConfig)
  .name;
