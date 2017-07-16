export function AppConfig($authProvider, $logProvider, constants) {
  'ngInject';

  $logProvider.debugEnabled(constants.enableDebug);

  $authProvider
    .configure({
      apiUrl: constants.authUrl,
      validateOnPageLoad: false,
      storage: 'localStorage'
    });

}
