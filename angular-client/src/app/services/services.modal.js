export class ModalService {
  constructor ($rootScope, $log) {
    'ngInject';

    this.$log = $log;
    this.$rootScope = $rootScope;
    this.state = "closed";
    this.modals = [];
    this.currentModal = null;
  }

  registerModal(modal){
    this.modals[modal.name] = modal;
  }

  destroyAllModals(){
    for(let i=0; i<this.modals.length; i++){
      this.$rootScope.$broadcast('modal-state-change-event', {state:"closed", name:this.modals[i].name});
    }
    this.modals = [];
    this.currentModal = null;
  }

  getCurrentModal(){
    return this.currentModal;
  }

  setModalState(state, name, data=null){
    this.$rootScope.$broadcast('modal-state-change-event', {state:state, name:name, data:data});
  }
  getModalState(name){
    return this.modals[name].modalState;
  }

}
