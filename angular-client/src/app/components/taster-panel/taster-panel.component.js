import {template} from './taster-panel.es6';

export const TasterPanelComponent = {
  bindings: {
    taster: "<",
    tasterNumber: "<",
    tasterIsHost: "<",
    tastingShow: "<",
    toggleTasterMenu: "&"
  },
  template,
  controller: class TasterPanelController{
    constructor($log){
      'ngInject';
      this.$log = $log;
    }

    onToggleTasterMenu(){
      // this.$log.log("onToggleTasterMenu")
      this.toggleTasterMenu()
    }
  }
}
