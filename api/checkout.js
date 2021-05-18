const stripe = require("stripe")(process.env.NUXT_STRIPE_SECRET_KEY);
const hostUrl = process.env.NUXT_WEBSITE;

export default async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: req.body.order,
    success_url: `${hostUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${hostUrl}?failed=true`
  });

  return res.status(200).json(session);
};