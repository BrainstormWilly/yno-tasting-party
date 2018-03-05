export function AppConfig(
  $authProvider,
  $locationProvider,
  $logProvider,
  $urlRouterProvider,
  momentPickerProvider,
  constants) {

    'ngInject';

    $locationProvider.html5Mode({enabled:true, requireBase:false});

    $logProvider.debugEnabled(constants.enableDebug);

    $authProvider.configure({
      apiUrl: constants.authUrl,
      validateOnPageLoad: false,
      storage: 'localStorage'
    });

    $urlRouterProvider.otherwise(($stateParams, $location, $state, $log)=>{
      $log.log("AppConfig");
      if( $stateParams.go ){
        $state.go($stateParams.go);
      }else{
        $state.go("/");
      }
    });

    momentPickerProvider.options({
      startView: "month",
      today: true,
      format: "LL LT",
      minutesStep: 15
    });


}
