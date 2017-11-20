export function AppConfig($authProvider, $logProvider, momentPickerProvider, constants) {
  'ngInject';

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
