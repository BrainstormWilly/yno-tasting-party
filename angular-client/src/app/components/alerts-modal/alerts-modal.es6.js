export const template = `
  <div class="main-modal-wrapper">

    <div class="main-modal-container" ng-show="$ctrl.currentAlert.type=='failure'">
      <div class="main-modal-header">
        <h3><span class="fa fa-bomb"></span> Error!</h3>
      </div>
      <div class="main-modal-content">
        <p>{{$ctrl.currentAlert.message}}</p>
      </div>
      <div class="main-modal-footer">
        <span>&nbsp;</span>
        <div>
          <button ng-click="$ctrl.closeModal()"><span class="fa fa-times"></span></button>
        </div>
      </div>
    </div>

    <div class="main-modal-container" ng-show="$ctrl.currentAlert.type=='warning'">
      <div class="main-modal-header warning">
        <h3><span class="fa fa-exclamation-triangle"></span> Warning!</h3>
      </div>
      <div class="main-modal-content">
        <p>{{$ctrl.currentAlert.message}}</p>
      </div>
      <div class="main-modal-footer">
        <span>&nbsp;</span>
        <div>
          <button ng-click="$ctrl.closeModal()"><span class="fa fa-times"></span></button>
          <button ng-click="$ctrl.confirmModal()"><span class="fa fa-check"></span></button>
        </div>
      </div>
    </div>

    <div class="main-modal-container" ng-show="$ctrl.currentAlert.type=='confirmation'">
      <div class="main-modal-header">
        <h3><span class="fa fa-thumbs-up"></span> Success!</h3>
      </div>
      <div class="main-modal-content">
        <p>{{$ctrl.currentAlert.message}}</p>
      </div>
      <div class="main-modal-footer">
        <span>&nbsp;</span>
        <div>
          <button ng-click="$ctrl.closeModal()"><span class="fa fa-check"></span></button>
        </div>
      </div>
    </div>

  </div>
`
