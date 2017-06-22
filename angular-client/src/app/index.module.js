
// import {ComponentsModule} from './components/components.module';
import {CommonModule} from './common/common.module';
import {ServicesModule} from './services/services.module.js';
import {IndexComponent} from './index.component';
import {IndexConfig} from './index.config';
import {IndexConstants} from './index.constants';

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
    CommonModule

  ])
  .constant('constants', IndexConstants)
  .component('app', IndexComponent)
  .config(IndexConfig)
  .run(function($rootScope, $log){
    'nginject';
    $log.log('IndexModule run');
  })
