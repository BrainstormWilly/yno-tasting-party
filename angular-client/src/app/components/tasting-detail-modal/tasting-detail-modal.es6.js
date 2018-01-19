export const template = `
<div class="main-modal-wrapper">
  <form class="main-modal-container" name="tastingForm">
  <div class="main-form-container">
    <div class="main-form-control" ng-class="{'error' : newTastingForm.tastingName.$touched && newTastingForm.tastingName.$invalid}">
      <label><span>Name</span></label>
      <input name="tastingName" type="text" ng-model="$ctrl.pending_tasting.name" required>
    </div>
    <div class="main-form-control" ng-class="{'error' : newTastingForm.tastingOpenAt.$touched && newTastingForm.tastingOpenAt.$invalid}">
      <label><span>Start</span></label>
      <input name="tastingOpenAt"
        moment-picker="$ctrl.pending_tasting.open_at"
        ng-model="$ctrl.pending_tasting.open_at"
        required>
    </div>
    <div class="main-form-control">
      <label><span>End</span><span>(Optional)</span></label>
      <input name="tastingCloseAt"
        moment-picker="$ctrl.pending_tasting.close_at"
        ng-model="$ctrl.pending_tasting.close_at">
    </div>
    <div class="main-form-control">
      <label><span>Details</span><span>(Optional)</span></label>
      <textarea name="tastingDescription" type="text" ng-model="$ctrl.pending_tasting.description"></textarea>
    </div>
    <div class="main-form-control" ng-class="{'error' : newTastingForm.tastingLocation.$touched && newTastingForm.tastingLocation.$invalid}">
      <label><span>Location</span></label>
      <input type="hidden" ng-model="$ctrl.pending_tasting.location.id"></input>
      <textarea name="tastingLocation" type="text" ng-focus="$ctrl.openHostLocationModal()" ng-readonly="true" ng-model="$ctrl.pending_tasting.location.to_short_string" required></textarea>
    </div>
  </div>
  <div class="main-modal-footer">
    <div>&nbsp;</div>
    <div>
      <button ng-click="$ctrl.closeModal()"><span class="fa fa-times"></span></button>
      <button ng-click="$ctrl.updateTasting()"><span class="fa fa-check"></span></button>
    </div>
  </div>
  </form>
</div>
<host-location-modal host-locations="$ctrl.pending_tasting.host.locations"></host-location-modal>
`
