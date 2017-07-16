export const AppComponent = {
  template:`
    <ui-view></ui-view>
  `,
  controller: class AppController{
    constructor($scope, $log, $state){
      'ngInject';
      this.$log = $log;
      this.$state = $state;

      // let validationSuccess = $scope.$on('auth:validation-success', (e,d) => {
      //   $log.log('AppComponent: validationSuccess');
      //   TasterService.loadTaster(d.id);
      // });

      // let tasterChangeEvent = $scope.$on('taster-change-event', (e,d) => {
      //   $log.log('AppComponent: tasterChangeEvent');
      //   this.taster = d;
      // });

      // $scope.$on('$destroy', validationSuccess);
      // $scope.$on('$destroy', tasterChangeEvent);

    }

    $onInit() {
      // this.$log.log("AppComponent $onInit");
    }

  }
}
