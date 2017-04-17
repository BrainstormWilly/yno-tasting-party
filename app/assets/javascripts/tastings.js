function selectHostLocation(id){
  $('.tasting-location').each(function(i,v){
    $(this).removeClass('list-group-item-success');
    $("span").remove(".tasting-location-check");
  });
  $('#tasting_location_id').val(id);
  $("[data-tasting-location-id=" + id + "]").addClass('list-group-item-success');
  $("[data-tasting-location-id=" + id + "]").prepend("<span class='glyphicon glyphicon-ok tasting-location-check'></span>&nbsp;&nbsp;");
}


$(document).on('turbolinks:load', function(e){
  $('.datetimepickergroup').datetimepicker();
  $('.tasting-location').on("click", function(e){
    e.preventDefault();
    selectHostLocation($(this).data("tasting-location-id"));
  });
  $('.completed-wine-wrapper').on('click', function(e){
    e.preventDefault();
    window.location.href = "/wines/" + $(this).data('completed-wine');
  })
});
