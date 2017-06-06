
import {ComponentsModule} from './components/components.module';
import {IndexComponent} from './index.component';
import {IndexConfig} from './index.config';

angular
  .module('ynoTasting', [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngMessages',
    'ngAria',
    'ngResource',
    'ng-token-auth',
    'ui.router',
    ComponentsModule
  ])
  .component('app', IndexComponent)
  .config(IndexConfig)
