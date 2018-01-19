
import {ComponentsModule} from './components/components.module';
import {CommonModule} from './common/common.module';
import {FiltersModule} from './filters/filters.module';
import {ServicesModule} from './services/services.module.js';
import {AppComponent} from './app.component';
import {AppConfig} from './app.config';
import {AppConstants} from './app.constants';

// from env.js
// var env = {};
// if(window){
//   Object.assign(env, window.__env);
// }


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
    'moment-picker',
    ServicesModule,
    CommonModule,
    ComponentsModule,
    FiltersModule
  ])
  .constant('constants', AppConstants)
  .component('app', AppComponent)
  .config(AppConfig)
  .run(function($log){
    'nginject';
    $log.log("AppModule run");

  })
