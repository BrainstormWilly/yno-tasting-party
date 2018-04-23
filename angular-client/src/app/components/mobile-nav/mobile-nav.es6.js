export const template =`

  <nav ng-class="{'off':!$ctrl.navOn, 'on':$ctrl.navOn}">
    <a href>Sign In/Up<span class="fas fa-sign-in-alt"></span></a>
    <a href>Why Yno<span class="fas fa-question"></span></a>
    <a href>Who can Yno<span class="fas fa-users"></span></a>
    <a href>How to Yno<span class="fas fa-wine-glass"></a>
    <a href>Blog</a>
    <a href>Contact</a>
    <a href>Privacy</a>
  </nav>
  <a class="nav-button" href ng-click="$ctrl.navOn=!$ctrl.navOn">
    <img src='assets/images/yno_icon_white.svg'>
  </a>


`
