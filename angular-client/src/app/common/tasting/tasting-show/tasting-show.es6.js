export const template = `

  <div class="tasting">

    <div class="desktop-logo">
      <div class="desktop-logo-top"></div>
      <div class="desktop-logo-bottom">
        <a ui-sref="dashboard"><img src='assets/images/yno_tasting_logo_white.svg'></a>
        <desktop-nav-secondary  welcome-state="$ctrl.constants.DASHBOARD_STATE"></desktop-nav-secondary>
      </div>
    </div>

    <taster-panel taster="$ctrl.taster" taster-number="$ctrl.tasterNumber"></taster-panel>

    <div class="tasting-panel">

      <div class="tasting-mode"
        ng-class="{inverse:!$ctrl.viewState}">
        <toggle-switch
          toggle-trigger="$ctrl.toggleViewState(state)"
          toggle-state="$ctrl.viewState"
          toggle-disabled="$ctrl.tasterIsHost && $ctrl.tasting.host_is_not_tasting">
        </toggle-switch>
        <h4>{{ $ctrl.viewLabel }}</h4>
      </div>

      <div class="tasting-status"
        ng-class="{
          'no-view': $ctrl.tasterIsHost && $ctrl.tasting.host_is_not_tasting,
          open: $ctrl.tasting.is_open,
          closed: $ctrl.tasting.is_closed,
          pending: $ctrl.tasting.is_pending,
          'completed-inverse': $ctrl.tasting.is_completed && !$ctrl.viewState
        }">
        <p>{{$ctrl.displayTime}}</p>
      </div>

      <!--

        TASTER REVIEWS

      -->

      <div class="tasting-section" ng-if="$ctrl.viewState">
        <div class="tasting-header" ng-class="{inverse:!$ctrl.viewState}">
          <a href>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>
            <h3>Your Reviews</h3>
          </a>
        </div>
        <div class="tasting-section-list">
          <wine-list-item
            ng-if="$ctrl.viewState"
            ng-repeat="review in $ctrl.tasting.taster_wine_reviews"
            wine-view="{{$ctrl.wineListItemView()}}"
            wine-item="review"
            last-wine-item="$ctrl.tasting.last_wine_items[$index]"
            select-action="$ctrl.openWineReviewModal(review)">
          </wine-list-item>
          <div class="mobile-nav-spacer"></div>
        </div>
      </div>


      <!--

        TASTING DETAILS

      -->

      <div class="tasting-section" ng-if="!$ctrl.viewState && ($ctrl.expandState==$ctrl.constants.EXPAND_STATE_NONE || $ctrl.expandState==$ctrl.constants.EXPAND_STATE_DETAILS)">
        <div class="tasting-header">
          <a href
            ng-click="$ctrl.changeExpandState($ctrl.constants.EXPAND_STATE_DETAILS)">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
               width="366.182px" height="366.182px" viewBox="0 0 366.182 366.182" style="enable-background:new 0 0 366.182 366.182;"
               xml:space="preserve">
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
            </svg>
            <h3>{{ $ctrl.tasting.name }}</h3>
          </a>
          <button class="small-btn"
            ng-click="$ctrl.openTastingDetailModal()"
            ng-if="$ctrl.tasterIsHost && !$ctrl.tasting.is_completed">
              <span class="fas fa-pencil-alt"></span>
          </button>
          <button class="small-btn"
            ng-click="$ctrl.expandState==$ctrl.constants.EXPAND_STATE_NONE ? $ctrl.expandState=$ctrl.constants.EXPAND_STATE_DETAILS : $ctrl.expandState=$ctrl.constants.EXPAND_STATE_NONE">
              <span class="fas fa-angle-down" ng-hide="$ctrl.expandState==$ctrl.constants.EXPAND_STATE_DETAILS"></span>
              <span class="fas fa-angle-up" ng-show="$ctrl.expandState==$ctrl.constants.EXPAND_STATE_DETAILS"></span>
          </button>
        </div>
        <div class="tasting-section-list tasting-info" ng-if="$ctrl.expandState==$ctrl.constants.EXPAND_STATE_DETAILS">
          <p>
            <span class="subtitle">Hosted by:<br/></span>
            {{$ctrl.tasting.host.taster.name}}<br/>
            {{$ctrl.tasting.location.phone}}<br/>
            {{$ctrl.tasting.location.address}}<span ng-show="$ctrl.tasting.location.address2"> {{$ctrl.tasting.location.address2}}</span><br/>
            {{$ctrl.tasting.location.city}}, {{$ctrl.tasting.location.state}} {{$ctrl.tasting.location.postal}}
          </p>
          <p>
            Opens: {{ $ctrl.tasting.open_at | utcToLocalDate:"MMMM D, YYYY h:mm a" }}<br>
            Duration: {{ $ctrl.tastingDuration() }}
          </p>
          <p ng-show="$ctrl.tasting.description">
            <span class="subtitle">Description:<br/></span>
            {{$ctrl.tasting.description}}
          </p>
          <div class="pending-btns">
            <button class="text-btn"
              ng-click="$ctrl.attemptOpenTasting()"
              ng-if="$ctrl.tasterIsHost && $ctrl.tasting.is_pending">
                Open Tasting
            </button>
            <button class="text-btn"
              ng-click="$ctrl.attemptCancelTasting()"
              ng-if="$ctrl.tasterIsHost && $ctrl.tasting.is_pending">
                Cancel Tasting
            </button>
            <button class="text-btn"
              ng-click="$ctrl.attemptCloseTasting()"
              ng-if="$ctrl.tasterIsHost && $ctrl.tasting.is_open">
                Close Tasting
            </button>
          </div>
          <div class="mobile-nav-spacer"></div>
        </div>
      </div>


      <!--

        WINES

      -->

      <div class="tasting-section"
        ng-if="!$ctrl.viewState && ($ctrl.expandState==$ctrl.constants.EXPAND_STATE_NONE || $ctrl.expandState==$ctrl.constants.EXPAND_STATE_WINES)">
        <div class="tasting-header">
          <a href ng-click="$ctrl.changeExpandState($ctrl.constants.EXPAND_STATE_WINES)">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
               width="371.234px" height="371.234px" viewBox="0 0 371.234 371.234" style="enable-background:new 0 0 371.234 371.234;"
               xml:space="preserve">
              <g>
                <path fill="#fff" d="M238.147,102.42c-5.081-6.576-10.335-13.375-15.218-22.93c-4.824-9.446-11.219-42.958-12.754-53.035
                  c-0.053-0.341-0.181-0.938,0.131-1.313c2.064-2.764,2.941-5.859,2.941-9.509C213.248,7.013,206.84,0,198.965,0h-26.697
                  c-7.876,0-14.283,7.013-14.283,15.633c0,3.646,0.78,6.6,2.841,9.362c0.263,0.335,0.275,1.122,0.223,1.469
                  c-1.557,10.232-7.932,43.604-12.746,53.026c-4.882,9.556-10.136,16.355-15.217,22.931c-9.977,12.912-18.593,24.063-18.593,48.56
                  v169.628c0,22.612,4.284,35.399,14.326,42.756c9.932,7.275,24.726,7.869,41.621,7.869c2.914,0,5.96-0.021,9.146-0.043
                  c1.965-0.015,3.983-0.028,6.005-0.038c2.071,0.01,4.089,0.023,6.056,0.038c3.186,0.021,6.232,0.043,9.146,0.043
                  c16.897,0,31.693-0.593,41.624-7.867c10.04-7.355,14.323-20.144,14.323-42.757V150.98
                  C256.741,126.484,248.125,115.332,238.147,102.42z M245.741,320.609c0,18.456-3.03,28.905-9.824,33.884
                  c-6.587,4.826-17.426,5.741-35.123,5.741c-2.889,0-5.911-0.021-9.069-0.043c-1.975-0.015-4-0.028-6.132-0.038
                  c-2.082,0.01-4.109,0.023-6.083,0.038c-3.158,0.021-6.179,0.043-9.068,0.043c-33.397,0-44.947-1.919-44.947-39.625V150.98
                  c0-20.742,6.836-29.589,16.298-41.834c5.137-6.649,10.96-14.185,16.308-24.651c6.225-12.185,14.052-54.78,14.292-60.441
                  c0,0,0.146-1.942-0.146-2.598c-0.25-0.563-1.678-1.913-1.678-1.913c-0.991-0.884-1.582-2.346-1.582-3.91
                  c0-2.468,1.534-4.633,3.283-4.633h26.698c1.747,0,3.281,2.165,3.281,4.633c0,1.564-0.592,3.025-1.582,3.909
                  c0,0-1.387,1.196-1.641,1.788s-0.195,2.502-0.195,2.502c0.003,0.076,0.007,0.149,0.012,0.225
                  c0.244,5.678,8.068,48.253,14.293,60.438c5.348,10.467,11.172,18.002,16.309,24.651c9.462,12.245,16.298,21.093,16.298,41.834
                  V320.609z"/>
                <path fill="#fff" d="M136.494,185.617V313.98c0,35.675,14.809,33.879,49.123,33.719c34.316,0.16,49.125,1.956,49.125-33.719V185.617
                  c0,0,0-2-3.667-2c-22.583,0-68.896,0-91.479,0C136.866,183.617,136.494,185.617,136.494,185.617z"/>
              </g>
            </svg>
            <h3>Wines</h3>
          </a>
          <button class="small-btn" ng-show="$ctrl.tasterIsHost && !$ctrl.tastingIsFrozen" ng-click="$ctrl.openTastingWineModal()"><span class="fa fa-plus"></span></button>
          <button class="small-btn" ng-click="$ctrl.expandState==$ctrl.constants.EXPAND_STATE_NONE ? $ctrl.expandState=$ctrl.constants.EXPAND_STATE_WINES : $ctrl.expandState=$ctrl.constants.EXPAND_STATE_NONE">
            <span class="fas fa-angle-down" ng-hide="$ctrl.expandState==$ctrl.constants.EXPAND_STATE_WINES"></span>
            <span class="fas fa-angle-up" ng-show="$ctrl.expandState==$ctrl.constants.EXPAND_STATE_WINES"></span>
          </button>
        </div>
        <div class="tasting-section-list" ng-if="$ctrl.expandState==$ctrl.constants.EXPAND_STATE_WINES">
          <wine-list-item
            ng-repeat="wine in $ctrl.tasting.tasting_wines"
            wine-item="wine"
            wine-view="{{$ctrl.showWinesView()}}"
            editable="$ctrl.tasterIsHost && $ctrl.tasting.is_pending"
            delete-action="$ctrl.attemptDestroyTastingWine(wine)"
            select-action="$ctrl.openWineInfoModal(wine)">
          </wine-list-item>
          <div class="mobile-nav-spacer"></div>
        </div>
      </div>


      <!--

        GUESTS

      -->

      <div class="tasting-section"
        ng-if="!$ctrl.viewState && ($ctrl.expandState==$ctrl.constants.EXPAND_STATE_NONE || $ctrl.expandState==$ctrl.constants.EXPAND_STATE_GUESTS)">
        <div class="tasting-header">
          <a href ng-click="$ctrl.changeExpandState($ctrl.constants.EXPAND_STATE_GUESTS)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"/></svg>
            <h3>Guests</h3>
          </a>
          <button class="small-btn" ng-if="$ctrl.tasterIsHost && !$ctrl.tastingIsFrozen"><span class="fa fa-plus" ng-click="$ctrl.openGuestModal()"></span></button>
          <button class="small-btn" ng-click="$ctrl.expandState==$ctrl.constants.EXPAND_STATE_NONE ? $ctrl.expandState=$ctrl.constants.EXPAND_STATE_GUESTS : $ctrl.expandState=$ctrl.constants.EXPAND_STATE_NONE">
            <span class="fas fa-angle-down" ng-hide="$ctrl.expandState==$ctrl.constants.EXPAND_STATE_GUESTS"></span>
            <span class="fas fa-angle-up" ng-show="$ctrl.expandState==$ctrl.constants.EXPAND_STATE_GUESTS"></span>
          </button>
        </div>
        <div class="tasting-section-list" ng-if="$ctrl.expandState==$ctrl.constants.EXPAND_STATE_GUESTS">
          <guest-list-item
            ng-repeat="guest in $ctrl.tasting.guests"
            guest="guest"
            editable="($ctrl.tasterIsHost || guest.taster.id==$ctrl.taster.id) && !$ctrl.tastingIsFrozen"
            delete-action="$ctrl.attemptDestroyGuest(guest)"
            select-action="$ctrl.openGuestInfoModal(guest)">
          </guest-list-item>
          <div class="mobile-nav-spacer"></div>
        </div>
      </div>


      <!--

        GUEST REVIEWS

      -->

      <div id="tastingReviews" class="tasting-section"
        ng-if="!$ctrl.viewState && $ctrl.showReviews()">
        <div class="tasting-header">
          <a href
            ng-class="{inverse:!$ctrl.viewState}"
            ng-click="$ctrl.changeExpandState($ctrl.constants.EXPAND_STATE_REVIEWS)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>
            <h3>Guest Reviews</h3>
          </a>
          <button class="small-btn" ng-click="$ctrl.expandState==$ctrl.constants.EXPAND_STATE_NONE ? $ctrl.expandState=$ctrl.constants.EXPAND_STATE_REVIEWS : $ctrl.expandState=$ctrl.constants.EXPAND_STATE_NONE">
            <span class="fas fa-angle-down" ng-hide="$ctrl.expandState==$ctrl.constants.EXPAND_STATE_REVIEWS"></span>
            <span class="fas fa-angle-up" ng-show="$ctrl.expandState==$ctrl.constants.EXPAND_STATE_REVIEWS"></span>
          </button>
        </div>
        <div class="tasting-section-list" ng-if="$ctrl.expandState==$ctrl.constants.EXPAND_STATE_REVIEWS">
          <wine-list-item
            ng-repeat="review in $ctrl.tasting.taster_wine_reviews"
            wine-view="{{$ctrl.wineListItemView()}}"
            wine-item="review"
            last-wine-item="$ctrl.tasting.last_wine_items[$index]"
            select-action="$ctrl.openWineReviewStatusModal(review)">
          </wine-list-item>
          <div class="mobile-nav-spacer"></div>
        </div>
      </div>


      <!--

        REVEALS

      -->

      <div class="tasting-section"
        ng-if="!$ctrl.viewState && $ctrl.showReveals()">
        <div class="tasting-header inverse">
          <a href class="inverse"
            ng-click="$ctrl.changeExpandState($ctrl.constants.EXPAND_STATE_REVEALS)">
              <svg aria-hidden="true" data-prefix="fas" data-icon="award" class="svg-inline--fa fa-award fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M97.12 362.63l-5.3-5.3a9.004 9.004 0 0 0-4.02-2.32L72 350.77c-9.51-2.55-17.87-7.45-25.43-13.32L1.2 448.7c-4.39 10.77 3.81 22.47 15.43 22.03l52.69-2.01L105.56 507c8 8.44 22.04 5.81 26.43-4.96l52.05-127.62c-10.84 6.04-22.87 9.58-35.31 9.58-19.5 0-37.82-7.59-51.61-21.37zM382.8 448.7l-45.37-111.24c-7.56 5.88-15.92 10.77-25.43 13.32l-15.8 4.23a9.004 9.004 0 0 0-4.02 2.32l-5.3 5.3C273.09 376.41 254.76 384 235.26 384c-12.44 0-24.47-3.55-35.31-9.58L252 502.04c4.39 10.77 18.44 13.4 26.43 4.96l36.25-38.28 52.69 2.01c11.62.44 19.82-11.27 15.43-22.03zM263 340l5.21-5.3c5-5.09 11.22-8.75 18.05-10.61l15.53-4.23c13.89-3.79 24.75-14.84 28.47-28.98l4.16-15.81a41.145 41.145 0 0 1 10.42-18.37l11.37-11.57c10.17-10.35 14.14-25.44 10.42-39.58l-4.16-15.81a41.657 41.657 0 0 1 0-21.21l4.16-15.81c3.72-14.14-.25-29.23-10.42-39.58l-11.37-11.57c-5-5.09-8.59-11.42-10.42-18.37l-4.16-15.8c-3.72-14.14-14.58-25.19-28.47-28.98l-15.53-4.24c-6.83-1.86-13.05-5.52-18.05-10.61L256.84 12c-10.17-10.35-25-14.4-38.89-10.61l-15.53 4.24a39.614 39.614 0 0 1-20.84 0L166.05 1.4c-13.89-3.79-28.72.25-38.89 10.61l-11.37 11.57c-5 5.09-11.22 8.74-18.05 10.61l-15.53 4.24c-13.89 3.79-24.75 14.84-28.47 28.98l-4.16 15.8a41.145 41.145 0 0 1-10.42 18.37l-11.37 11.57c-10.17 10.35-14.15 25.44-10.42 39.58l4.16 15.8a41.657 41.657 0 0 1 0 21.21l-4.16 15.8c-3.72 14.14.25 29.23 10.42 39.59l11.37 11.57c5 5.09 8.59 11.42 10.42 18.37l4.16 15.8c3.72 14.14 14.58 25.19 28.47 28.98l15.53 4.23c6.83 1.86 13.05 5.52 18.05 10.61L121 340c13.23 13.47 33.84 15.88 49.74 5.82a39.676 39.676 0 0 1 42.53 0c15.89 10.06 36.5 7.65 49.73-5.82zM97.66 175.96c0-53.03 42.24-96.02 94.34-96.02s94.34 42.99 94.34 96.02-42.24 96.02-94.34 96.02-94.34-42.99-94.34-96.02z"></path></svg>
            <h3>Reveal Wines</h3>
          </a>
          <button class="small-btn" ng-click="$ctrl.expandState==$ctrl.constants.EXPAND_STATE_NONE ? $ctrl.expandState=$ctrl.constants.EXPAND_STATE_REVEALS : $ctrl.expandState=$ctrl.constants.EXPAND_STATE_NONE">
            <span class="fas fa-angle-down" ng-hide="$ctrl.expandState==$ctrl.constants.EXPAND_STATE_REVEALS"></span>
            <span class="fas fa-angle-up" ng-show="$ctrl.expandState==$ctrl.constants.EXPAND_STATE_REVEALS"></span>
          </button>
        </div>
        <div class="tasting-section-list" ng-if="$ctrl.expandState==$ctrl.constants.EXPAND_STATE_REVEALS">
          <wine-list-item
            ng-repeat="review in $ctrl.tasting.taster_wine_reviews"
            wine-view="reveal"
            wine-item="review"
            last-wine-item="$ctrl.tasting.last_wine_items[$index]"
            select-action="$ctrl.openWineRevealModal(review)">
          </wine-list-item>
          <button class="text-btn"
            ng-click="$ctrl.completeTasting()"
            ng-if="$ctrl.tasterIsHost && $ctrl.allWinesRevealed()">
              Complete Tasting
          </button>
          <div class="mobile-nav-spacer"></div>
        </div>
      </div>

    </div> <!-- end tasting panel -->
  </div> <!-- end tasting -->


  <mobile-nav></mobile-nav>
  <add-wine-modal tasting="$ctrl.tasting"></add-wine-modal>
  <add-guest-modal tasting="$ctrl.tasting"></add-guest-modal>
  <show-guest-modal></show-guest-modal>
  <tasting-detail-modal tasting="$ctrl.tasting"></tasting-detail-modal>
  <wine-info-modal wine-type="tastingWine"></wine-info-modal>
  <wine-review-modal tasting="$ctrl.tasting"></wine-review-modal>
  <wine-review-status-modal></wine-review-status-modal>
  <wine-reveal-modal tasting-wines="$ctrl.tasting.tasting_wines"></wine-reveal-modal>
  <alerts-modal></alerts-modal>
  <notification></notification>
  <wait-state wait-on="$ctrl.wait"></wait-state>
`
