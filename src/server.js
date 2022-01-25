const express = require("express");
const bodyparser = require('body-parser')
const app = express();
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
// @ts-ignore
const stripe = require("stripe")("type in secret key");
const cors = require('cors')

app.use(cors())

app.post('/checkout', async(req, res) => {

app.listen(4242, () => console.log('Running on port 4242'));
    try {
        console.log(req.body);
        // @ts-ignore
        token = req.body.token
        const customer = stripe.customers.create({
          email: "maxdell-thibodeau@hotmail.com",
          // @ts-ignore
          source: token.id
        })
        .then((customer) => {
          console.log(customer);
        return stripe.charges.create({
            amount: req.body.amount * 100,
            description: "Please use your credit/debit card to pay for your item(s)",
            currency: "USD",
            customer: customer.id,
          });
        })
        .then((charge) => {
          console.log(charge);
            res.json({
              data:"success"
          })
        })
        .catch((err) => {
            res.json({
              data: "failure",
            });
        });
      return true;
    } catch (error) {
      return false;
    }
})

/*
const express = require('express');
const app = express();

const stripe = require('stripe')('Type in secret key')

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:4242/success.html',
    cancel_url: 'http://localhost:4242/cancel.html',
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log(`Listening on port ${4242}!`));
*/
