import {template} from './tasting-detail.es6';

export const TastingDetailComponent = {
  bindings: {
    taster: "<",
    tasting: "<",
    tasterIsHost: "<"
  },
  template,
  controller: class TastingDetailController{
    constructor($scope, $log, $filter, $interval, $state,
      AlertsService,
      GuestService,
      ModalService,
      NotificationsService,
      TastingService,
      TastingWineService,
      WineService)
    {
      'ngInject';
      this.$log = $log;
      this.AlertsService = AlertsService;
      this.GuestService = GuestService;
      this.ModalService = ModalService;
      this.NotificationsService = NotificationsService;
      this.TastingService = TastingService;
      this.TastingWineService = TastingWineService;
      this.WineService = WineService;
      this.hostIsNotGuest = false;
      this.openViewState = false;
      this.openViewLabel = "Taster View";
      this.displayTime = null;
      this.completeNotice = false;

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
                this.tasting.closed_at = moment().utc();
                this.TastingService.updateTasting(this.tasting);
              }else{
                $state.reload();
              }
            }
          }else{
            this.displayTime = "Opened " + $filter("utcToLocalTimeFromNowFilter")(this.tasting.open_at);
          }
        }else if( this.tasting.is_completed ){
          this.displayTime = "Completed on " + $filter("utcToLocalDate")(this.tasting.completed_at);
          $interval.cancel(displayTimer);
        }else{
          this.displayTime = "Closed on " + $filter("utcToLocalTimeFromNowFilter")(this.tasting.closed_at);
          $interval.cancel(displayTimer);
        }
      };

      let displayTimer = $interval(setDisplayTime, 1000);

      let destroyGuestEvent = $scope.$on("destroy-guest-event", (e,d)=>{
        if( d.taster_id!=this.tasting.host.taster_id ){
          this.NotificationsService.setNotification("Cancellation emailed to " + d.taster.name);
        }
        for( let i=0; i<this.tasting.guests.length; i++ ){
          if( this.tasting.guests[i].id==d.id ){
            this.tasting.guests.splice(i,1);
            break;
          }
        }
      });

      let endAlertsEvent = $scope.$on("end-alerts-event", (e,d)=>{
        if( d.code=="destroyGuest" && d.action=="confirm" ){
          this.destroyGuest(d.data);
        }
        if( d.code=="destroyTastingWine" && d.action=="confirm" ){
          this.destroyTastingWine(d.data);
        }
        if( d.code=="closeTasting" && d.action=="confirm" ){
          this.tasting.closed_at = moment().utc();
          this.TastingService.updateTasting(this.tasting);
        }
      });

      let includeHostAsGuestEvent = $scope.$on("include-host-as-guest-event", (e,d)=>{
        this.tasting.guests.unshift(d);
      });

      let inviteTasterEvent = $scope.$on("invite-taster-event", (e,d)=>{
        this.NotificationsService.setNotification("Invitation emailed to " + d.taster.name);
        this.tasting.guests.unshift(d);
      });

      // let removeHostAsGuestEvent = $scope.$on("remove-host-as-guest-event", (e,d)=>{
      //   for( let i=0; i<this.tasting.guests.length; i++ ){
      //     if(this.tasting.guests[i].taster_id && this.tasting.guests[i].taster_id==this.tasting.host.taster_id){
      //       this.tasting.guests.splice(i,1);
      //       break;
      //     }
      //   }
      // });

      let tastingWineCreateEvent = $scope.$on("tasting-wine-create-event", (e,d)=>{
        this.tasting.tasting_wines.push(d);
      });

      let tastingWineDestroyEvent = $scope.$on("tasting-wine-destroy-event", (e,d)=>{
        this.NotificationsService.setNotification("All reviews removed for " + d.wine.full_name);
        for(let i=0; i<this.tasting.tasting_wines.length; i++){
          if( this.tasting.tasting_wines[i].id==d.id ) this.tasting.tasting_wines.splice(i,1);
        }
      });

      let updateTastingEvent = $scope.$on("update-tasting-event", (e,d)=>{
        // $log.log("TastingDetailComponent.constructor", d);
        this.tasting = d;
        setDisplayTime();
      });

      let wineReviewUpdateEvent = $scope.$on("wine-review-update-event", ()=>{
        this.TastingService.getTasting(this.tasting.id)
          .then(result=>{
            // $log.log("TastingDetailComponent.constructor", result);
            this.tasting = result;
            if( !this.completeNotice && this.allWinesRevealed() ){
              this.completeNotice = true;
              this.AlertsService.setConfirmationAlert(
                "You have revealed all your wines. Press 'Complete Tasting' to commit your research!"
              );
            }
          });
      });


      $scope.$on("$destroy", destroyGuestEvent);
      $scope.$on("$destroy", endAlertsEvent);
      $scope.$on("$destroy", includeHostAsGuestEvent);
      $scope.$on("$destroy", inviteTasterEvent);
      // $scope.$on("$destroy", removeHostAsGuestEvent);
      $scope.$on("$destroy", tastingWineCreateEvent);
      $scope.$on("$destroy", tastingWineDestroyEvent);
      $scope.$on("$destroy", updateTastingEvent);
      $scope.$on("$destroy", wineReviewUpdateEvent);
      $scope.$on("$destroy", ()=>{
        $interval.cancel(displayTimer);
      })

    }

    $onInit() {
      // this.$log.log("TastingDetailComponent.$onInit", this.tasting);
      if( !this.tasting.is_pending ){
        if( this.tasterIsHost && this.tasting.host_is_not_tasting){
          this.toggleOpenViewState();
        }
        if( this.allWinesRevealed() ){
          this.completeNotice = true;
        }
      }
    }


    allWinesRevealed(){
      for( let i=0; i<this.tasting.taster_wine_reviews.length; i++ ){
        if( !this.tasting.taster_wine_reviews[i].wine_id ){
          return false;
        }
      }
      return true;
    }

    attemptCloseTasting(){
      let msg = "Are you sure you want to close this tasting? Progress is currently at " + Math.ceil(100*this.tasting.tasting_progress)+"% and reviews will no longer be accepted.";
      this.AlertsService.setWarningAlert(
        msg,
        "closeTasting"
      )
    }

    attemptDestroyGuest(guest){
      this.AlertsService.setWarningAlert(
        "Are you sure you want to delete " + guest.taster.name + " and all their reviews from this tasting?",
        "destroyGuest",
        guest
      )
    }

    attemptDestroyTastingWine(tasting_wine){
      this.AlertsService.setWarningAlert(
        "Are you sure you want to delete wine " + tasting_wine.wine.full_name + " and all its reviews from this tasting?",
        "destroyTastingWine",
        tasting_wine
      )
    }

    completeTasting(){
      this.tasting.completed_at = moment().utc();
      this.TastingService.updateTasting(this.tasting);
    }

    destroyGuest(guest){
      this.GuestService.destroy(guest.id);
    }

    destroyTastingWine(tasting_wine){
      this.TastingWineService.destroy(tasting_wine);
    }

    guestIsEditable(guest){
      if( !guest.confirmed ) return false;
      if( this.tasterIsHost ) return true;
      if( guest.taster.id==this.taster.id ) return true;
      return false;
    }

    openGuestModal(){
      this.ModalService.setModalState("open", "add-guest-modal");
    }

    openTastingDetailModal(){
      this.ModalService.setModalState("open", "tasting-detail-modal");
    }

    openWineReviewStatusModal(review){
      this.ModalService.setModalState("open", "wine-review-status-modal", review.id);
    }

    openTastingWineModal(){
      this.ModalService.setModalState("open", "tasting-wine-modal");
    }

    openWineInfoModal(wine){
      this.ModalService.setModalState("open", "wine-info-modal", wine);
    }

    openWineReviewModal(review){
      this.ModalService.setModalState("open", "wine-review-modal", review);
    }

    openWineRevealModal(review){
      if( this.tasterIsHost ){
        this.ModalService.setModalState("open", "wine-reveal-modal", review);
      }
    }

    showGuest(guest){
      this.ModalService.setModalState("open", "show-guest-modal", guest);
    }

    toggleOpenViewState(){
      this.openViewState = !this.openViewState;
      if( this.openViewState ){
        this.openViewLabel = "Tasting View";
      }else{
        this.openViewLabel = "Taster View";
      }
    }


  }
}
