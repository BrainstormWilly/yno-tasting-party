export const template = `

<div class="user">

  <div class="desktop-logo">
    <div class="desktop-logo-top"></div>
    <div class="desktop-logo-bottom">
      <a ui-sref="dashboard"><img src='assets/images/yno_tasting_logo_white.svg'></a>
      <desktop-nav-secondary></desktop-nav-secondary>
    </div>
  </div>

  <taster-panel taster="$ctrl.taster"></taster-panel>

  <div class="user-panel">
    <div class="host-header">
      <h3>Host Sign Up</h3>
      <span>
        Becoming a tasting host is easy. Simple add one or more tasting locations and you can begin inviting friends.
      </span>
    </div>
    <div class="host-panel-section" ng-if="!$ctrl.hostState">
      <host-location-form
        check-action="$ctrl.onNewHostLocationChange(host_location)">
      </host-location-form>
      <div class="main-form-btns">
        <span>&nbsp;</span>
        <div>
          <button type="reset"><span class="fa fa-refresh"></span></button>
          <button
            ng-click="$ctrl.addHostLocation()"
            ng-disabled="$ctrl.newHostLocationInvalid">
              <span class="fa fa-check"></span>
          </button>
        </div>
      </div>
      <div class="mobile-nav-spacer"></div>
    </div>
  </div>

</div>


<mobile-nav></mobile-nav>
<notification></notification>
<alerts-modal></alerts-modal>
`
