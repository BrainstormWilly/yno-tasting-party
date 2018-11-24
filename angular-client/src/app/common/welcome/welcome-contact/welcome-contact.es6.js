export const template = `

  <div class="welcome-background">

    <div class="welcome-hero-cover"></div>

    <div class="welcome-logo">
      <a ui-sref='welcome'><img src='assets/images/yno_tasting_logo_white.svg'></a>
      <desktop-nav-secondary  welcome-state="$ctrl.constants.WELCOME_CONTACT_STATE"></desktop-nav-secondary>
    </div>

    <div class="welcome-copy full">
    <h2>Hello. Good to hear from you.</h2>
    <form role="form" class="main-form" name="contactForm"
      ng-submit="$ctrl.sendContactInfo()">
      <div class="main-form-control" ng-class="{'error':contactForm.name.$dirty && contactForm.name.$invalid}">

        <input type="text" name="name" id="name"
          ng-model="$ctrl.message.name" required>
        <label>Name</label>
      </div>
      <div class="main-form-control" ng-class="{'error':contactForm.email.$dirty && contactForm.email.$invalid}">

        <input type="email" name="email" id="email"
          ng-pattern="/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/"
          ng-model="$ctrl.message.email" required>
        <label>Email</label>
      </div>
      <div class="main-form-control">

        <textarea name="content" type="text" ng-model="$ctrl.message.content" required></textarea>
        <label><span>What’s on your mind?</span></label>
      </div>
      <div class="main-form-btns">
        <span class="descriptor">Contact Us</span>
        <div>
          <button type="reset"><span class="fa fa-refresh"></span></button>
          <button type="submit"
            class="primary"
            ng-disabled="contactForm.$invalid">
            <i class="fas fa-check"></i>
          </button>
        </div>
      </div>
    </form>
    <div class="mobile-nav-spacer"></div>
    </div>
  </div>

  <mobile-nav></mobile-nav>
  <alerts-modal></alerts-modal>

`
