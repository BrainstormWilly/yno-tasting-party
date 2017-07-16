export const template = `
  <div class="dashboard">
    <h2>Dashboard for {{$ctrl.taster.name}}</h2>
    <a ui-sref="invites" class="dashboard-btn dashboard-highlight-btn animated bounceIn"><span class="dashboard-btn-number">{{$ctrl.taster.invite_count}}</span><span>Invites</span></a>
    <a ui-sref="taster-tastings({id: $ctrl.taster.id})" class="dashboard-btn"><span class="dashboard-btn-number">{{$ctrl.taster.guest_count}}</span><span>Tastings</span></a>
    <a ui-sref="reviews" class="dashboard-btn"><span class="dashboard-btn-number">{{$ctrl.taster.review_count}}</span><span>Wines</span></a>
  </div>

  <nav></nav>
`
