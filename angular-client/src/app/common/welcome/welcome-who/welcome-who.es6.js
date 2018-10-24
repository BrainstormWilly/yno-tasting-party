export const template = `

  <div class="welcome-background who">

    <div class="welcome-tagline">Are you over 21? Do you like wine? <br class="tag-break">OK, you’re in.</div>

    <div class="welcome-hero-cover"></div>

    <div class="welcome-logo">
      <a ui-sref='welcome'><img src='assets/images/yno_tasting_logo_white.svg'></a>
      <desktop-nav-secondary  welcome-state="$ctrl.constants.WELCOME_WHO_STATE"></desktop-nav-secondary>
    </div>

    <div class="welcome-copy top">
      <h2>Who can Yno?</h2>
      <p>Whether you are wine newbie or a long time wine lover, Yno was designed for you. Enthusiasts can use Yno to compare new varietals or styles with their friends. Aspiring masters and somms can use Yno as a tool for recording their tasting prowess. All notes and ratings are stored for every taster to be reviewed later.</p>
    </div>

    <div class="welcome-copy bottom">
      <p>However, those new to wine can use Yno to learn what they like...one tasting at a time. Every new Yno Host gets a suggested tasting list they can use to get started. After they taste from the list they will get new lists based on their results. Hosts can continue to use suggested lists until they feel confident to make their own. In the end, Yno Hosts and their guests discover new wines–more importantly, they discover <em>their</em> wines.</p>
      <button class='text-btn' ui-sref='welcome-signup'>Wine Up Now!</button>
    </div>

    <div class="mobile-nav-spacer"></div>

  </div>

  <mobile-nav></mobile-nav>

`
