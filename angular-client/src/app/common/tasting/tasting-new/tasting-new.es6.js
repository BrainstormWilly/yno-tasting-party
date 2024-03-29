export const template = `

<div class="desktop-nav">
  <a href><img src='assets/images/yno_tasting_logo_white.svg'></a>
  <desktop-nav-secondary></desktop-nav-secondary>
</div>

<div class="tasting">
  <taster-panel taster="$ctrl.host.taster"></taster-panel>

  <div class="tasting-panel">

    <div class="tasting-section" ng-if="$ctrl.currentFormState==1">
      <div class="tasting-header new">
        <h3 ng-if="!$ctrl.tasting.name">New Tasting</h3>
        <h3 ng-if="$ctrl.tasting.name">{{$ctrl.tasting.name}}</h3>
      </div>
      <div class="tasting-section-list new">
        <p>Let's Get Started</p>
        <form name="tastingForm" ng-submit="$ctrl.createTasting()">
        <div class="main-form-container">
          <div class="main-form-control" ng-class="{'error' : newTastingForm.tastingName.$touched && newTastingForm.tastingName.$invalid}">

            <input name="tastingName" type="text" ng-model="$ctrl.tasting.name" required>
            <label><span>Name</span></label>
          </div>
          <div class="main-form-control" ng-class="{'error' : newTastingForm.tastingOpenAt.$touched && newTastingForm.tastingOpenAt.$invalid}">
            <input name="tastingOpenAt"
              moment-picker="$ctrl.tasting.open_at"
              ng-model="$ctrl.tasting.open_at"
              min-date="$ctrl.minOpenDate"
              change="$ctrl.onOpenAtChange(newValue, oldValue)"
              ng-readonly="true"
              required>
            <label><span>Start</span></label>
          </div>
          <div class="main-form-control">
            <input name="tastingCloseAt"
              moment-picker="$ctrl.tasting.close_at"
              ng-model="$ctrl.tasting.close_at"
              min-date="$ctrl.minCloseDate"
              ng-readonly="true">
                <label><span>End</span><span>(Optional)</span></label>
          </div>
          <div class="main-form-control">
            <textarea name="tastingDescription" type="text" ng-model="$ctrl.tasting.description"></textarea>
              <label><span>Details</span><span>(Optional)</span></label>
          </div>
          <div class="main-form-control" ng-class="{'error' : newTastingForm.tastingLocation.$touched && newTastingForm.tastingLocation.$invalid}">
            <input type="hidden" ng-model="$ctrl.tasting.location.id"></input>    
            <textarea name="tastingLocation" type="text" required
              ng-focus="$ctrl.openHostLocationModal()"
              ng-readonly="true"
              ng-model="$ctrl.tasting.location.to_short_string">
            </textarea>
            <label><span>Location</span></label>
          </div>
          <div class="main-form-btns">
            <span class="descriptor">&nbsp;</span>
            <div>
              <button type="reset">
                <span class="fa fa-refresh"></span>
              </button>
              <button type="submit"
                class="primary"
                ng-disabled="tastingForm.$invalid">
                <span class="fa fa-arrow-right"></span>
              </button>
            </div>
          </div>
        </div>
        </form>
        <div class="mobile-nav-spacer"></div>
      </div>
    </div>
    <div class="tasting-section" ng-if="$ctrl.currentFormState==2">
      <div class="tasting-header new">
        <h3>{{$ctrl.tasting.name}}</h3>
      </div>
      <div class="tasting-section-list new">
        <p ng-if="$ctrl.tasting.tasting_wines.length==0">A tasting with no wines is just...sad.<br>However, you can add them later if you wish.</p>
        <p ng-if="$ctrl.tasting.tasting_wines.length>0 && $ctrl.tasting.tasting_wines.length<6">Keep going...</p>
        <p ng-if="$ctrl.tasting.tasting_wines.length==6">Just right!</p>
        <p ng-if="$ctrl.tasting.tasting_wines.length>6">Now you're just being foolish.</p>
        <wine-list-item
          ng-repeat="wine in $ctrl.tasting.tasting_wines"
          wine-item="wine"
          wine-view="tastingPending"
          delete-action="$ctrl.destroyTastingWine(wine)"
          editable="true">
        </wine-list-item>
        <div class="main-form-btns">
          <span class="descriptor">
            <ng-pluralize count="$ctrl.tasting.tasting_wines.length"
              when="{
                '0':'0 wines',
                '1':'1 wine',
                'other':'{} wines'
              }"></ng-pluralize>
          </span>
          <div>
            <button ng-click="$ctrl.openTastingWineModal()"><span class="fa fa-plus"></span></button>
            <button ng-click="$ctrl.currentFormState = 3"><span class="fa fa-arrow-right"></span></button>
          </div>
        </div>
        <div class="mobile-nav-spacer"></div>
      </div>
    </div>
    <div class="tasting-section" ng-if="$ctrl.currentFormState==3">
      <div class="tasting-header new">
        <h3>{{$ctrl.tasting.name}}</h3>
      </div>
      <div class="tasting-section-list new">
        <p ng-if="$ctrl.tasting.guests.length==0">You have friends, right?<br>
          Well, then invite them to your tasting and be somebody!
        </p>
        <guest-list-item
          ng-repeat="guest in $ctrl.tasting.guests"
          guest="guest"
          editable="false">
        </guest-list-item>
        <div class="main-form-btns">
          <span class="descriptor">
            <ng-pluralize count="$ctrl.tasting.guests.length"
              when="{
                '0':'0 guests',
                '1':'1 guest',
                'other':'{} guests'
              }"></ng-pluralize>
          </span>
          <div>
            <button ng-click="$ctrl.openGuestModal()"><span class="fa fa-plus"></span></button>
            <button ui-sref="tasting-show({id:$ctrl.tasting.id})"><span class="fa fa-arrow-right"></span></button>
          </div>
        </div>
        <div class="mobile-nav-spacer"></div>
      </div>
    </div>
  </div>

</div>

<mobile-nav></mobile-nav>
<host-location-modal host-locations="$ctrl.tasting.host.locations" selected-location="$ctrl.tasting.location"></host-location-modal>
<add-wine-modal tasting="$ctrl.tasting"></add-wine-modal>
<add-guest-modal tasting="$ctrl.tasting"></add-guest-modal>
`;
