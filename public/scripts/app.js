$(document).ready(function () {

  // Popup driver
  $('.popup').popup({
    color: 'white',
    opacity: 0.9,
    scrolllock: false,
    transition: '0.6s'
  });

  // In memory pre DB
  const items = {
    1: { name:'Avalanche Crunch', price:9, amount:0 },
    2: { name:'Banana Cream', price:9, amount:0 },
    3: { name:'Chocolate Banana', price:9, amount:0 },
    4: { name:'Chocolate Crunch', price:9, amount:0 },
    5: { name:'Peanut Butter', price:9, amount:0 },
    6: { name:'Red Devil', price:9, amount:0 },
    7: { name:'Samoa', price:9, amount:0 },
    8: { name:'Smore', price:9, amount:0 },
    9: { name:'Snickers', price:9, amount:0 },
    10: { name:'Strawberry', price:9, amount:0 },
    11: { name:'Strawberry Ice', price:9, amount:0 },
    12: { name:'Twix Chocolate', price:9, amount:0 },
    13: { name:'Horchata', price:12, amount:0 },
    14: { name:'Strawchata', price:12, amount:0 },
    15: { name:'Coconut Horchata', price:12, amount:0 }
  }

  let itemList = $('.item-selection');

  // Cart click handler
  $('#cart').on('click', function() {
    $('.popup').popup('show');
    itemList.empty();
    let total = 0;
    for (let i = 1; i <= 15; i++) {
      if (items[i].amount){
        itemList.append(`<li>${items[i].name}: ${items[i].amount}</li>`);
        total += items[i].amount * items[i].price;
      }
    }
    itemList.append(`Total: $<span>${total}</span>`);
  });

  let cart = [];

  // Apply click handler to every image, add to cart on click
  for (let i = 1; i <= 15; i++) {
    $(`#d${i}`).on('click', function () {
      const itemText = $(this).find('h5').text();
      items[i].amount++;
    });
  }


  // TODO figure out what this cart is
  // Could just add items to an array that is displayed in the popup menu
  // When user 'logs out', session cookie is cleared and cart array is emptied

  // The popup cart will be a slowly building <section>..? with confirm button on bottom
  // When confirm is pressed, POST request will be sent to server to insert order into DB
  //
});