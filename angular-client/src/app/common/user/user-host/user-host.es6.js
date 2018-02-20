export const template = `
<header>
  <h2>Hosting</h2>
</header>

<section>
  <p>
    Becoming a tasting host is easy. Simple add one or more tasting locations and you can begin inviting friends.
  </p>
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
</section>

<footer-menu></footer-menu>
`
