export const template = `

  <header>
    <h2 ng-hide="$ctrl.tasterNumber==0">{{$ctrl.taster.handle}} <small>(Taster {{ $ctrl.tasterNumber }})</small></h2>
    <h2 ng-show="$ctrl.tasterNumber==0">{{ $ctrl.taster.handle }} <small>(Host)</small></h2>
  </header>

  <section>
    <tasting-detail ng-cloak
      taster="$ctrl.taster"
      tasting="$ctrl.tasting"
      taster-is-host="$ctrl.tasterIsHost">
    </tasting-detail>
  </section>

  <footer-menu></footer-menu>
  <notification></notification>

  `
