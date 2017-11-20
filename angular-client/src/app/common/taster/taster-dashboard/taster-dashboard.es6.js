export const template = `
  <div class="dashboard">
    <h2>Dashboard for {{$ctrl.taster.name}}</h2>
    <a ui-sref="taster-invites({id: $ctrl.taster.id})"
      class="dashboard-btn"
      ng-class="{'dashboard-highlight-btn animated bounceIn': $ctrl.taster.invite_count>0, disabled: $ctrl.taster.invite_count==0}">
        <span class="dashboard-btn-number">{{$ctrl.taster.invite_count}}</span>
        <span>Invites</span>
    </a>
    <a ui-sref="taster-tastings({id: $ctrl.taster.id})"
      class="dashboard-btn"
      ng-class="{disabled: $ctrl.taster.guest_count==0}">
        <span class="dashboard-btn-number">{{$ctrl.taster.guest_count}}</span>
        <span>Tastings</span>
    </a>
    <a ui-sref="reviews"
      class="dashboard-btn"
      ng-class="{disabled: $ctrl.taster.review_count==0}">
        <span class="dashboard-btn-number">{{$ctrl.taster.review_count}}</span>
        <span>Wines</span>
    </a>
  </div>

  <footer-menu></footer-menu>
`
