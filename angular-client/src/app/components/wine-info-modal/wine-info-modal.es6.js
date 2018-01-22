export const template = `
  <div class="main-modal-wrapper">
    <div class="main-modal-container">
      <div class="main-modal-header">
        <h3>Wine Info</h3>
      </div>
      <div class="main-modal-content">
        <p ng-hide="$ctrl.wineType=='tastingWine'">
        <span>Reviews:</span>
          <ng-pluralize count="$ctrl.wine.review_count"
            when="{
              '0': 'None',
              'one': '1',
              'other': '{}'
            }">
          </ng-pluralize>
        </p>
        <p><span>Average Rating:</span> {{$ctrl.averageRating}}</p>
        <p><span>Vintage:</span> {{$ctrl.wine.vintage}}</p>
        <p><span>Name:</span> {{$ctrl.wine.name}}</p>
      </div>
      <div class="main-modal-footer">
        <span>&nbsp;</span>
        <div>
          <button ng-click="$ctrl.closeModal()"><span class="fa fa-times"></span></button>
        </div>
      </div>
    </div>
  </div>
`
