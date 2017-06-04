import {WelcomeModule} from './welcome/welcome.module';

export const ComponentsModule = angular
  .module('ynoTasting.components', [
    WelcomeModule
  ])
  .name;
