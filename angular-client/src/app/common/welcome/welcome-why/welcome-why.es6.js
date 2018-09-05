export const template = `

  <div class="welcome-background">

    <div class="welcome-hero">
      <img src="assets/images/welcome/welcome-why-hero.png">
      <span>Ever perused a wine aisle? Yeah, that’s why.</span>
    </div>

    <div class="welcome-hero-cover"></div>

    <div class="welcome-logo">
      <a ui-sref='welcome'><img src='assets/images/yno_tasting_logo_white.svg'></a>
      <desktop-nav-secondary  welcome-state="$ctrl.constants.WELCOME_WHY_STATE"></desktop-nav-secondary>
    </div>

    <div class="welcome-copy top">
      <h2>Why Yno?</h2>
      <p>As a wine educator and lover I am constantly aggravated by all the misleading advice on how to choose wine. In America we’ve been taught that wine is for special occasions, or that good wine is at least 90 points. There are even questionaires, palette analyzers, and other gimmicky nonsense that are designed to <em>tell</em> you what to drink. The fact is, only <em>you</em> know what you like...and even that is subject to change.</p>
    </div>

    <div class="welcome-copy bottom">
      <p>That’s why I developed Yno Tasting. A blind wine tasting platform designed to help consumers discover what wines they like in a comparative setting. Yno Tasting will help decide whether you like reds more than whites, chardonnays more than viogniers, Oregon Pinots...virtually any question you have about wine can be answered in a blind tasting. It’s fun, it’s informative and, ultimately, it will help you feel confident in choosing from a wine list or aisle.</p>
      <button class='text-btn' ui-sref='welcome-signup'>Wine Up Now!</button>
    </div>

    <desktop-nav-primary welcome-state="$ctrl.constants.WELCOME_WHY_STATE"></desktop-nav-primary>

    <div class="mobile-nav-spacer"></div>

  </div>

  <mobile-nav></mobile-nav>

`
