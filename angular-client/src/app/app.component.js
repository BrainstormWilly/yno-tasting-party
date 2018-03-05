export const AppComponent = {
  template:`
    <ui-view></ui-view>
  `,
  controller: class AppController{
    constructor($location, $window){
      'ngInject';

      if( $location.host()=="www.ynotasting.com" ) $window.location.href = "https://ynotasting.com" + $location.path();
      if( $location.host()=="ynotasting.com" && $location.protocol()=="http" ) $window.location.href = "https://ynotasting.com" + $location.path();

    }

  }
}
