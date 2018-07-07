export const template = `

  <div class='tasting-detail-container' ng-if="$ctrl.tasting.is_pending">
    <div class="tasting-detail-info">
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         width="366.182px" height="366.182px" viewBox="0 0 366.182 366.182" style="enable-background:new 0 0 366.182 366.182;"
         xml:space="preserve">
        <g>
          <g>
            <path fill="#fff" d="M261.39,168.768c19.439-20.182,28.627-44.058,25.867-67.229c-1.263-10.604-7.755-34.217-15.79-57.423
              c-4.032-11.646-7.924-21.604-11.254-28.793C254.974,4.01,251.488,0,246.899,0H119.287c-4.591,0-8.074,4.01-13.314,15.323
              c-3.33,7.19-7.222,17.146-11.254,28.793c-8.034,23.206-14.527,46.818-15.789,57.423c-5.785,48.574,41.113,93.064,88.259,102.289
              c0.609,8.4,1.16,31.939,0.841,59.988c-0.514,45.139-2.784,61.541-4.021,64.074c-1.849,3.256-12.858,7.672-29.624,9.439
              l-0.467,0.049c-8.963,0.943-25.647,2.703-25.647,16.01c0,6.34,2.987,9.402,5.492,10.855c2.938,1.703,6.455,1.938,9.819,1.938
              c0.872,0,1.781-0.016,2.719-0.033c0.932-0.018,1.894-0.035,2.878-0.035H237.01c0.983,0,1.945,0.018,2.877,0.035
              c0.938,0.018,1.848,0.033,2.72,0.033c3.787,0,15.313,0,15.313-12.793c0-13.307-16.686-15.066-25.648-16.01l-0.469-0.049
              c-16.766-1.77-27.774-6.184-29.597-9.393c-1.269-2.613-3.452-19.045-3.602-64.057c-0.095-28.908,0.736-52.332,1.501-60.404
              C222.271,198.639,244.937,185.848,261.39,168.768z M187.601,262.764c0.101,41.135,1.785,64.873,5.012,70.557
              c5.743,10.121,26.296,13.709,38.033,14.947l0.472,0.049c4.729,0.5,15.802,1.666,15.802,5.072c0,0.783-0.09,1.211-0.146,1.404
              c-0.375,0.152-1.402,0.389-4.167,0.389c-0.807,0-1.648-0.016-2.517-0.033c-0.996-0.018-2.026-0.037-3.08-0.037h-53.536h-54.295
              c-1.054,0-2.084,0.02-3.081,0.037c-0.868,0.018-1.709,0.033-2.516,0.033c-2.763,0-3.79-0.236-4.165-0.389
              c-0.058-0.193-0.146-0.621-0.146-1.406c0-3.406,11.072-4.572,15.801-5.07l0.469-0.049c11.738-1.238,32.289-4.826,38.035-14.949
              c1.193-2.102,4.823-8.498,5.47-70.788c0.152-14.737,0.076-30.267-0.209-42.606c-0.472-20.396-1.172-21.842-1.789-23.117
              c-0.825-1.701-2.406-2.883-4.229-3.162c-21.24-3.258-43.567-15.155-59.725-31.825c-17.38-17.933-25.634-38.879-23.24-58.981
              c2.442-20.509,23.675-83.082,30.964-91.84h124.557c7.289,8.759,28.521,71.333,30.964,91.84
              c5.067,42.551-39.031,82.894-81.847,90.539c-1.834,0.328-3.356,1.52-4.179,3.268C187.488,202.657,187.595,260.312,187.601,262.764
              z"/>
            <path fill="#fff" d="M244.876,152.387c7.387-8.986,13.278-16.938,14.321-27.506c0.086-0.874,0.229-4-2.657-4
              c-36.54,0-110.438,0.014-146.979,0.014c-3.159,0-2.665,3.056-2.574,3.986c1.056,10.84,7.114,19.048,14.765,28.241
              c12.812,15.393,29.63,25.398,48.34,26.765c3.171,0.232,8.396,0.375,13.635,0.375c4.988,0,9.529-0.133,12.146-0.356
              C214.984,178.276,232.051,167.988,244.876,152.387z"/>
          </g>
        </g>
      </svg>
      <h3>{{ $ctrl.tasting.name }}</h3>
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
          {{$ctrl.tasting.location.address}}<span ng-show="$ctrl.tasting.location.address2"> {{$ctrl.tasting.location.address2}}</span><br/>
          {{$ctrl.tasting.location.city}}, {{$ctrl.tasting.location.state}} {{$ctrl.tasting.location.postal}}
        </p>
        <p ng-show="$ctrl.tasting.description">
          <span class="subtitle">Description:<br/></span>
          {{$ctrl.tasting.description}}
        </p>
      </div>
      <div class="pending-btns">
        <button class="text-btn"
          ng-click="$ctrl.attemptOpenTasting()"
          ng-if="$ctrl.tasterIsHost">
            Open Tasting
        </button>
        <button class="text-btn"
          ng-click="$ctrl.attemptCancelTasting()"
          ng-if="$ctrl.tasterIsHost">
            Cancel Tasting
        </button>
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
        editable="$ctrl.tasterIsHost || $ctrl.taster.id==guest.taster_id"
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
          {{$ctrl.tasting.location.address}}<span ng-show="$ctrl.tasting.location.address2"> {{$ctrl.tasting.location.address2}}</span><br/>
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
        editable="$ctrl.tasterIsHost || $ctrl.taster.id==guest.taster_id"
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
          {{$ctrl.tasting.location.address}}<span ng-show="$ctrl.tasting.location.address2"> {{$ctrl.tasting.location.address2}}</span><br/>
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
          {{$ctrl.tasting.location.address}}<span ng-show="$ctrl.tasting.location.address2"> {{$ctrl.tasting.location.address2}}</span><br/>
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
        select-action="$ctrl.openGuestInfoModal(guest)">
      </guest-list-item>
    </div>
  </div>


  <tasting-detail-modal tasting="$ctrl.tasting"></tasting-detail-modal>
  <add-wine-modal tasting="$ctrl.tasting"></add-wine-modal>
  <add-guest-modal tasting="$ctrl.tasting"></add-guest-modal>
  <show-guest-modal></show-guest-modal>
  <wine-info-modal wine-type="tastingWine"></wine-info-modal>
  <wine-review-modal tasting="$ctrl.tasting"></wine-review-modal>
  <wine-review-status-modal></wine-review-status-modal>
  <wine-reveal-modal tasting-wines="$ctrl.tasting.tasting_wines"></wine-reveal-modal>
  <alerts-modal></alerts-modal>
  <notifications></notifications>
  <wait-state wait-on="$ctrl.wait"></wait-state>
`
