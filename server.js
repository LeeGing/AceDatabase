"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const moment      = require('moment');

// Twilio info
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const recipient = process.env.NUMBER_TO_CALL;
const restaurantNumber = process.env.RESTAURANT_NUMBER;

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use('/images', express.static("images"));

// Hardcoding 'logged-in' user
const user = 'User 1';

// Home page
app.get("/", (req, res) => {
  res.render("items");
});

// Render admin page
// Connect every table in DB and pull down relevant data
app.get("/admin", (req, res) => {
  let orderResults = [];
  knex('users')
    .join('orders', 'users.id', '=', 'orders.user_id')
    .join('selections', 'orders.id', '=', 'selections.orders_id')
    .join('items', 'selections.items_id', '=', 'items.id')
    .select('orders.id', 'orders.time', 'selections.quantity', 'items.price', 'items.name')
    .orderBy('orders.time', 'desc')
    .then((results) => {
      results.forEach((result) => {
        orderResults.push(result);
      });
      res.render("admin", {orderResults: orderResults});
    });
});

// Checkout handler
app.post("/checkout", (req,res) => {
  const items = req.body;
  // Search DB for userID
  var userID;
  knex.select('id').from('users').where({name:user}).asCallback((error, results) => {
    results.forEach((result) => {
      userID = result.id;
    });
    // Insert order content into DB
    knex('orders').insert({user_id: userID}).returning('id').then((id) => {
      const orderID = id[0];
      // Send message to customer with order details
      client.messages.create({
        body: `Your order has been received! Order ${orderID} will be ready in 15 minutes`,
        to: recipient,
        from: twilioPhone
      })
      .then((message) => console.log(message.sid));
      // Fill smsItems with non-zero content to send to owner
      let smsItems = [];
      for (const item in items) {
        if (items[item].amount > 0) {
          smsItems.push(items[item]);
          // For each item user orders, populate selection table with order id and item id
          knex.select('id').from('items').where({name:items[item].name}).then((results) => {
            results.forEach((result) => {
              knex('selections').insert({orders_id: orderID, items_id: result.id, quantity: items[item].amount}).then((res) => {
              });
            });
          });
        }
      }
      // Setup message to send to owner
      const smsItemsSend = smsItems.map((item) => {
        return ` ${item.name} x ${item.amount}`;
      });
      smsItemsSend.unshift(`Order ID: ${orderID}`);
      client.messages.create({
        body: smsItemsSend.toString(),
        to: restaurantNumber,
        from: twilioPhone
      })
      .then((message) => console.log(message.sid));
    });
  });
  res.status(200).send();
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
