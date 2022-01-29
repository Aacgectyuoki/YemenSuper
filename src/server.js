// This is your test secret API key.
// @ts-ignore
const stripe = require('stripe')('sk_test_51KB4AqHzyheHHaqUvBTsbgzymrNbpsSON0CRTtBAehhr5T3EnuVZTQmEB7FVdoeMAk9WGonE8KGThs7nCiEOzZ8D00hceShXui');
const express = require('express');
const bodyParser = require("body-parser");
const { resolve } = require('path');
const app = express();
app.use(express.static('app/component/cart'));

const YOUR_DOMAIN = 'http://localhost:4200';

app.use((req, res, next) => {
  bodyParser.json()(req, res, next);
});

app.get("/", (req, res) => {
  const path = resolve("app/component/cart" + "/cart.component.html");
  res.sendFile(path);
})
/*
app.get("/success", (req, res) => {
  const path = resolve("app/component/cart" + "/success.html");
  res.sendFile(path);
})*/

app.get("/checkout-session", async (req, res) => {
  console.log('/checkout-session')
  // @ts-ignore
  const session = await stripe.checkout.sessions.retrieve(req.query.id, {
    expand: ['line_items']
  });
  res.json(session);
})

app.post('/create-checkout-session', async (req, res) => {
  console.log('/create-checkout-session')
  // @ts-ignore
  const session = await stripe.checkout.sessions.create({
    success_url: `${YOUR_DOMAIN}/success?id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    mode: 'payment',
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1KLvZyHzyheHHaqUkEEe52m6',
        quantity: req.body.quantity,
      },
    ]
  });
  res.json({
    id: session.id,
  });
  return session;
});

app.listen(4244, () => console.log('Running on port 4244'));