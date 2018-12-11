export const template = `

  <div class="welcome-background alexa">

    <div class="welcome-hero-cover"></div>

    <div class="welcome-tagline">Put the phone down! Tell to Alexa instead.</div>

    <div class="welcome-logo">
      <a ui-sref='welcome'><img src='assets/images/yno_tasting_logo_white.svg'></a>
      <desktop-nav-secondary welcome-state="$ctrl.constants.WELCOME_HOW_STATE"></desktop-nav-secondary>
    </div>

    <div class="welcome-copy top">
      <h2>Alexa. Party rescue.</h2>
      <p>Your wine glass in one hand. Canapé in the other. How do you rate wine 1? Just tell Alexa. Yno Tasting is fully <em>Alexified</em>. <a ui-sref="welcome-how">Yno Hosts</a> can link their account to the <a href='https://alexa.amazon.com/spa/index.html#skills/dp/B07L84XRTR/?ref=skill_dsk_skb_sr_0&qid=1544509373' target='_blank'>Yno Tasting Alexa Skill</a> on any Amazon Echo device. Whenever you have a live tasting in progress you can tell Alexa to, “open wine tastng” and she will find it. Once signed in, all tasting guests can record their ratings and comments with Alexa by referencing the taster number next to their handle in the Yno Tasting app. If they remember their number they’ll never have look at your phone again until the tasting is over.</p>
    </div>

    <div class="welcome-copy bottom">
      <p>Ask Alexa:<br>
        <ul>
          <li>Alexa, open wine tasting</li>
          <li>Alexa, tell wine tasting to rate wine 1</li>
          <li>Alexa, tell wine tasting to add a comment for wine 1</li>
          <li>Alexa, ask wine tasting what the average rating is for wine 1</li>
          <li>Alexa, ask wine tasting for my ratings</li>
          <li>Alexa, ask wine tasting for tasting stats</li>
        </ul>
      </p>
      <div>
        <button class='text-btn' ui-sref="welcome-signup">Wine Up Now!</button>
      </div>
    </div>

    <div class="mobile-nav-spacer"></div>
  </div>

  <mobile-nav></mobile-nav>

`
