export const template = `

  <div class="welcome-background">

    <div class="welcome-hero">
      <img src="assets/images/welcome/welcome-who-hero.png">
      <span>Are you over 21? Do you like wine? OK, you’re in.</span>
    </div>

    <div class="welcome-hero-cover"></div>

    <div class="welcome-logo">
      <a ui-sref='welcome'><img src='assets/images/yno_tasting_logo_white.svg'></a>
      <desktop-nav-secondary  welcome-state="$ctrl.constants.WELCOME_WHO_STATE"></desktop-nav-secondary>
    </div>

    <div class="welcome-copy top">
      <h2>Who can Yno?</h2>
      <p>Whether you are wine newbie or a long time wine lover, Yno was designed for you.</p>
      <p>Enthusiasts can use Yno to compare new varietals or styles with their friends. Aspiring masters and somms can use Yno as a tool for recording their tasting prowess. All notes and ratings are stored for every taster to be reviewed later.</p>
    </div>

    <div class="welcome-copy bottom">
      <p>However, those new to wine can use Yno to learn what they like...one tasting at a time. Every new Yno Taster gets a curated tasting list of classic wines they can find in their local stores. After each completed tasting they will receive a new list based on their results. Ultimately, everyone who uses Yno Tasting will become more familiar with the wine styles, varietals, and regions they like.</p>
      <button class='text-btn' ui-sref='welcome-signup'>Wine Up Now!</button>
    </div>

    <desktop-nav-primary welcome-state="$ctrl.constants.WELCOME_WHO_STATE"></desktop-nav-primary>

    <div class="mobile-nav-spacer"></div>

  </div>

  <mobile-nav></mobile-nav>

`
