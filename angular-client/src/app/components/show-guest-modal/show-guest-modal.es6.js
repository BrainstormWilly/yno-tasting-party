export const template = `
<div class="main-modal-wrapper">
  <div class="main-modal-container">
    <div class="main-modal-header">
      <h3>Guest Detail</h3>
    </div>
    <div class="main-modal-content">
      <table>
        <tr>
          <td>Name:</td>
          <td>{{$ctrl.guest.taster.name}}</td>
        </tr>
        <tr>
          <td>Handle:</td>
          <td>{{$ctrl.guest.taster.handle}}</td>
        </tr>
        <tr>
          <td>Tastings:</td>
          <td>{{$ctrl.guest.taster.tasting_count}}</td>
        </tr>
        <tr>
          <td>Reviews:</td>
          <td>{{$ctrl.guest.taster.review_count}}</td>
        </tr>
      </table>
    </div>
    <div class="main-modal-footer">
      <div>&nbsp;</div>
      <div>
        <button ng-click="$ctrl.closeModal()"><span class="fa fa-times"></span></button>
      </div>
    </div>
  </div>
</div>
`
