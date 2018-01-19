export const template = `

  <header>
    <h2>Tasting List</h2>
  </header>

  <section>
    <tasting-list-item
      ng-repeat="tasting in $ctrl.tastings | orderBy:'-open_at'"
      ng-class="{'pending':tasting.status=='Pending', 'open':tasting.status=='Open'}"
      tasting="tasting"
      select-action="$ctrl.selectTasting(tasting)">
    </tasting-list-item>
  </section>

  <footer-menu></footer-menu>
`
