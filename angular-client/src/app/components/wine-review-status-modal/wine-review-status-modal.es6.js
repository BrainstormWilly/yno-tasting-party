export const template = `
  <div class="main-modal-wrapper">
    <div class="main-modal-container">
      <div class="main-modal-header">
        <h3>Tasting Wine {{$ctrl.wineReview.wine_number}} Status</h3>
      </div>
      <div class="main-modal-content">
        <table>
          <tr>
            <th>Taster</th>
            <th>Rating</th>
          </tr>
          <tr ng-repeat="review in $ctrl.wineReview.all_reviews">
            <td>{{review.taster.name}}</td>
            <td>{{review.unrated ? '–' : review.rating}}</td>
          </tr>
        </table>
      </div>
      <div class="main-modal-footer">
        <span class="descriptor">&nbsp;</span>
        <div>
          <button ng-click="$ctrl.closeModal()"><span class="fa fa-times"></span></button>
        </div>
      </div>
    </div>
    <wait-state wait-on="$ctrl.modalState=='open' && !$ctrl.wineReview"></wait-state>
  </div>

`
