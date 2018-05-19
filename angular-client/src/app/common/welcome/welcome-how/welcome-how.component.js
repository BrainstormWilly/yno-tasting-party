import {template} from './welcome-how.es6';

export const WelcomeHowComponent = {
  bindings: {
    taster: "<"
  },
  template,
  controller: class WelcomeHowController{
    constructor($log, $state, $element, welcomeConstants){
      'ngInject';
      this.$element = $element;
      this.$log = $log;
      this.$state = $state;
      this.constants = welcomeConstants;
      this.step = 0;
    }

    nextStep(direction){

      let cstep = "#step" + this.step;
      let nstep = "#step" + (this.step + direction);
      this.$element.find(nstep).css("display","flex");
      // $(nstep).css({'display':'flex'});

      if( direction==1 ){
        TweenMax.to(cstep, 1, {top:"-100%", bottom:"100%", autoAlpha:0, onComplete:()=>{
          this.$element.find(cstep).css("display","none");
        }});
        TweenMax.to(nstep, 0, {top:"100%", bottom:"-100%", autoAlpha: 0, onComplete:()=>{
          TweenMax.to(nstep, 1, {top:0, bottom:0, autoAlpha: 1});
        }});
      }else{
        TweenMax.to(cstep, 1, {top:"100%", bottom:"-100%", autoAlpha:0, onComplete:()=>{
          this.$element.find(cstep).css("display","none");
        }});
        TweenMax.to(nstep, 0, {top:"-100%", bottom:"100%", autoAlpha:0, onComplete:()=>{
          TweenMax.to(nstep, 1, {top:0, bottom:0, autoAlpha:1});
        }});
      }

      this.step += direction;

    }

  }
}
