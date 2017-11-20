export const template = `
<div class="main-modal-wrapper">
  <div class="main-modal-container">
    <div class="main-modal-content">
      <ul>
        <li ng-repeat="state in $ctrl.states">
          <a href ng-click="$ctrl.selectState(state)">
            <span>{{state.name}}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>
`;
