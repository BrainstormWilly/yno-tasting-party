export const template = `

  <div class="welcome-background">

    <div class="welcome-tagline">It’s the answer to finding that perfect wine...<br class="tag-break">and other stupid ideas.</div>

    <div class="welcome-hero-cover"></div>

    <div class="welcome-logo">
      <a href><img src='assets/images/yno_tasting_logo_white.svg'></a>
      <desktop-nav-secondary></desktop-nav-secondary>
    </div>

    <div class="welcome-copy top">
      <h2>Welcome to Yno</h2>
      <p>How do you choose wine? Pretentious point scores? Snooty experts? Trendy advertising? Pretty labels? So, how’s that working for you? The truth is one man’s syrah is another woman’s swill. Discovering new wine is personal and Yno is here to help. Just remember there is no <em>perfect</em> wine...only your next wine. So, let’s get started!</p>
    </div>

    <div class="welcome-copy bottom" >
      <p>Yno Tasting is a blind wine tasting event platform. It’s a fun way to for you and your friends to discover new wines the same way the experts do. You supply the wines and Yno will do the rest. “Wine up now” to get your first suggested list of wines easily found in most of the US.</p>
      <button class='text-btn' ui-sref="welcome-signup">Wine Up Now!</button>
    </div>

    <div class="mobile-nav-spacer"></div>
  </div>

  <mobile-nav></mobile-nav>
  <alerts-modal></alerts-modal>
  <notification></notification>

`
