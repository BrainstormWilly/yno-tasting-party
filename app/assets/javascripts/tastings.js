function selectHostLocation(id){
  $('.tasting-location').each(function(i,v){
    $(this).removeClass('list-group-item-success');
    $("span").remove(".tasting-location-check");
  });
  $('#tasting_location_id').val(id);
  $("[data-tasting-location-id=" + id + "]").addClass('list-group-item-success');
  $("[data-tasting-location-id=" + id + "]").prepend("<span class='glyphicon glyphicon-ok tasting-location-check'></span>&nbsp;&nbsp;");
}

function changeDate(e){
  var date = e.date.utc().format("YYYY-MM-DD HH:mm:ss UTC");
  if(e.currentTarget.id=="datepicker_open_at"){
    $('#tasting_open_at').val(date);
  }else{
    $('#tasting_close_at').val(date);
  }
}


$(document).on('turbolinks:load', function(e){
  $('.input-group.date').datetimepicker();
  $('.input-group.date').on('dp.change', changeDate);
  $('#datepicker_open_at').data('DateTimePicker').defaultDate(moment($('#tasting_open_at').val()));
  $('#datepicker_close_at').data('DateTimePicker').defaultDate(moment($('#tasting_close_at').val()));
  $('.tasting-location').on("click", function(e){
    e.preventDefault();
    selectHostLocation($(this).data("tasting-location-id"));
  });
  $('.completed-wine-wrapper').on('click', function(e){
    e.preventDefault();
    window.location.href = "/wines/" + $(this).data('completed-wine');
  })
});
