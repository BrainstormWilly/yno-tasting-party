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
      this.showMenu = true
    }

    onToggleTasterMenu(){
      // this.$log.log("onToggleTasterMenu")
      this.showMenu = !this.showMenu
      this.toggleTasterMenu()
    }
  }
}
