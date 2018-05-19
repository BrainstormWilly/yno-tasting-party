export const template = `
<a ui-sref='user'><span class="fas fa-user-circle"></span></a>
<div>
  <h3>{{$ctrl.taster.name}}</h3>
  <h4 ng-if='$ctrl.taster.handle'>“{{$ctrl.taster.handle}}”</h4>
</div>
`
