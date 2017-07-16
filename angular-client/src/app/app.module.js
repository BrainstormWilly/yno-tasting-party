
import {ComponentsModule} from './components/components.module';
import {CommonModule} from './common/common.module';
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
    ServicesModule,
    CommonModule,
    ComponentsModule
  ])
  .constant('constants', AppConstants)
  .component('app', AppComponent)
  .config(AppConfig)
  .run(function($log, $state, $transitions, UserService){
    'nginject';
    $log.log("AppModule run");
    $transitions.onStart({}, function(trans){
      if( trans.to().name!="welcome" && trans.to().name!="welcome-signin" ){
        UserService.validateUser();
      }
    });

  })
