export const template = `

  <div class="welcome-background">

    <div class="welcome-hero">
      <img src="assets/images/welcome/welcome-how-hero.png">
      <span>It’s blind wine tastings with friends... what could go wrong?</span>
    </div>

    <div class="welcome-hero-cover"></div>

    <div class="welcome-logo">
      <a href ng-click="$ctrl.$state.go('welcome')"><img src='assets/images/yno_tasting_logo_white.svg'></a>
      <desktop-nav-secondary></desktop-nav-secondary>
    </div>

    <div class="welcome-copy top">
      <h2>Bag it. Tag it. Taste it. Rate it. Repeat.</h2>
      <p>Tasting wine blind is simple. Sign up as a Yno Tasting Host. Use Yno Tasting List or go to the store and pick 6 wines on your own (be sure to get a few extra bottle bags). Host a new tasting. Give it a name and date. Invite your friends. Get ready to party!</p>
    </div>

    <div class="welcome-copy bottom">
      <p>On tasting day, open an bag your wines. Download the Yno Tasting Alexa app. When your first guest arrives, ask her to number the bags (while you're not looking). Now you’re double blind! When everyone is present open the tasting. Track your tasting progress. When all ratings are in, close the tasting and reveal the wines.</p>
    </div>

    <desktop-nav-primary welcome-state="$ctrl.constants.WELCOME_HOW_STATE"></desktop-nav-primary>

  </div>

  <mobile-nav></mobile-nav>

`
