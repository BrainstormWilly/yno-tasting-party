export const template = `

  <a ui-sref="welcome-signin"
    ng-class="{'on':$ctrl.welcomeState==$ctrl.constants.WELCOME_SIGNIN_STATE}">
    <span class="fas fa-sign-in-alt"></span>
  </a>
  <a ui-sref='welcome-why'
    ng-class="{'on':$ctrl.welcomeState==$ctrl.constants.WELCOME_WHY_STATE}">
    <span class="fas fa-question"></span>
  </a>
  <a ui-sref='welcome-who'
    ng-class="{'on':$ctrl.welcomeState==$ctrl.constants.WELCOME_WHO_STATE}">
    <span class="fas fa-users"></span>
  </a>
  <a ui-sref='welcome-how'
    ng-class="{'on':$ctrl.welcomeState==$ctrl.constants.WELCOME_HOW_STATE}">
    <span class="fas fa-wine-glass"></span>
  </a>

`
