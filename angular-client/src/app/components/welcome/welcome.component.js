// import templateUrl from './componentswelcome.html';

export const WelcomeComponent = {
  bindings: {
    msg: "<"
  },
  templateUrl: 'app/components/welcome/welcome.html',
  controller: class WelcomeController {
    constructor(){
      'ngInject';

    }
    $onInit() {

    }
  }
}
