export const template = `

  <div class="welcome-background">

    <div class="welcome-hero">
      <img src='{{$ctrl.heroImg}}'>
      <span>{{$ctrl.tagline}}</span>
    </div>

    <div class="welcome-hero-cover"></div>

    <div class="welcome-logo">
      <a href><img src='assets/images/yno_tasting_logo_white.svg'></a>
      <desktop-nav-secondary></desktop-nav-secondary>
    </div>

    <div class="welcome-copy top">
      <h2>Welcome to Yno</h2>
      <p>How do you choose wine? Pretentious point scores? Snooty experts? Trendy advertising? Pretty labels? So, how’s that working for you? The truth is one man’s favorite syrah is another’s swill. Discovering wine is a journey. There are no perfect wines, just your wines. Let’s find them!</p>
    </div>

    <div class="welcome-copy bottom">
      <p>Yno Tasting is a wine tasting party platform. It’s a fun way to for you and your friends to discover new wines they same way the experts do. Maybe you’ve seen <strong>Somm</strong> or heard about the blind wine tastings experts have to perform to get their certification. The same method is the best way for anyone to learn what wines they like.</p>
      <p>Sounds intimidating? Maybe too scary? Nobody said learning about wine was easy...but it sure beats an evening of Parcheesi and Cheetos.</p>
    </div>

    <desktop-nav-primary></desktop-nav-primary>

  </div>

  <mobile-nav></mobile-nav>

`
