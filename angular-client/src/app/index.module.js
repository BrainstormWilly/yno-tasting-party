
import {ComponentsModule} from './components/components.module';
import {IndexComponent} from './index.component';

angular
  .module('ynoTasting', [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngMessages',
    'ngAria',
    'ngResource',
    'ui.router',
    ComponentsModule
  ])
  .component('app', IndexComponent)
