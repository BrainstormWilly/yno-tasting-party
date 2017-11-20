export const template = `
  <div class="footer" ng-class="{open : nav_open, closed : !nav_open}">
    <a href ng-click="nav_open = !nav_open"><img id="nav-logo" src='assets/images/yno_icon_white.svg'></a>
    <ul>
      <li><a ui-sref="taster-dashboard">Dashboard</a></li>
      <li><a ui-sref="tasting-new">Host A Tasting</a></li>
      <li><a ui-sref="user">Profile</a></li>
      <li><a href ng-click="$ctrl.signOut()">Sign Out</a></li>
    </ul>
  </div>
`
