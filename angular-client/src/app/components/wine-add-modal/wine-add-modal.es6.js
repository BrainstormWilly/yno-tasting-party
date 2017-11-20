export const template = `
  <div class="main-modal-wrapper">
    <div class="main-modal-container">
      <div class="main-modal-header">
        <h3>Add Wine</h3>
      </div>
      <div class="add-wine-form">
        <div class="main-form-control">
          <label>Vintage</label>
          <input type="number" ng-model="$ctrl.wine.vintage" placeholder="e.g. 2001 or 0 for non-vintage" ng-model="$ctrl.wine.vintage">
        </div>
        <div class="main-form-control">
          <label>Name</label>
          <input type="text" ng-model="$ctrl.wine.name" placeholder="e.g. Producer Region/Vineyard/Name Varietal">
        </div>
        <div class="main-form-control">
          <label>Price</label>
          <input type="number" step=0.01 ng-model="$ctrl.wine.price" placeholder="e.g. 19.99">
        </div>
      </div>
      <div class="main-modal-footer">
        <span>&nbsp;</span>
        <div>
          <button ng-click="$ctrl.closeModal()"><span class="fa fa-times"></span></button>
          <button ng-click="$ctrl.createWine()"><span class="fa fa-check"></span></button>
        </div>
      </div>
    </div>
  </div>
`
