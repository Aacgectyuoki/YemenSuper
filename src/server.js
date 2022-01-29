const express = require('express');
const app = express();
// @ts-ignore
const stripe = require('stripe')('sk_test_51KB4AqHzyheHHaqUvBTsbgzymrNbpsSON0CRTtBAehhr5T3EnuVZTQmEB7FVdoeMAk9WGonE8KGThs7nCiEOzZ8D00hceShXui');

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
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
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });

  res.json({ id: session.id });
});

app.listen(4242, () => console.log(`Listening on port ${4242}!`));