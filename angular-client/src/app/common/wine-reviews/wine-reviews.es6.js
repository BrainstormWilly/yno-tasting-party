export const template = `
<header>
  <h2>Wine Reviews</h2>
</header>

<section>
  <wine-list-item
    ng-repeat="review in $ctrl.reviews"
    wine-view="wines"
    wine-item="review">
  </wine-list-item>
</section>

<footer-menu></footer-menu>
`
