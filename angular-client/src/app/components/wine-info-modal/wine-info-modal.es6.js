export const template = `
  <div class="main-modal-wrapper">
    <div class="main-modal-container">
      <div class="main-modal-header">
        <h3>Wine Info</h3>
      </div>
      <div class="main-modal-content">
        <table>
          <tr>
            <td>Vintage:</td>
            <td>{{$ctrl.wineContext.wine.vintage}}</td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>{{$ctrl.wineContext.wine.name}}</td>
          </tr>
          <tr ng-if="$ctrl.wineType=='wine'">
            <td>Reviews Overall:</td>
            <td>{{$ctrl.wineContext.wine.review_count}}</td>
          </tr>
          <tr ng-if="$ctrl.wineType=='wine'">
            <td>Average Rating Overall:</td>
            <td>{{$ctrl.wineContext.wine.average_rating}}</td>
          </tr>
          <tr ng-if="$ctrl.wineType=='wine'">
            <td>Your Reviews:</td>
            <td>{{$ctrl.wineContext.taster_review_count}}</td>
          </tr>
          <tr ng-if="$ctrl.wineType=='wine'">
            <td>Your Average Rating:</td>
            <td>{{$ctrl.wineContext.taster_average_rating}}</td>
          </tr>
          <tr ng-if="$ctrl.wineType=='wine'">
            <td>Last Reviewed:</td>
            <td>{{$ctrl.wineContext.updated_at | utcToLocalDate:"MMM-YYYY"}}</td>
          </tr>
          <tr ng-if="$ctrl.wineType=='tastingWine'">
            <td>Completed Reviews:</td>
            <td>{{$ctrl.wineContext.completed_review_count}}</td>
          </tr>
          <tr ng-if="$ctrl.wineType=='tastingWine'">
            <td>Average Rating:</td>
            <td>{{$ctrl.wineContext.average_rating}}</td>
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
  </div>
`
