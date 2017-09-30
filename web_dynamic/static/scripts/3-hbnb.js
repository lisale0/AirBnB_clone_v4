$(document).ready(function(){
  let amenityDictionary = {};
  $.ajax({
     url: 'http://0.0.0.0:5001/api/v1/places_search/',
     type: 'post',
     contentType: 'application/json',
     data: JSON.stringify({}),
     success: function(data ){
	 for (let i = 0; i < data.length; i++) {
	     let article = $('<article>');
	     /*TITLE*/
	     let title = $('<div/>', {class: 'title'}).appendTo(article); /*create title*/
	     let h2title = $('<h2/>', {text:"hello title"}).appendTo(title); /*append to title*/

	     /*INFORMATION*/
	     let infoContainer = $('<div/>', {class: 'information'}).appendTo(article);
             let maxGuest = $('<div/>', {class: 'max_guest'}).appendTo(infoContainer);
	     
	     /*
	     let guestIcon = $('<i/>', {class: 'fa fa-users fa-3x', aria-hidden:'true'}).appendTo(maxGuest);
	     */

	     $('<div/>', { class: 'price_by_night', text: data[i].price_by_night}).appendTo(title);
	     $('.places').append(article);
         }
     },
     error: function( jqXhr, textStatus, errorThrown ){
       console.log( errorThrown );
     }
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status == "OK") {
      $("DIV#api_status").addClass("available");
    } else {
      $("DIV#api_status").removeClass("available");
    }
  });
  $("input").change(function(){
    let result = "";
    let i = 0;
    if(this.checked){
      amenityDictionary[$(this).attr("data-id")] = $(this).attr("data-name");
      for (let key in amenityDictionary) {
        if (i !== 0) {
          result += ", " + amenityDictionary[key];
        } else {
          result += amenityDictionary[key];
        }
        i += 1;
      }
      $(".amenities h4").text(result);

    }else {
      let result = "";
      let i = 0;
      delete (amenityDictionary[$(this).attr("data-id")]);
      for (let key in amenityDictionary) {
          if (i !== 0) {
            result += ", " + amenityDictionary[key];
          } else {
             result += amenityDictionary[key];
	  }
        i += 1;
      }
      $(".amenities h4").text(result);
    }
  });
});
