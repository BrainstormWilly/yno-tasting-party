
function clear_btn_classes($btn){
  $btn.removeClass("btn-success");
  $btn.removeClass("btn-danger");
  $btn.removeClass("btn-warning");
}

function reset_ratings(){
  $('.rating_btn').each(function(){
    clear_btn_classes($(this));
    $(this).addClass("btn-default");
    // if ($(this).data("rating")==1) {
    //   $(this).addClass("btn-danger");
    // }else if ($(this).data("rating")==5){
    //   $(this).addClass("btn-success");
    // }else if ($(this).data("rating")==3){
    //   $(this).addClass("btn-warning");
    // }else{
    //   $(this).addClass("btn-default");
    // }
  });
}

function set_rating(rating){
  $btn = $("[data-rating='" + rating + "']");
  $btn.removeClass("btn-default");
  if( rating < 3 ){
    $btn.addClass("btn-danger");
  }else if( rating > 3 ){
    $btn.addClass("btn-success");
  }else{
    $btn.addClass("btn-warning");
  }

  $("#wine_review_rating").val(rating);
}

$(document).on('turbolinks:load', function(e){
  if( $(e.target.body).hasClass('wine_reviews edit') ){
    reset_ratings();
    $unrated = $("[data-unrated='true']");
    if( $unrated.length==1 ){
      set_rating(3);
    }else{
      set_rating($("#wine_review_rating").val());
    }
    $('.rating_btn').click(function(e){
      e.preventDefault();
      reset_ratings();
      set_rating( $(this).data("rating") );
    });
  }
})
