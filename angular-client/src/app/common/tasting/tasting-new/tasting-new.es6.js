export const template = `

  <header>
    <h2>New Tasting</h2>
  </header>

  <section class="main-content" ng-show="$ctrl.currentFormState==10">
    <div class="main-content-nav">
      <div>Let's Get Started</div>
      <button ng-click="$ctrl.createTasting()" ng-disabled="tastingForm.$invalid"><span class="fa fa-arrow-right"></span></button>
    </div>

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
          required>
      </div>
      <div class="main-form-control">
        <label><span>End</span><span>(Optional)</span></label>
        <input name="tastingCloseAt"
          moment-picker="$ctrl.tasting.close_at"
          ng-model="$ctrl.tasting.close_at">
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
    </div>
  </section>

  <section class="main-content" ng-show="$ctrl.currentFormState==2">
    <div class="main-content-nav">
      <div>Add Wines</div>
      <div>
        <button ng-click="$ctrl.openTastingWineModal()"><span class="fa fa-plus"></span></button>
        <button ng-click="$ctrl.setFormState(1)"><span class="fa fa-arrow-right"></span></button>
      </div>
    </div>
    <p ng-show="$ctrl.tasting_wines.length==0">A tasting with no wines is just sad.</p>
    <tasting-wine-list-item
      ng-repeat="wine in $ctrl.tasting_wines"
      tasting-wine="wine"
      remove-wine="$ctrl.removeTastingWine(tasting_wine)"
      editable="true">
    </tasting-wine-list-item>
  </section>

  <section class="main-content" ng-show="$ctrl.currentFormState==1">
    <div class="main-content-nav">
      <div>Add Guests</div>
      <div>
        <button ng-click="$ctrl.openGuestModal()"><span class="fa fa-plus"></span></button>
        <button ng-click="$ctrl.setFormState(1)"><span class="fa fa-arrow-right"></span></button>
      </div>
    </div>
    <p ng-show="$ctrl.guests.length==0">You have friends, right?</p>
    <div class="main-form-container" ng-show="$ctrl.currentFormState==3">
    <guest-list-item
      ng-repeat="guest in $ctrl.guests"
      guest="guest"
      remove-guest="$ctrl.removeGuest(guest)"
      editable="true">
    </guest-list-item>
    <toggle-switch
      toggle-trigger="$ctrl.toggleHostTastingStatus(state)"
      toggle-state="$ctrl.hostTastingStatus.state"
      toggle-label="$ctrl.hostTastingStatus.label">
    </toggle-switch>
  </section>

    <div class="main-form-container" ng-show="$ctrl.currentFormState==4">
      <tasting-detail tasting="$ctrl.tasting"></tasting-detail>
      <div class="main-form-btns">
        <span>&nbsp;</span>
        <div>
          <button ng-click="$ctrl.setFormState(-1)"><span class="fa fa-arrow-left"></span></button>
          <button ng-click="$ctrl.createTasting()"><span class="fa fa-check"></span></button>
        </div>
      </div>
    </div>
    <div class="main-form-container" ng-show="$ctrl.currentFormState==5">
      <h2>Congratulations!</h2>
      <h3>Tasting {{$ctrl.tasting.name}} has been saved.</h3>
      <p>Go to your dashboard to make changes</p>
    </div>
  </div>

  <footer-menu></footer-menu>
  <host-location-modal host-locations="$ctrl.host.locations"></host-location-modal>
  <tasting-wine-modal></tasting-wine-modal>
  <add-guest-modal></add-guest-modal>
  `;
