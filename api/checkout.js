const stripe = require("stripe")(process.env.NUXT_STRIPE_SECRET_KEY);
const hostUrl = process.env.NUXT_WEBSITE;

export default async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: req.body.order,
    shipping_rates: ["shr_1Isva0C61AYwWLSu8QLV0V7W"],
    shipping_address_collection: {
      allowed_countries: ['US'],
    },
    mode: 'payment',
    success_url: `${hostUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${hostUrl}`
  });

  return res.status(200).json(session);
};