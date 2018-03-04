export function AppConfig($authProvider, $locationProvider, $logProvider, momentPickerProvider, constants) {
  'ngInject';

  $locationProvider
    .html5Mode(true)
    .hashPrefix('');

  $logProvider.debugEnabled(constants.enableDebug);

  $authProvider
    .configure({
      apiUrl: constants.authUrl,
      validateOnPageLoad: false,
      storage: 'localStorage'
    });

  momentPickerProvider.options({
    startView: "month",
    today: true,
    format: "LL LT",
    minutesStep: 15
  })

}
