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
    .select('users.name AS username', 'orders.time', 'selections.quantity', 'items.price', 'items.name')
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
      for (const item in items) {
        if (items[item].amount > 0) {
          knex.select('id').from('items').where({name:items[item].name}).then((results) => {
            results.forEach((result) => {
              knex('selections').insert({orders_id: orderID, items_id: result.id, quantity: items[item].amount}).then((res) => {
                console.log(res);
              });
            });
          });
        }
      }
    });
  });
  res.status(200).send();
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
