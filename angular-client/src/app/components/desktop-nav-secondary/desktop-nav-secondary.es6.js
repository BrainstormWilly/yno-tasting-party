export const template = `
<a ui-sref='dashboard' >
  Dashboard
</a>
<a ng-if="$ctrl.signoutState" href ng-click="$ctrl.signoutUser()" >
  Sign Out
</a>
<a ng-if="$ctrl.howState" ui-sref='welcome-signin' >
  Sign In
</a>
<a ng-if="$ctrl.howState" ui-sref='welcome-why' >
  Why Yno
</a>
<a ng-if="$ctrl.howState" ui-sref='welcome-who' >
  Who Can Yno
</a>
<a ng-if="$ctrl.signoutState" ui-sref='welcome-how' >
  How to Yno
</a>
<a href='http://ynoguy.com' target='_blank'>Blog</a>
<a href>Contact</a>
<a ui-sref='welcome-privacy'"
  ng-class="{'on': $ctrl.welcomeState==$ctrl.constants.WELCOME_PRIVACY_STATE}">
  Privacy
</a>

`
