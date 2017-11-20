export const template = `
  <div class="main-modal-wrapper">

    <div class="main-modal-container" ng-show="$ctrl.viewState==1">
      <div class="main-modal-header">
        <h3>Enter Guest Email</h3>
      </div>
      <div class="main-modal-content">
        <div class="add-guest-form">
          <div class="main-form-control">
            <label>Email</label>
            <input type="email" ng-model="email">
          </div>
        </div>
      </div>
      <div class="main-modal-footer">
        <span>&nbsp;</span>
        <div>
          <button ng-click="$ctrl.closeModal()"><span class="fa fa-times"></span></button>
          <button ng-click="$ctrl.searchGuestByEmail(email)"><span class="fa fa-check"></span></button>
        </div>
      </div>
    </div>

    <div class="main-modal-container" ng-show="$ctrl.viewState==2">
      <div class="main-modal-header">
        <h3>Confirm Guest</h3>
      </div>
      <div class="main-modal-content">
        <div class="add-guest-form">
          <h4>{{$ctrl.result.title}}</h4>
          <p>{{$ctrl.result.body}}</p>
        </div>
      </div>
      <div class="main-modal-footer">
        <span>&nbsp;</span>
        <div>
          <button ng-click="$ctrl.closeModal()"><span class="fa fa-times"></span></button>
          <button ng-click="$ctrl.confirmModal()"><span class="fa fa-check"></span></button>
        </div>
      </div>
    </div>

  </div>
`
