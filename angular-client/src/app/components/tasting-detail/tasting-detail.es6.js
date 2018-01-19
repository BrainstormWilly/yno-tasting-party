export const template = `

  <div class='tasting-detail-container' ng-if="$ctrl.tasting.is_pending">
    <div class="tasting-detail-info">
      <button class="small-btn"
        ng-if="$ctrl.tasterIsHost"
        ng-click="$ctrl.openTastingDetailModal()">
        <span class="fa fa-pencil"></span>
      </button>
      <div class="status pending">{{$ctrl.displayTime}}</div>
      <h3>{{$ctrl.tasting.name}}</h3>
      <div class="details">
        <p>
          <span class="subtitle">Hosted by:<br/></span>
          {{$ctrl.tasting.host.taster.name}}<br/>
          {{$ctrl.tasting.location.phone}}<br/>
          {{$ctrl.tasting.location.address}}<span ng-show="$ctrl.tasting.location.address2"> {{$ctrl.tasting.location.address}}</span><br/>
          {{$ctrl.tasting.location.city}}, {{$ctrl.tasting.location.state}} {{$ctrl.tasting.location.postal}}
        </p>
        <p ng-show="$ctrl.tasting.description">
          <span class="subtitle">Description:<br/></span>
          {{$ctrl.tasting.description}}
        </p>
      </div>

    </div>
    <div>
      <h3>Wines <button class="small-btn" ng-show="$ctrl.tasterIsHost" ng-click="$ctrl.openTastingWineModal()"><span class="fa fa-plus"></span></button></h3>
      <wine-list-item
        ng-repeat="wine in $ctrl.tasting.tasting_wines"
        wine-item="wine"
        wine-view="tastingPending"
        editable="$ctrl.tasterIsHost"
        delete-action="$ctrl.attemptDestroyTastingWine(wine)"
        select-action="$ctrl.openWineInfoModal(wine)">
      </wine-list-item>
    </div>
    <div>
      <h3>Guests <button class="small-btn" ng-show="$ctrl.tasterIsHost"><span class="fa fa-plus" ng-click="$ctrl.openGuestModal()"></span></button></h3>
      <guest-list-item
        ng-repeat="guest in $ctrl.tasting.guests"
        guest="guest"
        editable="$ctrl.guestIsEditable(guest)"
        delete-action="$ctrl.attemptDestroyGuest(guest)"
        select-action="$ctrl.showGuest(guest)">
      </guest-list-item>
    </div>
  </div>

  <div class='tasting-detail-container' ng-if="$ctrl.tasting.is_open">
    <div class="tasting-detail-info">
      <button class="small-btn"
        ng-show="$ctrl.tasterIsHost"
        ng-click="$ctrl.openTastingDetailModal()">
        <span class="fa fa-pencil"></span>
      </button>

      <div class="status">{{$ctrl.displayTime}}</div>
      <h3>{{$ctrl.tasting.name}}</h3>
      <div class="details">
        <p>
          <span class="subtitle">Hosted by:<br/></span>
          {{$ctrl.tasting.host.taster.name}}<br/>
          {{$ctrl.tasting.location.phone}}<br/>
          {{$ctrl.tasting.location.address}}<span ng-show="$ctrl.tasting.location.address2"> {{$ctrl.tasting.location.address}}</span><br/>
          {{$ctrl.tasting.location.city}}, {{$ctrl.tasting.location.state}} {{$ctrl.tasting.location.postal}}
        </p>
        <p ng-show="$ctrl.tasting.description">
          <span class="subtitle">Description:<br/></span>
          {{$ctrl.tasting.description}}
        </p>
      </div>
      <button class="text-btn"
        ng-click="$ctrl.attemptCloseTasting()"
        ng-if="$ctrl.tasterIsHost"
        ng-disabled="$ctrl.tasting.tasting_progress<=0">
          Close Tasting Now
      </button>
    </div>
    <div>
      <toggle-switch
        toggle-trigger="$ctrl.toggleOpenViewState(state)"
        toggle-state="$ctrl.openViewState"
        toggle-label="$ctrl.openViewLabel"
        toggle-disabled="$ctrl.tasterIsHost && $ctrl.tasting.host_is_not_tasting">
      </toggle-switch>
    </div>
    <div ng-if="$ctrl.tasting.tasting_progress>0">
      <h3>Progress</h3>
      <progress-bar value="$ctrl.tasting.taster_progress" ng-hide="$ctrl.openViewState"></progress-bar>
      <progress-bar value="$ctrl.tasting.tasting_progress" ng-show="$ctrl.openViewState"></progress-bar>
    </div>
    <div ng-hide="$ctrl.openViewState">
      <h3>Your Ratings </h3>
      <wine-list-item
        ng-repeat="review in $ctrl.tasting.taster_wine_reviews"
        wine-view="tasterRating"
        wine-item="review"
        select-action="$ctrl.openWineReviewModal(review)">
      </wine-list-item>
    </div>
    <div ng-show="$ctrl.openViewState">
      <h3>Average Ratings</h3>
      <wine-list-item
        ng-repeat="review in $ctrl.tasting.taster_wine_reviews"
        wine-item="review"
        wine-view="averageRating"
        select-action="$ctrl.openWineReviewStatusModal(review)">
      </wine-list-item>
    </div>
    <div ng-show="$ctrl.openViewState">
      <h3>Guests <button class="small-btn" ng-show="$ctrl.tasterIsHost"><span class="fa fa-plus" ng-click="$ctrl.openGuestModal()"></span></button></h3>
      <guest-list-item
        ng-repeat="guest in $ctrl.tasting.guests"
        guest="guest"
        editable="$ctrl.guestIsEditable(guest)"
        delete-action="$ctrl.attemptDestroyGuest(guest)"
        select-action="$ctrl.showGuest(guest)">
      </guest-list-item>
    </div>
  </div>

  <div class='tasting-detail-container' ng-if="$ctrl.tasting.is_closed">
    <div class="tasting-detail-info">
      <button class="small-btn"
        ng-show="$ctrl.tasterIsHost"
        ng-click="$ctrl.openTastingDetailModal()">
        <span class="fa fa-pencil"></span>
      </button>
      <div class="status closed">{{$ctrl.displayTime}}</div>
      <h3>{{$ctrl.tasting.name}}</h3>
      <div class="details">
        <p>
          <span class="subtitle">Hosted by:<br/></span>
          {{$ctrl.tasting.host.taster.name}}<br/>
          {{$ctrl.tasting.location.phone}}<br/>
          {{$ctrl.tasting.location.address}}<span ng-show="$ctrl.tasting.location.address2"> {{$ctrl.tasting.location.address}}</span><br/>
          {{$ctrl.tasting.location.city}}, {{$ctrl.tasting.location.state}} {{$ctrl.tasting.location.postal}}
        </p>
        <p ng-show="$ctrl.tasting.description">
          <span class="subtitle">Description:<br/></span>
          {{$ctrl.tasting.description}}
        </p>
      </div>
      <button class="text-btn"
        ng-click="$ctrl.completeTasting()"
        ng-if="$ctrl.tasterIsHost"
        ng-disabled="!$ctrl.completeNotice">
          Complete Tasting
      </button>
    </div>
    <div>
      <toggle-switch
        toggle-trigger="$ctrl.toggleOpenViewState(state)"
        toggle-state="$ctrl.openViewState"
        toggle-label="$ctrl.openViewLabel"
        toggle-disabled="$ctrl.tasterIsHost && $ctrl.tasting.host_is_not_tasting">
      </toggle-switch>
    </div>
    <div ng-hide="$ctrl.openViewState">
      <h3>Your Ratings </h3>
      <p ng-if="$ctrl.tasting.taster_wine_reviews==0">no wines selected</p>
      <wine-list-item
        wine-item="review"
        ng-repeat="review in $ctrl.tasting.taster_wine_reviews"
        wine-view="tasterRating"
        select-action="$ctrl.openWineReviewModal(review)">
      </wine-list-item>
    </div>
    <div ng-show="$ctrl.openViewState">
      <h3>Wines</h3>
      <p ng-if="$ctrl.tasting.tasting_wines==0">no wines selected</p>
      <wine-list-item
        ng-repeat="wine in $ctrl.tasting.tasting_wines"
        ng-show="wine.wine_number"
        wine-item="wine"
        wine-view="completed"
        select-action="$ctrl.openWineRevealModal(review)">
      </wine-list-item>
      <wine-list-item
        ng-repeat="review in $ctrl.tasting.taster_wine_reviews"
        wine-item="review"
        wine-view="averageRating"
        ng-hide="review.wine_id"
        select-action="$ctrl.openWineRevealModal(review)">
      </wine-list-item>
    </div>
    <div ng-show="$ctrl.openViewState">
      <h3>Guests</h3>
      <p ng-if="$ctrl.tasting.guests==0">no guests invited</p>
      <guest-list-item
        ng-repeat="guest in $ctrl.tasting.guests"
        guest="guest"
        select-action="$ctrl.showGuest(guest)">
      </guest-list-item>
    </div>

  </div>

  <div class='tasting-detail-container' ng-if="$ctrl.tasting.is_completed">
    <div class="tasting-detail-info">
      <div class="status completed">{{$ctrl.displayTime}}</div>
      <h3>{{$ctrl.tasting.name}}</h3>
      <div class="details">
        <p>
          <span class="subtitle">Hosted by:<br/></span>
          {{$ctrl.tasting.host.taster.name}}<br/>
          {{$ctrl.tasting.location.phone}}<br/>
          {{$ctrl.tasting.location.address}}<span ng-show="$ctrl.tasting.location.address2"> {{$ctrl.tasting.location.address}}</span><br/>
          {{$ctrl.tasting.location.city}}, {{$ctrl.tasting.location.state}} {{$ctrl.tasting.location.postal}}
        </p>
        <p ng-show="$ctrl.tasting.description">
          <span class="subtitle">Description:<br/></span>
          {{$ctrl.tasting.description}}
        </p>
      </div>
    </div>
    <div>
      <toggle-switch
        toggle-trigger="$ctrl.toggleOpenViewState(state)"
        toggle-state="$ctrl.openViewState"
        toggle-label="$ctrl.openViewLabel"
        toggle-disabled="$ctrl.tasterIsHost && $ctrl.tasting.host_is_not_tasting">
      </toggle-switch>
    </div>
    <div ng-hide="$ctrl.openViewState">
      <h3>Your Ratings </h3>
      <p ng-if="$ctrl.tasting.taster_wine_reviews==0">no wines selected</p>
      <wine-list-item
        ng-repeat="review in $ctrl.tasting.taster_wine_reviews"
        wine-item="review"
        wine-view="tasterRating"
        select-action="$ctrl.openWineReviewModal(review)">
      </wine-list-item>
    </div>
    <div ng-show="$ctrl.openViewState">
      <h3>Average Ratings </h3>
      <p ng-if="$ctrl.tasting.tasting_wines==0">no wines selected</p>
      <wine-list-item
        ng-repeat="wine in $ctrl.tasting.tasting_wines"
        wine-item="wine"
        wine-view="completed"
        select-action="$ctrl.openWineInfoModal(wine)">
      </wine-list-item>
    </div>
    <div ng-show="$ctrl.openViewState">
      <h3>Guests</h3>
      <p ng-if="$ctrl.tasting.guests==0">no guests invited</p>
      <guest-list-item
        ng-repeat="guest in $ctrl.tasting.guests"
        guest="guest"
        select-action="$ctrl.showGuest(guest)">
      </guest-list-item>
    </div>
  </div>


  <tasting-detail-modal tasting="$ctrl.tasting"></tasting-detail-modal>
  <tasting-wine-modal tasting="$ctrl.tasting"></tasting-wine-modal>
  <add-guest-modal tasting="$ctrl.tasting"></add-guest-modal>
  <show-guest-modal></show-guest-modal>
  <wine-info-modal wine-type="tastingWine"></wine-info-modal>
  <wine-review-modal tasting-status="$ctrl.tasting.status"></wine-review-modal>
  <wine-review-status-modal></wine-review-status-modal>
  <wine-reveal-modal tasting-wines="$ctrl.tasting.tasting_wines"></wine-reveal-modal>
  <alerts-modal></alerts-modal>
  <notifications></notifications>
`
