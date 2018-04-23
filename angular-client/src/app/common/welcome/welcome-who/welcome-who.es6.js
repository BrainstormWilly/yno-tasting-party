export const template = `

  <div class="welcome-background">

    <div class="welcome-hero">
      <img src="assets/images/welcome/welcome-who-hero.png">
      <span>Are you over 21? Do you like wine? OK, you’re in.</span>
    </div>

    <div class="welcome-hero-cover"></div>

    <div class="welcome-logo">
      <a href ng-click="$ctrl.$state.go('welcome')"><img src='assets/images/yno_tasting_logo_white.svg'></a>
      <desktop-nav-secondary></desktop-nav-secondary>
    </div>

    <div class="welcome-copy top">
      <h2>Who can Yno?</h2>
      <p>Whether you are new to wine or a long time enthusiast, Yno is for you. Enthusiasts can use wine to explore new varietals and styles. Novices can participate in tastings or download our suggested tasting lists to host their own. With each new tasting anyone can expand their knowledge of wines they like.</p>
    </div>

    <div class="welcome-copy bottom">
      <p>The secret is tasting wine blind. No fancy labels, flowery descriptions, or expert opinions. There is only you and what’s in the glass. You either like it, or you don’t... and that’s all that matters, right? Anyone who signs up to Yno Tasting is a taster. Any taster can sign up for free to be a host. Only hosts can host tastings and invite other tasters to be their guests.</p>
    </div>

    <desktop-nav-primary welcome-state="$ctrl.constants.WELCOME_WHO_STATE"></desktop-nav-primary>

  </div>

  <mobile-nav></mobile-nav>

`
