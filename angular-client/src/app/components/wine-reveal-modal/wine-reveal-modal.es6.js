export const template = `
  <div class="main-modal-wrapper">
    <div class="main-modal-container">
      <div class="main-modal-header">
        <h3>Reveal Wine {{$ctrl.pending_review.wine_number}}</h3>
      </div>
      <div class="main-modal-content">
        <ul>
          <li ng-repeat="tastingWine in $ctrl.tastingWines">
            <a href ng-click="$ctrl.revealWine(tastingWine)">{{tastingWine.wine.full_name}}</a>
          </li>
        </ul>
      </div>
      <div class="main-modal-footer">
        <span class="descriptor">&nbsp;</span>
        <div>
          <button ng-click="$ctrl.closeModal()"><span class="fa fa-times"></span></button>
        </div>
      </div>
    </div>
  </div>
`
