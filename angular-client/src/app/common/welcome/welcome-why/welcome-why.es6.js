export const template = `

  <div class="welcome-background why">

    <div class="welcome-tagline">Ever shopped in a wine aisle? Yeah, that’s why.</div>

    <div class="welcome-hero-cover"></div>

    <div class="welcome-logo">
      <a ui-sref='welcome'><img src='assets/images/yno_tasting_logo_white.svg'></a>
      <desktop-nav-secondary  welcome-state="$ctrl.constants.WELCOME_WHY_STATE"></desktop-nav-secondary>
    </div>

    <div class="welcome-copy top">
      <h2>Why Yno?</h2>
      <p>As a <a target="_blank" href="https://ynoguy.com">wine educator and lover</a> I am constantly aggravated by misleading advice on how to choose wine. In America we’ve been taught that wine is for special occasions, or that good wine is at least 90 points. There are even questionaires, palette analyzers, and other gimmicky nonsense that are designed to <em>tell</em> you what to drink. The fact is, only <em>you</em> know what you like...and even that is subject to change.</p>
    </div>

    <div class="welcome-copy bottom">
      <p>That’s why I invented Yno Tasting–a wine tasting platform designed to help consumers discover wines in a blind comparative setting. Yno Tasting will help decide whether you like reds more than whites, chardonnays vs. viogniers, California vs. Washington... The comparisons are endless and with each tasting you learn a little more about what you like. Ultimately, it makes a wine aisle less intimidating.</p>
      <button class='text-btn' ui-sref='welcome-signup'>Wine Up Now!</button>
    </div>

    <div class="mobile-nav-spacer">&nbsp;</div>

  </div>

  <mobile-nav></mobile-nav>

`
