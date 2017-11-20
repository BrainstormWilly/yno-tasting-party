import {template} from './state-selector-modal.es6';

export const StateSelectorModalComponent = {
  template,
  controller: class StateSelectorModalController{
    constructor($scope, $log, $element, $rootScope, ModalService){
      'ngInject';
      this.$log = $log;
      this.name = "state-selector-modal";
      this.ModalService = ModalService;
      this.modalState = "closed";
      this.states = [{code:"AL",name:"Alabama"},
        {code:"AK",name:"Alaska"},
        {code:"AZ",name:"Arizona"},
        {code:"AR",name:"Arkansas"},
        {code:"CA",name:"California"},
        {code:"CO",name:"Colorado"},
        {code:"CT",name:"Connecticut"},
        {code:"DE",name:"Delaware"},
        {code:"DC",name:"District Of Columbia"},
        {code:"FL",name:"Florida"},
        {code:"GA",name:"Georgia"},
        {code:"HI",name:"Hawaii"},
        {code:"ID",name:"Idaho"},
        {code:"IL",name:"Illinois"},
        {code:"IN",name:"Indiana"},
        {code:"IA",name:"Iowa"},
        {code:"KS",name:"Kansas"},
        {code:"KY",name:"Kentucky"},
        {code:"LA",name:"Louisiana"},
        {code:"ME",name:"Maine"},
        {code:"MD",name:"Maryland"},
        {code:"MA",name:"Massachusetts"},
        {code:"MI",name:"Michigan"},
        {code:"MN",name:"Minnesota"},
        {code:"MS",name:"Mississippi"},
        {code:"MO",name:"Missouri"},
        {code:"MT",name:"Montana"},
        {code:"NE",name:"Nebraska"},
        {code:"NV",name:"Nevada"},
        {code:"NH",name:"New Hampshire"},
        {code:"NJ",name:"New Jersey"},
        {code:"NM",name:"New Mexico"},
        {code:"NY",name:"New York"},
        {code:"NC",name:"North Carolina"},
        {code:"ND",name:"North Dakota"},
        {code:"OH",name:"Ohio"},
        {code:"OK",name:"Oklahoma"},
        {code:"OR",name:"Oregon"},
        {code:"PA",name:"Pennsylvania"},
        {code:"RI",name:"Rhode Island"},
        {code:"SC",name:"South Carolina"},
        {code:"SD",name:"South Dakota"},
        {code:"TN",name:"Tennessee"},
        {code:"TX",name:"Texas"},
        {code:"UT",name:"Utah"},
        {code:"VT",name:"Vermont"},
        {code:"VA",name:"Virginia"},
        {code:"WA",name:"Washington"},
        {code:"WV",name:"West Virginia"},
        {code:"WI",name:"Wisconsin"},
        {code:"WY",name:"Wyoming"}];

      let $panel = $element.find(".main-modal-container");
      let modalStateChangeEvent = $rootScope.$on("modal-state-change-event", (e,d)=>{
        if( d.name==this.name ){
          this.modalState = d.state;
          if( d.state=="open" ){
            TweenMax.to($element, 0.5, {autoAlpha:1});
            TweenMax.from($panel, 0.3, {transform:"scale(.5)"});
          }else{
            TweenMax.to($element, 0.5, {autoAlpha:0})
          }
        }
      });

      $scope.$on("destroy", modalStateChangeEvent);


    }

    $onInit() {
      this.ModalService.registerModal(this);
    }

    selectState(state){
      this.ModalService.setModalState("confirmed", this.name, state);
    }

  }
}
