export const template =`
<div class="nav-wrapper" ng-class="{on:$ctrl.navOn}" ng-click="$ctrl.backgroundClick();">
  <nav ng-class="{'off':!$ctrl.navOn, 'on':$ctrl.navOn}">
    <a ui-sref='welcome-signin' ng-if="!$ctrl.signedIn">Sign In/Up<span class="fas fa-sign-in-alt"></span></a>
    <a ng-click="$ctrl.signoutUser()" ng-if="$ctrl.signedIn">Sign Out<span class="fas fa-sign-out-alt"></span></a>
    <a ui-sref='dashboard' ng-if="$ctrl.signedIn">Dashboard<span class="fas fa-tachometer-alt"></span></a>
    <a ui-sref='welcome-why' ng-if="!$ctrl.signedIn">Why Yno<span class="fas fa-question"></span></a>
    <a ui-sref='welcome-who' ng-if="!$ctrl.signedIn">Who can Yno<span class="fas fa-users"></span></a>
    <a ui-sref='welcome-how' >How to Yno<span class="fas fa-wine-glass"></a>
    <a ui-sref='tasting-new' ng-if="$ctrl.signedIn && $ctrl.isHost">Host New Tasting</a>
    <a href="http://ynoguy.com" target='_blank'>Blog</a>
    <a href >Contact</a>
    <a ui-sref='welcome-privacy' >Privacy</a>
  </nav>
  <a class="nav-button" href ng-click="$ctrl.navOn=!$ctrl.navOn; $event.stopPropagation()">
    <img src='assets/images/yno_icon_white.svg'>
  </a>
</div>

`
