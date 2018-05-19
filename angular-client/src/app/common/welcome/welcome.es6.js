export const template = `

  <div class="welcome-background">

    <div class="welcome-hero">
      <img src='assets/images/welcome/welcome-landing-hero.png'>
      <span>It’s the answer to finding that perfect wine... and other stupid ideas.</span>
    </div>

    <div class="welcome-hero-cover"></div>

    <div class="welcome-logo">
      <a href><img src='assets/images/yno_tasting_logo_white.svg'></a>
      <desktop-nav-secondary></desktop-nav-secondary>
    </div>

    <div class="welcome-copy top">
      <h2>Welcome to Yno</h2>
      <p>How do you choose wine? Pretentious point scores? Snooty experts? Trendy advertising? Pretty labels? So, how’s that working for you? Still hit and miss? The truth is one man’s syrah is another woman’s swill. Discovering wine is personal and Yno is here to help with that journey. Just remember there is no perfect wine...only your next wine. So, let’s get started!</p>
    </div>

    <div class="welcome-copy bottom" >
      <p>Yno Tasting is a wine tasting party platform. It’s a fun way to for you and your friends to discover new wines the same way the experts do. Not sure where to start? No problem. Sign up now and we’ll send you your first curated tasting list with full instructions on how to host a tasting party.</p>
      <button class='text-btn' ui-sref="welcome-signin">Wine Up Now!</button>
    </div>

    <desktop-nav-primary></desktop-nav-primary>
    <div class="mobile-nav-spacer"></div>
  </div>

  <mobile-nav></mobile-nav>
  <alerts-modal></alerts-modal>

`
