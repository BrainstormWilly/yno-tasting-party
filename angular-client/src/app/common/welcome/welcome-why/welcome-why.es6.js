export const template = `

  <div class="welcome-background">

    <div class="welcome-hero">
      <img src="assets/images/welcome/welcome-why-hero.png">
      <span>Ever perused a wine aisle? Yeah, that’s why.</span>
    </div>

    <div class="welcome-hero-cover"></div>

    <div class="welcome-logo">
      <a href ng-click="$ctrl.$state.go('welcome')"><img src='assets/images/yno_tasting_logo_white.svg'></a>
      <desktop-nav-secondary></desktop-nav-secondary>
    </div>

    <div class="welcome-copy top">
      <h2>Why Yno?</h2>
      <p>Few products can be more confounding than wine. So many varietals, styles, and prices...I’ll just have beer, thanks. There is an abundance of expert advice out there, but does it really help you find your next wine? The wine you like? Let’s face it. Only you know that. That’s why I invented Yno Tasting. Not to <em>tell</em> you what your next wine is, but to help you find it for yourself.</p>
    </div>

    <div class="welcome-copy bottom">
      <p>However, there’s more to this venture than just your wine narcissism. The wine industry is under siege. There’s a whole lot of marketing out there trying to take advantage of your naiveté. They’re producing “lifestyle wines” with lots of expensive advertising with images of pretty smiling people. That’s not wine. That’s a soft drink. Real wine comes from a vineyard, is hand crafted, and doesn’t live in a 7-Eleven.</p>
    </div>

    <desktop-nav-primary welcome-state="$ctrl.constants.WELCOME_WHY_STATE"></desktop-nav-primary>

  </div>

  <mobile-nav></mobile-nav>

`
