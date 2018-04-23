import {template} from './mobile-nav.es6';

export const MobileNavComponent = {
  template,
  controller: class MobileNavController{
    constructor($scope, $log){
      'ngInject';
      this.$scope = $scope;
      this.$log = $log;
      this.navOn = false;

    }


  }

}
