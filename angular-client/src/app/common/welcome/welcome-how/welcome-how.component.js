import {template} from './welcome-how.es6';

export const WelcomeHowComponent = {
  template,
  controller: class WelcomeHowController{
    constructor($log, $state, $element, $window, welcomeConstants){
      'ngInject';
      this.$element = $element;
      this.$log = $log;
      this.$state = $state;
      this.$window = $window;
      this.constants = welcomeConstants;
      this.taster = null;
      this.step = 0;
    }

    nextStep(direction){
      // this.$log.log(direction)
      let cStep = "#step" + this.step;
      let nStep = "#step" + (this.step + direction);
      if( cStep=="#step0" ){
        TweenMax.to([".welcome-tagline", ".top", ".bottom"], .5, {autoAlpha:0});
        TweenMax.to("#step1", .5, {autoAlpha:1});
      }else if (nStep=="#step0") {
        TweenMax.to([".welcome-tagline", ".top", ".bottom"], .5, {autoAlpha:1});
        TweenMax.to(cStep, .5, {autoAlpha:0});
      }else{
        TweenMax.to(cStep, .5, {autoAlpha:0});
        TweenMax.to(nStep, .5, {autoAlpha:1});
      }
      this.step = this.step + direction;
      this.$window.scrollTo(0,0);
      // let cstep = "#step" + this.step;
      // let nstep = "#step" + (this.step + direction);
      // this.$element.find(nstep).css("display","flex");
      // // $(nstep).css({'display':'flex'});
      //
      // if( direction==1 ){
      //   TweenMax.to(cstep, 1, {top:"-100%", bottom:"100%", autoAlpha:0, onComplete:()=>{
      //     this.$element.find(cstep).css("display","none");
      //   }});
      //   TweenMax.to(nstep, 0, {top:"100%", bottom:"-100%", autoAlpha: 0, onComplete:()=>{
      //     TweenMax.to(nstep, 1, {top:0, bottom:0, autoAlpha: 1});
      //   }});
      // }else{
      //   TweenMax.to(cstep, 1, {top:"100%", bottom:"-100%", autoAlpha:0, onComplete:()=>{
      //     this.$element.find(cstep).css("display","none");
      //   }});
      //   TweenMax.to(nstep, 0, {top:"-100%", bottom:"100%", autoAlpha:0, onComplete:()=>{
      //     TweenMax.to(nstep, 1, {top:0, bottom:0, autoAlpha:1});
      //   }});
      // }
      //
      // this.step += direction;

    }

  }
}
