export const template = `

  <header>
    <h2 ng-if="!$ctrl.tasting.name">New Tasting</h2>
    <h2 ng-if="$ctrl.tasting.name">{{$ctrl.tasting.name}}</h2>
  </header>

  <section class="main-content" ng-if="$ctrl.currentFormState==1">
    <h3>Let's Get Started</h3>
    <form name="tastingForm" ng-submit="$ctrl.createTasting()">
    <div class="main-form-container">
      <div class="main-form-control" ng-class="{'error' : newTastingForm.tastingName.$touched && newTastingForm.tastingName.$invalid}">
        <label><span>Name</span></label>
        <input name="tastingName" type="text" ng-model="$ctrl.tasting.name" required>
      </div>
      <div class="main-form-control" ng-class="{'error' : newTastingForm.tastingOpenAt.$touched && newTastingForm.tastingOpenAt.$invalid}">
        <label><span>Start</span></label>
        <input name="tastingOpenAt"
          moment-picker="$ctrl.tasting.open_at"
          ng-model="$ctrl.tasting.open_at"
          min-date="$ctrl.minOpenDate"
          required>
      </div>
      <div class="main-form-control">
        <label><span>End</span><span>(Optional)</span></label>
        <input name="tastingCloseAt"
          moment-picker="$ctrl.tasting.close_at"
          ng-model="$ctrl.tasting.close_at"
          min-date="$ctrl.minCloseDate">
      </div>
      <div class="main-form-control">
        <label><span>Details</span><span>(Optional)</span></label>
        <textarea name="tastingDescription" type="text" ng-model="$ctrl.tasting.description"></textarea>
      </div>
      <div class="main-form-control" ng-class="{'error' : newTastingForm.tastingLocation.$touched && newTastingForm.tastingLocation.$invalid}">
        <label><span>Location</span></label>
        <input type="hidden" ng-model="$ctrl.tasting.location.id"></input>
        <textarea name="tastingLocation" type="text" ng-focus="$ctrl.openHostLocationModal()" ng-readonly="true" ng-model="$ctrl.tasting.location.to_short_string" required></textarea>
      </div>
      <div class="main-form-btns">
        <span>&nbsp;</span>
        <div>
          <button type="reset">
            <span class="fa fa-refresh"></span>
          </button>
          <button type="submit" ng-disabled="tastingForm.$invalid">
            <span class="fa fa-arrow-right"></span>
          </button>
        </div>
      </div>
    </div>
    </form>
  </section>

  <section class="main-content" ng-if="$ctrl.currentFormState==2">
    <div class="main-form-container">
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
        <span class="descriptor">{{$ctrl.tasting.tasting_wines.length}} wines</span>
        <div>
          <button ng-click="$ctrl.openTastingWineModal()"><span class="fa fa-plus"></span></button>
          <button ng-click="$ctrl.currentFormState = 3"><span class="fa fa-arrow-right"></span></button>
        </div>
      </div>
    </div>
  </section>

  <section class="main-content" ng-if="$ctrl.currentFormState==3">
    <p ng-if="$ctrl.tasting.guests.length==0">You have friends, right?<br>
      Well, then invite them to your tasting and be somebody!
    </p>
    <div class="main-form-container">
      <guest-list-item
        ng-repeat="guest in $ctrl.tasting.guests"
        guest="guest"
        editable="false">
      </guest-list-item>
      <div class="main-form-btns">
        <span class="descriptor">{{$ctrl.tasting.guests.length}} guests</span>
        <div>
          <button ng-click="$ctrl.openGuestModal()"><span class="fa fa-plus"></span></button>
          <button ui-sref="tasting-show({id:$ctrl.tasting.id})"><span class="fa fa-arrow-right"></span></button>
        </div>
      </div>
    </div>
  </section>

  <footer-menu></footer-menu>
  <host-location-modal host-locations="$ctrl.tasting.host.locations"></host-location-modal>
  <tasting-wine-modal tasting="$ctrl.tasting"></tasting-wine-modal>
  <add-guest-modal tasting="$ctrl.tasting"></add-guest-modal>
  `;
