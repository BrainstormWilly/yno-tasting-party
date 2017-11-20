export const template = `
  <div class='tasting-detail-container'>
  <h3>{{$ctrl.tasting.name}}</h3>
    <div class="tasting-detail-info">
      <p>
        Host: {{$ctrl.tasting.host.taster.name}}<br/>
        {{$ctrl.tasting.openAt}}<br/>
        {{$ctrl.tasting.location.phone}}<br/>
        {{$ctrl.tasting.location.address}}<span ng-show="$ctrl.tasting.location.address2"> {{$ctrl.tasting.location.address}}</span><br/>
        {{$ctrl.tasting.location.city}}, {{$ctrl.tasting.location.state}} {{$ctrl.tasting.location.postal}}
      </p>
      <p ng-show="$ctrl.tasting.description">{{$ctrl.tasting.description}}</p>
    </div>
    <div>
      <h3>Wines</h3>
      <tasting-wine-list-item ng-repeat="wine in $ctrl.tasting.wines" tasting-wine="wine"></tasting-wine-list-item>
    </div>
    <div>
      <h3>Guests</h3>
      <guest-list-item ng-repeat="guest in $ctrl.tasting.guests" guest="guest"></guest-list-item>
    </div>
    
  </div>
`
