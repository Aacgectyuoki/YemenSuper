/*const express = require("express");
const bodyparser = require('body-parser')
const app = express();
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
const stripe = require("stripe")("sk_test_51KB4AqHzyheHHaqUvBTsbgzymrNbpsSON0CRTtBAehhr5T3EnuVZTQmEB7FVdoeMAk9WGonE8KGThs7nCiEOzZ8D00hceShXui");
const cors = require('cors')

app.use(cors())

app.post('/checkout', async(req, res) => {
    try {
        console.log(req.body);
        token = req.body.token
      const customer = stripe.customers.create({
          email: "maxdell-thibodeau@hotmail.com",
          source: token.id
        })
        .then((customer) => {
          console.log(customer);
          return stripe.charges.create({
            amount: 1000,
            description: "Test Purchase using express and Node",
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

app.listen(4200, () => {
    console.log("App is listening on Port 4200")
})

// @ts-ignore
const stripe = require('stripe')('sk_test_51KB4AqHzyheHHaqUvBTsbgzymrNbpsSON0CRTtBAehhr5T3EnuVZTQmEB7FVdoeMAk9WGonE8KGThs7nCiEOzZ8D00hceShXui');
const express = require('express');
const app = express();
app.use(express.static('public'));
//const checkoutButton = document.getElementById('checkout-button');

const YOUR_DOMAIN = 'http://localhost:4200/';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});

app.listen(4200, () => console.log('Running on port 4200'));
*/
// This is your test secret API key.
const stripe = require('stripe')('sk_test_51KB4AqHzyheHHaqUvBTsbgzymrNbpsSON0CRTtBAehhr5T3EnuVZTQmEB7FVdoeMAk9WGonE8KGThs7nCiEOzZ8D00hceShXui');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4200';

app.post('/create-checkout-session', async (req, res) => {
  // @ts-ignore
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
       /* price_data: {
          currency: "usd",
          product_data: {
            name: "baby clothes",
          }
          unit_amount: 1,
        }*/
        price: 1,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});

app.listen(4200, () => console.log('Running on port 4200'));