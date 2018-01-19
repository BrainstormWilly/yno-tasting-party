import {template} from './toggle-switch.es6';

export const ToggleSwitchComponent = {
  bindings: {
    toggleTrigger: "&",
    toggleState: "<",
    toggleLabel: "<",
    toggleDisabled: "<"
  },
  template,
  controller: class ToggleSwitchController{
    constructor($log, $element){
      'ngInject';
      this.$log = $log;
      this.$button = $element.find("button");
      this.$knob = $element.find(".toggle-knob");
      this.$span = $element.find("span");
    }

    $onInit() {
      // this.$log.log("TastingListItemComponent $onInit", this.$knob);
    }

    $onChanges(changeObj){
      // this.$log.log("ToggleSwitchComponent.$onChanges", changeObj);
      if( changeObj.toggleState ){
        if( changeObj.toggleState.currentValue ){
          this.$button.css("justify-content", "flex-end");
        }else{
          this.$button.css("justify-content", "flex-start");
        }
      }
      if( changeObj.toggleDisabled ){
        if( changeObj.toggleDisabled.currentValue ){
          this.$knob.css("opacity",.5);
        }else{
          this.$knob.css("opacity",1);
        }
      }
      TweenMax.fromTo(this.$span, .8, {opacity:0}, {opacity:1});
    }

  }
}
