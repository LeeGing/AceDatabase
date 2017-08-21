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
  let checkout = $('.checkout-button');

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

  // Empty cart button click handler
  $('.empty-button').on('click', function () {
    itemList.empty();
    for (let item in items) {
      items[item].amount = 0;
    }
  });

  // Apply click handler to every image, add to cart on click
  for (let i = 1; i <= 15; i++) {
    $(`#d${i}`).on('click', function () {
      const itemText = $(this).find('h5').text();
      items[i].amount++;
    });
  }

  checkout.on('click', function () {
    $.post('/checkout', items)
      .done(() => {
        $('.popup').popup('hide');
        itemList.empty();
        for (let item in items) {
          items[item].amount = 0;
        }
        alert("Thanks for placing your order");
      });
  });
});