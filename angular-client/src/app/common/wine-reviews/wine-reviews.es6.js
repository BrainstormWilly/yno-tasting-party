export const template = `
<header>
  <h2>Wine Reviews</h2>
</header>

<sort-bar
  fields="$ctrl.sortFields"
  select-action="$ctrl.changeSorting(field)">
</sort-bar>

<section>
  <wine-list-item
    ng-repeat="review in $ctrl.reviews | orderBy:$ctrl.sortField:$ctrl.sortDesc"
    wine-view="wines"
    wine-item="review"
    select-action="$ctrl.openWineModal(review)">
  </wine-list-item>
</section>

<footer-menu></footer-menu>
<wine-info-modal></wine-info-modal>
`
