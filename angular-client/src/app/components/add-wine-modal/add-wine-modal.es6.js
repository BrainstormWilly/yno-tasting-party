export const template = `
  <div class="main-modal-wrapper">
    <div class="main-modal-container">
      <div class="main-modal-header">
        <h3>Add Wine</h3>
      </div>
      <form name="tastingWineForm">
      <div class="main-modal-content">
        <div class="main-form-control" ng-class="{'error':tastingWineForm.$dirty && tastingWineForm.vintage.$invalid}">
          <input type="number" name="vintage"
            ng-model="$ctrl.tastingWine.wine.vintage" placeholder="Year or 0 for non-vintage"
            ng-pattern="/0{1}|[0-9]{4}/"
            required>
              <label>Vintage</label>
        </div>
        <div class="main-form-control">
          <input type="text"
            ng-model="$ctrl.tastingWine.wine.name" placeholder="Producer Region/Vineyard/Name Varietal"
            required>
              <label>Name</label>
        </div>
        <div class="main-form-control">
          <input type="number" step=0.01
            ng-model="$ctrl.tastingWine.price" placeholder="19.99"
            required>
              <label>Price</label>
        </div>
      </div>
      <div class="main-modal-footer">
        <span class="descriptor">&nbsp;</span>
        <div>
          <button ng-click="$ctrl.closeModal()"><span class="fa fa-times"></span></button>
          <button ng-click="$ctrl.createWine()" ng-disabled="tastingWineForm.$invalid"><span class="fa fa-check"></span></button>
        </div>
      </div>
      </form>
    </div>
  </div>
`
