export const template = `
<div class="main-modal-wrapper">
  <div class="main-modal-container">

    <div class="main-modal-header">
      <h3>Tasting Details</h3>
    </div>


    <form name="tastingForm" ng-submit="$ctrl.updateTasting()">
    <div class="main-modal-content">
      <div>
        <div class="main-form-control" ng-class="{'error' : newTastingForm.tastingName.$touched && newTastingForm.tastingName.$invalid}">
          <input name="tastingName" type="text" ng-model="$ctrl.pending_tasting.name" required>
            <label><span>Name</span></label>
        </div>
        <div class="main-form-control"
          ng-class="{
            'error' : newTastingForm.tastingOpenAt.$touched && newTastingForm.tastingOpenAt.$invalid,
            'disabled' : !$ctrl.pending_tasting.is_pending
          }">
          <input name="tastingOpenAt"
            moment-picker="$ctrl.pending_tasting.open_at"
            ng-model="$ctrl.pending_tasting.open_at"
            ng-disabled="!$ctrl.pending_tasting.is_pending"
            disable="!$ctrl.pending_tasting.is_pending"
            required>
            <label><span>Start</span></label>
        </div>
        <div class="main-form-control"
          ng-class="{'disabled':$ctrl.pending_tasting.is_closed || $ctrl.pending_tasting.is_completed}">
          <input name="tastingCloseAt"
            moment-picker="$ctrl.pending_tasting.close_at"
            min-date="$ctrl.minCloseDate"
            ng-model="$ctrl.pending_tasting.close_at"
            ng-disabled="$ctrl.pending_tasting.is_closed || $ctrl.pending_tasting.is_completed"
            disable="$ctrl.pending_tasting.is_closed || $ctrl.pending_tasting.is_completed">
            <label><span>End</span><span>(Optional)</span></label>
        </div>
        <div class="main-form-control">
          <textarea name="tastingDescription" type="text" ng-model="$ctrl.pending_tasting.description"></textarea>
            <label><span>Details</span><span>(Optional)</span></label>
        </div>
        <div class="main-form-control"
          ng-class="{
            'error' : newTastingForm.tastingLocation.$touched && newTastingForm.tastingLocation.$invalid,
            'disabled' : !$ctrl.pending_tasting.is_pending
          }">
          <input type="hidden" ng-model="$ctrl.pending_tasting.location.id"></input>
          <textarea name="tastingLocation" type="text" required
            ng-focus="$ctrl.openHostLocationModal()"
            ng-readonly="true"
            ng-model="$ctrl.pending_tasting.location.to_short_string"
            ng-disabled="!$ctrl.pending_tasting.is_pending">
          </textarea>
          <label><span>Location</span></label>
        </div>
      </div>
    </div>

    <div class="main-modal-footer">
      <div class="descriptor">&nbsp;</div>
      <div>
        <button type="button" ng-click="$ctrl.closeModal()"><span class="fa fa-times"></span></button>
        <button type="submit"><span class="fa fa-check"></span></button>
      </div>
    </div>
    </form>

  </div>
</div>

<host-location-modal host-locations="$ctrl.pending_tasting.host.locations" selected-location="$ctrl.pending_tasting.location"></host-location-modal>
<wait-state wait-on="$ctrl.wait"></wait-state>
`
