export const template = `

  <div class="welcome-background">

    <div class="welcome-hero-cover"></div>

    <div class="welcome-tagline">No lawyers were hired nor harmed while <br class="tag-break">writing this copy</div>

    <div class="welcome-logo">
      <a ui-sref='welcome'><img src='assets/images/yno_tasting_logo_white.svg'></a>
      <desktop-nav-secondary welcome-state="$ctrl.constants.WELCOME_PRIVACY_STATE"></desktop-nav-secondary>
    </div>

    <div class="welcome-copy top">
      <h2>Privacy</h2>
      <h3>What we store</h3>
      <p><strong>For all tasters:</strong> email, birthdate, name, handle, wines, ratings, and comments.<br>
      <strong>For all hosts:</strong> same as tasters as well as host locations.</p>
    </div>

    <div class="welcome-copy bottom">
      <h3>What we share</h3>
      <p>Currently, nothing. All tasters will be notified prior any future change to policy.</p>
      <h3>About emails</h3>
      <p>We take your privacy seriously. Emails are never shared within or outside the Yno platform. All tasters are identified by name or handle. We promise to never share emails regardless of future policy changes.</p>
    </div>

    <div class="mobile-nav-spacer"></div>

  </div>

  <mobile-nav></mobile-nav>

`
