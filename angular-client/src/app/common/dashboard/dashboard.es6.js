export const template = `
  <h2>Dashboard for {{$ctrl.taster.name}}</h2>
  <p><a ui-sref="tastings">Tastings: {{$ctrl.taster.guest_count}}</a></p>
  <p><a ui-sref="reviews">Wines Reviewed: {{$ctrl.taster.review_count}}</a></p>
  <p><a ui-sref="invites">Current Invites: {{$ctrl.taster.invite_count}}</a></p>
`
