export const template = `

<a href='http://ynoguy.com' target='_blank'>Blog</a>
<a href>Contact</a>
<a ui-sref='welcome-privacy'"
  ng-class="{'on': $ctrl.welcomeState==$ctrl.constants.WELCOME_PRIVACY_STATE}">
  Privacy
</a>

`
