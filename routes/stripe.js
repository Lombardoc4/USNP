const express = require('express');
const router = express.Router();

const stripe = require('stripe')('sk_test_51JqgIqGPFxlPlZ00He3WXGav3bNfDcTLDOxYk2iR6nAUujmENaWblJYU2BHfAbfirOQD9rjEQrfhT8AWHATq0ODs00gzQ9nGr4');

const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
};

router.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;

    console.log('items', items);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        payment_method_types: [
        "card",
        ],
    });

    res.json({
        clientSecret: paymentIntent.client_secret,
    });
});

module.exports = router;