$(document).ready(function () {
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;

  // Popup driver
  $('.popup').popup({
    type: 'tooltip',
    vertical: 'bottomedge',
    tooltipanchor: $('#cart')
  });

  $('#cart').on('click', function() {
    console.log("cart");
    // debugger
    $('.popup').popup('show');
  });

  // Cart will be populated with....donut#
  let cart = [];

  // TODO set click handlers for all food item images
  // IDs will be (donut1,donut2,donut3,...)
  // The images will have IDs for jQuery selection
  // when you click on an image, the food item will be added to a cart??
  for (i = 1; i <= 12; i++) {
    $(`#donut${i}`).on('click', function () {
      // cart is populated with id number
      // Might be better to append element to popup div with relevant content
      cart.push(i);
    });
  }


  // TODO figure out what this cart is
  // Could just add items to an array that is displayed in the popup menu
  // When user 'logs out', session cookie is cleared and cart array is emptied

  // The popup cart will be a slowly building <section>..? with confirm button on bottom
  // When confirm is pressed, POST request will be sent to server to insert order into DB
  //
});
