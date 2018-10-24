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
      <p>Your wine glass in one hand. Canapé in the other. How do you rate wine 1? Just tell Alexa. Yno Tasting is fully <em>Alexified</em>. Every Yno Guest can use Alexa through out a tasting to rate, comment, and get tasting stats. Yno Hosts add the <a href='https://www.amazon.com/Brainstorm-Creative-Wine-Trivia/dp/B071Y1HRP1/ref=sr_1_1?s=digital-skills&ie=UTF8&qid=1524978656&sr=1-1&keywords=wine+trivia' target='_blank'>Yno Tasting Alexa Skill</a> to any Amazon Echo device. Whenever you have a live tasting in progress you can tell Alexa to, “open wine tastng” and she will find it. Then, you and your guests can record their ratings and comments by referencing the taster number next to their name in the Yno Tasting app.</p>
    </div>

    <div class="welcome-copy bottom">
      <p>Ask Alexa:<br>
        <ul>
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
