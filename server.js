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

// Seperated Routes for each Resource
// const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use('/images', express.static("images"));
// Mount all resource routes
// app.use("/api/users", usersRoutes(knex));

// Hardcoding 'logged-in' user
const user = 'User 1';

// Home page
app.get("/", (req, res) => {
  res.render("items");
});

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
        // console.log(result);
      });
      // console.log(orderResults);
      res.render("admin", {orderResults: orderResults});
    });
});

app.post("/checkout", (req,res) => {
  const items = req.body;
  // Search DB for userID
  var userID;
  knex.select('id').from('users').where({name:user}).asCallback((error, results) => {
    results.forEach((result) => {
      userID = result.id;
    });
    knex('orders').insert({user_id: userID}).returning('id').then((id) => {
      const orderID = id[0];
      client.messages.create({
        body: `Your order has been received! Order ${orderID} will be ready in 15 minutes`,
        to: recipient,
        from: twilioPhone
      })
      .then((message) => console.log(message.sid));
      let smsItems = [];
      for (const item in items) {
        if (items[item].amount > 0) {
          smsItems.push(items[item]);
          knex.select('id').from('items').where({name:items[item].name}).then((results) => {
            results.forEach((result) => {
              knex('selections').insert({orders_id: orderID, items_id: result.id, quantity: items[item].amount}).then((res) => {
                // Call function passing orderID, send text to 'restaurant'
              });
            });
          });
        }
      }
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
  // res.redirect('/items');
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
