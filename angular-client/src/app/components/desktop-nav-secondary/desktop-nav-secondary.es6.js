export const template = `
<a ng-if="$ctrl.signedIn" ui-sref='dashboard'
  ng-class="{'on': $ctrl.welcomeState==$ctrl.constants.DASHBOARD_STATE}">
  Dashboard
</a>
<a ng-if="$ctrl.signedIn" href ng-click="$ctrl.signoutUser()" >
  Sign Out
</a>
<a ng-if="$ctrl.signedIn" href ng-click="$ctrl.newTasting()">
  Host New Tasting
</a>
<a ng-if="!$ctrl.signedIn" ui-sref='welcome-signin'
  ng-class="{'on': $ctrl.welcomeState==$ctrl.constants.WELCOME_SIGNIN_STATE}">
  Sign In
</a>
<a ng-if="!$ctrl.signedIn" ui-sref='welcome-why'
  ng-class="{'on': $ctrl.welcomeState==$ctrl.constants.WELCOME_WHY_STATE}">
  Why Yno
</a>
<a ng-if="!$ctrl.signedIn" ui-sref='welcome-who'
  ng-class="{'on': $ctrl.welcomeState==$ctrl.constants.WELCOME_WHO_STATE}">
  Who Can Yno
</a>
<a ui-sref='welcome-how'
  ng-class="{'on': $ctrl.welcomeState==$ctrl.constants.WELCOME_HOW_STATE}">
  How to Yno
</a>
<a href='http://ynoguy.com' target='_blank'>Blog</a>
<a ui-sref='welcome-contact'
  ng-class="{'on': $ctrl.welcomeState==$ctrl.constants.WELCOME_CONTACT_STATE}">Contact</a>
<a ui-sref='welcome-privacy'
  ng-class="{'on': $ctrl.welcomeState==$ctrl.constants.WELCOME_PRIVACY_STATE}">
  Privacy
</a>

`
