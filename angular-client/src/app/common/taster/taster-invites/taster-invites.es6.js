export const template = `
  <div class="main-header">
    <h2>Invites for {{$ctrl.taster.name}}</h2>
  </div>
  <div class='main-content'>
    <div class="taster-invites-wrapper">
      <tasting-list-item
        ng-repeat="tasting in $ctrl.tastings | orderBy: open_at"
        ui-sref="taster-invites-detail({tasting_id:tasting.id})"
        tasting="tasting">
      </tasting-list-item>
    </div>
  </div>
  <nav></nav>
`
