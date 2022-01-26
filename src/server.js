const stripe = require('stripe')('sk_test_51KB4AqHzyheHHaqUvBTsbgzymrNbpsSON0CRTtBAehhr5T3EnuVZTQmEB7FVdoeMAk9WGonE8KGThs7nCiEOzZ8D00hceShXui');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4200';

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




/*const express = require('express');
const app = express();

const stripe = require('stripe')('sk_test_51KB4AqHzyheHHaqUvBTsbgzymrNbpsSON0CRTtBAehhr5T3EnuVZTQmEB7FVdoeMAk9WGonE8KGThs7nCiEOzZ8D00hceShXui')

app.listen(4242, () => console.log(`Listening on port ${4242}!`));
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [{
    price_data: {
      product: '{{PRODUCT_ID}}',
      unit_amount: 1500,
      currency: 'usd',
    },
    quantity: 1,
  }],
  mode: 'payment',
  success_url: 'https://example.com/success',
  cancel_url: 'https://example.com/cancel',
});*/

/*const express = require("express");
const bodyparser = require('body-parser')
const app = express();
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
// @ts-ignore
const stripe = require("stripe")("sk_test_51KB4AqHzyheHHaqUvBTsbgzymrNbpsSON0CRTtBAehhr5T3EnuVZTQmEB7FVdoeMAk9WGonE8KGThs7nCiEOzZ8D00hceShXui");
const cors = require('cors')

app.use(cors())

app.post('/checkout', async(req, res) => {

app.listen(4200, () => console.log('Running on port 8080'));
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
})*/