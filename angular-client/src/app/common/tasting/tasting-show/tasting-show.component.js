import {template} from './tasting-show.es6';

export const TastingShowComponent = {
  bindings:{
    taster: "<",
    tasting: "<",
    tasterIsHost: "<",
    hostIsTasting: "<",
    tastingIsFrozen: "<"
  },
  template,
  controller: class TastingShowController{
    constructor($scope, $log, $state, $filter, $interval,
      lodash,
      tastingConstants,
      AlertsService,
      GuestService,
      ModalService,
      NotificationsService,
      TastingService,
      TastingWineService)
    {
      'ngInject';

      this._ = lodash;
      this.$log = $log;
      this.$state = $state;
      this.AlertsService = AlertsService;
      this.GuestService = GuestService;
      this.ModalService = ModalService;
      this.NotificationsService = NotificationsService;
      this.TastingService = TastingService;
      this.TastingWineService = TastingWineService;
      this.constants = tastingConstants;
      this.tasterNumber = 0;
      this.completeNotice = false;
      this.expandState = this.constants.EXPAND_STATE_NONE;
      this.displayTime = null;
      this.viewState = true; // Taster View = true
      this.viewLabel = "Taster View";
      this.unrevealedWines = [];


      let setDisplayTime = ()=>{
        if( this.tasting.is_pending ){
          this.displayTime = "Starts " + $filter("utcToLocalTimeFromNowFilter")(this.tasting.open_at);
          if( moment(this.tasting.open_at).diff(moment(), 'seconds')<0 ){
            $state.reload();
          }
        }else if( this.tasting.is_open ){
          if( this.tasting.close_at ){
            this.displayTime = "Closes " + $filter("utcToLocalTimeFromNowFilter")(this.tasting.close_at);
            if( moment(this.tasting.close_at).diff(moment(), 'seconds')<0 ){
              if( this.tasterIsHost ){
                // this.$log.log(this.tasting.open_at);
                this.tastingIsFrozen = true;
                this.tasting.closed_at = moment();
                this.TastingService.updateTasting(this.tasting);
                $interval.cancel(displayTimer);
              }else{
                $state.reload();
              }
            }
          }else{
            this.displayTime = "Opened " + $filter("utcToLocalTimeFromNowFilter")(this.tasting.open_at);
          }
        }else if( this.tasting.is_completed ){
          this.displayTime = "Completed " + $filter("utcToLocalDate")(this.tasting.completed_at);
          $interval.cancel(displayTimer);
        }else{
          this.displayTime = "Closed " + $filter("utcToLocalTimeFromNowFilter")(this.tasting.closed_at);
        }
      };

      let destroyGuestEvent = $scope.$on("destroy-guest-event", (e,d)=>{
        $log.log("destroyGuestEvent", d);
        if( d.taster_id==this.tasting.host.taster_id ){
          $state.reload();
        }else{
          if( this.tasterIsHost ){
            this.NotificationsService.setNotification("Cancellation emailed to " + d.taster.name);
            this._.remove(this.tasting.guests, {
              id: d.id
            });
            // for( let i=0; i<this.tasting.guests.length; i++ ){
            //   if( this.tasting.guests[i].id==d.id ){
            //     this.tasting.guests.splice(i,1);
            //     break;
            //   }
            // }
          }else{
            this.NotificationsService.setNotification("Cancellation emailed to host");
            $state.go("dashboard");
          }

        }
      });

      let displayTimer = $interval(setDisplayTime, 1000);

      let endAlertsEvent = $scope.$on("end-alerts-event", (e,d)=>{
        if( d.code=="destroyGuest" && d.action=="confirm" ){
          this.destroyGuest(d.data);
        }
        if( d.code=="destroyTastingWine" ){
          d.data.wait = false;
          if( d.action=='confirm' )
            this.destroyTastingWine(d.data);
        }
        if( d.code=="cancelTasting" && d.action=="confirm" ){
          this.wait = true;
          this.TastingService.destroyTasting(this.tasting.id);
        }
        if( d.code=="closeTasting" && d.action=="confirm" ){
          this.wait = true;
          this.tasting.closed_at = moment();
          this.TastingService.updateTasting(this.tasting);
        }
        if( d.code=="openTasting" && d.action=="confirm" ){
          this.wait = true;
          this.tasting.open_at = moment();
          this.TastingService.updateTasting(this.tasting);
        }
      });

      let inviteTasterEvent = $scope.$on("invite-taster-event", (e,d)=>{
        this.NotificationsService.setNotification("Invitation emailed to " + d.taster.full_handle);
        this.tasting.guests.unshift(d);
      });

      let modalStateChangeEvent = $scope.$on('modal-state-change-event', (e,d) => {
        if( d.state=="confirmed" && d.name=="tasting-detail-modal" ){
          this.tasting = d.data;
        }
      });

      let tastingWineCreateEvent = $scope.$on("tasting-wine-create-event", (e,d)=>{
        this.tasting.tasting_wines.push(d);
      });

      let tastingWineDestroyEvent = $scope.$on("tasting-wine-destroy-event", (e,d)=>{
        this.NotificationsService.setNotification("All reviews removed for " + d.wine.full_name);
        for(let i=0; i<this.tasting.tasting_wines.length; i++){
          if( this.tasting.tasting_wines[i].id==d.id ) this.tasting.tasting_wines.splice(i,1);
        }
      });

      let tastingWineUpdateEvent = $scope.$on("tasting-wine-update-event", (e,d)=>{
        lodash.every( this.tasting.tasting_wines, tw=>{
          if( tw.wine_number==d.wine_number ){
            tw.wine_number = null;
            tw.average_rating = null;
          }
          if( tw.id==d.id ){
            tw = d;
          }
        });
      });

      let updateTastingEvent = $scope.$on("update-tasting-event", (e,d)=>{
        // $log.log("TastingDetailComponent.constructor", d);
        this.wait = false;
        this.tasting = d;
        setDisplayTime();
      });

      let wineReviewUpdateEvent = $scope.$on("wine-review-update-event", (e,d)=>{
        // let old_review = lodash.find(this.tasting.taster_wine_reviews, review=>{
        //   return review.wine_id==d.wine_id ? review : null;
        // });
        // let chgd_review = lodash.find(this.tasting.taster_wine_reviews, review=>{
        //   return review.id==d.id;
        // });
        // if( old_review ){
        //   old_review.wine_id = null;
        // }
        // chgd_review.wine_id = d.wine_id
        // chgd_review.rating = d.rating;
        // chgd_review.comments = d.comments;
        lodash.each(this.tasting.taster_wine_reviews, review=>{
          if( review.id==d.id ){
            review = d;
            return;
          }
        });

        // this.TastingService.getTasting(this.tasting.id)
        //   .then(result=>{
        //     $log.log("TastingDetailComponent.constructor", result);
        //     // this.tasting = result;
        //     if( !this.completeNotice && this.allWinesRevealed() ){
        //       this.completeNotice = true;
        //       this.AlertsService.setConfirmationAlert(
        //         "You have revealed all your wines. Press 'Complete Tasting' to commit your research!"
        //       );
        //     }
        //   });
      });

      let wineRevealEvent = $scope.$on("wine-reveal-event", (e,d)=>{
        // $log.log("wineRevealEvent",d);
        this.tasting.taster_wine_reviews = d;
        // $log.log("wineRevealEvent",this.allWinesRevealed());
        if( !this.completeNotice && this.allWinesRevealed() ){
          this.completeNotice = true;
          this.AlertsService.setConfirmationAlert(
            "You have revealed all your wines. Press 'Complete Tasting' to commit your research!"
          );
        }
      });


      $scope.$on("$destroy", ()=>{
        $interval.cancel(displayTimer);
      });
      $scope.$on("$destroy", destroyGuestEvent);
      $scope.$on("$destroy", endAlertsEvent);
      $scope.$on("$destroy", inviteTasterEvent);
      $scope.$on("$destroy", modalStateChangeEvent);
      $scope.$on("$destroy", tastingWineCreateEvent);
      $scope.$on("$destroy", tastingWineDestroyEvent);
      $scope.$on("$destroy", tastingWineUpdateEvent);
      $scope.$on("$destroy", updateTastingEvent);
      $scope.$on("$destroy", wineRevealEvent);
      $scope.$on("$destroy", wineReviewUpdateEvent);

    }

    $onInit(){
      // this.$log.log(this.tasting);
      if( !this.hostIsTasting ){
        this.tasterNumber = 0;
        this.toggleViewState();
      }else{
        let that = this;
        this.tasterNumber = this._.find(this.tasting.guests, g=>g.taster_id==that.taster.id).taster_number
      }
      // this.NotificationsService.setNotification("Hello World");
    }

    allWinesRevealed(){
      // return this._.every(this.tasting.taster_wine_reviews, ['wine_id', !null])
      for( let i=0; i<this.tasting.taster_wine_reviews.length; i++ ){
        if( !this.tasting.taster_wine_reviews[i].wine_id ){
          return false;
        }
      }
      return true;
    }

    attemptCloseTasting(){
      this.AlertsService.setWarningAlert(
        "Ready to close this tasting? This will freeze all reviews and is not reversible.",
        "closeTasting"
      )
    }

    attemptCancelTasting(){
      this.AlertsService.setWarningAlert(
        "Are you sure you want to cancel tasting? Confirming will remove tasting from system and email all guests that is cancelled",
        "cancelTasting"
      )
    }

    attemptDestroyGuest(guest){
      if( this.taster.id==guest.taster_id ){
        this.AlertsService.setWarningAlert(
          "Are you sure you want to remove yourself from this tasting? All your wine reviews will be lost.",
          "destroyGuest",
          guest
        )
      }else{
        this.AlertsService.setWarningAlert(
          "Are you sure you want to delete " + guest.taster.name + " and all their reviews from this tasting?",
          "destroyGuest",
          guest
        )
      }
    }

    attemptDestroyTastingWine(tasting_wine){
      tasting_wine.wait = true;
      this.AlertsService.setWarningAlert(
        "Are you sure you want to delete wine " + tasting_wine.wine.full_name + " and all its reviews from this tasting?",
        "destroyTastingWine",
        tasting_wine
      )
    }

    attemptOpenTasting(){
      this.AlertsService.setWarningAlert(
        "Are you sure you want to open tasting? Confirming means all your tasters are present and ready to begin",
        "openTasting"
      )
    }

    completeTasting(){
      this.tasting.completed_at = moment();
      this.TastingService.updateTasting(this.tasting);
      this.expandState = this.constants.EXPAND_STATE_NONE
    }

    destroyGuest(guest){
      this.GuestService.destroy(guest.id);
    }

    destroyTastingWine(tasting_wine){
      this.TastingWineService.destroy(tasting_wine);
    }

    openGuestModal(){
      this.ModalService.setModalState("open", "add-guest-modal");
    }

    openGuestInfoModal(guest){
      this.ModalService.setModalState("open", "show-guest-modal", guest);
    }

    openTastingDetailModal(){
      this.ModalService.setModalState("open", "tasting-detail-modal");
    }

    openTastingWineModal(){
      this.ModalService.setModalState("open", "tasting-wine-modal");
    }

    openWineInfoModal(wine){
      this.ModalService.setModalState("open", "wine-info-modal", wine);
    }

    openWineRevealModal(review){
      this.ModalService.setModalState("open", "wine-reveal-modal", review);
    }

    openWineReviewModal(review){
      this.ModalService.setModalState("open", "wine-review-modal", review);
    }

    openWineReviewStatusModal(review){
      this.ModalService.setModalState("open", "wine-review-status-modal", review.id);
    }

    showReviews(){
      if( this.tasting.is_pending ) return false;
      if( this.viewState && this.tasterIsHost && !this.hostIsTasting ) return false;
      if( this.expandState!=this.constants.EXPAND_STATE_NONE && this.expandState!=this.constants.EXPAND_STATE_REVIEWS ) return false;
      return true;
    }

    showReveals(){
      if( this.tasting.is_closed && this.tasterIsHost && (this.expandState===this.constants.EXPAND_STATE_NONE || this.expandState===this.constants.EXPAND_STATE_REVEALS)){
        return true;
      }
      return false;
    }

    showWinesView(){
      if( this.tasting.is_completed ) return "completed"
      return "tastingPending"
    }

    toggleViewState(){
      this.viewState = !this.viewState;
      if( this.viewState ){
        this.viewLabel = "Taster View";
      }else{
        this.viewLabel = "Tasting View";
      }
    }

    wineListItemView(){
      if( this.viewState ) {
        return 'tasterRating';
      }
      return 'averageRating';
    }
  }
}
